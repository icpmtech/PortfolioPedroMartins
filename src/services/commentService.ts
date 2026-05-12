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

export const commentService = {
  subscribeToComments(postId: string, callback: (comments: Comment[]) => void) {
    const commentsRef = collection(db, 'blogPosts', postId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Comment));
      callback(comments);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `blogPosts/${postId}/comments`);
    });
  },

  async addComment(postId: string, content: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('Authentication required to comment.');

    try {
      const commentsRef = collection(db, 'blogPosts', postId, 'comments');
      await addDoc(commentsRef, {
        postId,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous Operator',
        content,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `blogPosts/${postId}/comments`);
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
