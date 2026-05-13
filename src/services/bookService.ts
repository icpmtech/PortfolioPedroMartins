import { 
  collection, 
  getDocs, 
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import initialBooks from '../data/initialBooks.json';

export interface Book {
  id?: string;
  title: string;
  subtitle: string;
  year: string;
  price: string;
  image: string;
  amazonUrl: string;
}

const COLLECTION_NAME = 'books';
const LOCAL_STORAGE_KEY = 'books_fallback';

const getFallbackBooks = (): Book[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse local storage books', e);
    }
  }
  return initialBooks as Book[];
};

const saveToFallback = (books: Book[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
};

export const bookService = {
  async getAllBooks(): Promise<Book[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('year', 'desc'));
      const snapshot = await getDocs(q);
      
      const localSession = localStorage.getItem('admin_session');
      const isAdmin = auth.currentUser || localSession;

      if (snapshot.empty) {
        // Try to seed if admin is logged in
        if (isAdmin) {
           console.log('Books empty, seeding...');
           await this.seedBooks(initialBooks as any);
        }
        return getFallbackBooks();
      }

      const books = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...(doc.data() as object) 
      })) as Book[];

      saveToFallback(books);
      return books;
    } catch (error) {
      console.warn('Firestore books failed, using backup:', error);
      return getFallbackBooks();
    }
  },

  async seedBooks(books: Book[]) {
    for (const book of books) {
      await addDoc(collection(db, COLLECTION_NAME), {
        ...book,
        createdAt: serverTimestamp()
      });
    }
  },

  async addBook(book: Omit<Book, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...book,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  async updateBook(id: string, updates: Partial<Book>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
  },

  async deleteBook(id: string) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  }
};
