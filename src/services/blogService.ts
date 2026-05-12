import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  published: boolean;
  createdAt: Timestamp | any;
  updatedAt: Timestamp | any;
  tags: string[];
  imageUrl: string;
}

const COLLECTION_NAME = 'blogPosts';

export const blogService = {
  async getAllPosts(includeUnpublished = false): Promise<BlogPost[]> {
    try {
      const isAdminInFirebase = await this.checkIsAdmin();

      let q;
      // Only allow unpublished if we are actually an admin in FIREBASE
      if (includeUnpublished && isAdminInFirebase) {
        q = query(collection(db, COLLECTION_NAME));
      } else {
        q = query(
          collection(db, COLLECTION_NAME), 
          where('published', '==', true)
        );
      }
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...(doc.data() as object) 
      } as BlogPost));

      // Sort client-side to avoid composite index requirements
      return posts.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });
    } catch (error: any) {
      // Catch specific permission errors and try to explain
      if (error?.code === 'permission-denied') {
        console.warn('Firestore Access Restricted: Falling back to public view or empty set.');
        if (includeUnpublished) {
          return this.getAllPosts(false);
        }
      }
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      return [];
    }
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...(snapshot.data() as object) } as BlogPost;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${COLLECTION_NAME}/${id}`);
      return null;
    }
  },

  async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'authorName'>): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error('Unauthorized');

    try {
      const newPost = {
        ...post,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newPost);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
      return '';
    }
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    }
  },

  async checkIsAdmin(): Promise<boolean> {
    // Check local session first
    const localSession = localStorage.getItem('admin_session');
    if (localSession) return true;

    const user = auth.currentUser;
    if (!user) return false;
    
    // Check if user is in admins collection or is the bootstrapped admin
    if (user.email === 'mourao.martins@gmail.com') return true;

    try {
      const docRef = doc(db, 'admins', user.uid);
      const snapshot = await getDoc(docRef);
      return snapshot.exists();
    } catch (error) {
      // If we can't read admins collection, we probably aren't an admin
      return false;
    }
  },

  async seedPosts(posts: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'authorName'>[]): Promise<void> {
    const user = auth.currentUser;
    const localSession = localStorage.getItem('admin_session');
    
    if (!user && !localSession) throw new Error('Unauthorized seeding attempt.');

    const authorId = user?.uid || (localSession ? JSON.parse(localSession).uid : 'system');
    const authorName = user?.displayName || (localSession ? JSON.parse(localSession).displayName : 'System Admin');

    try {
      for (const postData of posts) {
        await addDoc(collection(db, COLLECTION_NAME), {
          ...postData,
          authorId,
          authorName,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
    }
  }
};
