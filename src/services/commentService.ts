import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export interface Comment {
  id?: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Timestamp | any;
}

const LOCAL_STORAGE_KEY = 'comments_fallback';

const getFallbackComments = (postId: string): Comment[] => {
  const stored = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${postId}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse local storage comments', e);
    }
  }
  return [];
};

const saveToFallback = (postId: string, comments: Comment[]) => {
  localStorage.setItem(`${LOCAL_STORAGE_KEY}_${postId}`, JSON.stringify(comments));
};

export const commentService = {
  subscribeToComments(postId: string, callback: (comments: Comment[]) => void) {
    // If it's a fallback post ID, use local storage only
    if (postId.startsWith('backup-') || postId.startsWith('local-')) {
      const fallback = getFallbackComments(postId);
      callback(fallback);
      return () => {}; // No-op unsubscribe
    }

    const commentsRef = collection(db, 'blogPosts', postId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Comment));
      // Sync local fallback for offline/errors
      saveToFallback(postId, comments);
      callback(comments);
    }, (error) => {
      console.warn('Comments Firestore Error, falling back to local:', error.message);
      const fallback = getFallbackComments(postId);
      callback(fallback);
    });
  },

  async addComment(postId: string, content: string): Promise<void> {
    const user = auth.currentUser;
    const authorId = user?.uid || 'local-guest';
    const authorName = user?.displayName || 'Archive Member';

    const localComment: Comment = {
      id: `local-c-${Date.now()}`,
      postId,
      authorId,
      authorName,
      content,
      createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any
    };

    // If synthetic ID or no user, save locally
    if (postId.startsWith('backup-') || postId.startsWith('local-') || !user) {
      const comments = getFallbackComments(postId);
      saveToFallback(postId, [...comments, localComment]);
      return;
    }

    try {
      const commentsRef = collection(db, 'blogPosts', postId, 'comments');
      await addDoc(commentsRef, {
        postId,
        authorId,
        authorName,
        content,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.warn('Failed to add comment to Firestore, saving locally');
      const comments = getFallbackComments(postId);
      saveToFallback(postId, [...comments, localComment]);
    }
  },

  async deleteComment(postId: string, commentId: string): Promise<void> {
    try {
      const commentRef = doc(db, 'blogPosts', postId, 'comments', commentId);
      await deleteDoc(commentRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `blogPosts/${postId}/comments/${commentId}`);
    }
  }
};
