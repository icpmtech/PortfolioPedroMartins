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
import initialPosts from '../data/initialPosts.json';

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
const LOCAL_STORAGE_KEY = 'blog_posts_fallback';

const getFallbackPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse local storage posts', e);
    }
  }
  
  // Map JSON to BlogPost format
  return initialPosts.map((post, i) => ({
    ...post,
    id: `backup-${i}`,
    authorId: 'system',
    authorName: 'System Admin',
    createdAt: { seconds: Date.now() / 1000 - (i * 86400), nanoseconds: 0 },
    updatedAt: { seconds: Date.now() / 1000 - (i * 86400), nanoseconds: 0 },
  })) as any;
};

const saveToFallback = (posts: BlogPost[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
};

export const blogService = {
  async getAllPosts(includeUnpublished = false): Promise<BlogPost[]> {
    try {
      const user = auth.currentUser;
      const isAdminInFirebase = await this.checkIsAdmin();

      let q;
      if (includeUnpublished && isAdminInFirebase) {
        q = query(collection(db, COLLECTION_NAME));
      } else {
        q = query(
          collection(db, COLLECTION_NAME), 
          where('published', '==', true)
        );
      }
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        // Try to seed if admin is logged in
        if (isAdminInFirebase && user) {
          console.log('Firebase is empty, seeding initial data for auth user...');
          await this.seedPosts(initialPosts as any);
        }
        const fallback = getFallbackPosts();
        return includeUnpublished ? fallback : fallback.filter(p => p.published);
      }

      const posts = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...(doc.data() as object) 
      } as BlogPost));

      // Update fallback with latest from Firebase if successful
      if (!snapshot.empty) {
        saveToFallback(posts);
      }

      return posts.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });
    } catch (error: any) {
      console.warn('Firestore failed, using JSON/LocalStorage backup:', error.message);
      const fallback = getFallbackPosts();
      const filtered = includeUnpublished ? fallback : fallback.filter(p => p.published);
      return filtered.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });
    }
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...(snapshot.data() as object) } as BlogPost;
      }
      // Check fallback
      return getFallbackPosts().find(p => p.id === id) || null;
    } catch (error) {
      console.warn('Firestore GET failed, checking backup');
      return getFallbackPosts().find(p => p.id === id) || null;
    }
  },

  async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'authorName'>): Promise<string> {
    const user = auth.currentUser;
    const authorId = user?.uid || 'local-admin';
    const authorName = user?.displayName || 'Admin';

    const localNewPost = {
      ...post,
      id: `local-${Date.now()}`,
      authorId,
      authorName,
      createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
      updatedAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
    } as BlogPost;

    try {
      if (!user) {
        // Just local if not logged in to Firebase
        const posts = getFallbackPosts();
        saveToFallback([localNewPost, ...posts]);
        return localNewPost.id!;
      }

      const newPost = {
        ...post,
        authorId,
        authorName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newPost);
      return docRef.id;
    } catch (error) {
      console.warn('Firestore CREATE failed, saving to local backup');
      const posts = getFallbackPosts();
      saveToFallback([localNewPost, ...posts]);
      return localNewPost.id!;
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
      console.warn('Firestore UPDATE failed, saving to local backup');
      const posts = getFallbackPosts();
      const index = posts.findIndex(p => p.id === id);
      if (index !== -1) {
        posts[index] = { ...posts[index], ...updates, updatedAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any };
        saveToFallback(posts);
      }
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.warn('Firestore DELETE failed, updating local backup');
      const posts = getFallbackPosts();
      saveToFallback(posts.filter(p => p.id !== id));
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
