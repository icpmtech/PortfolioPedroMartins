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
import initialProjects from '../data/initialProjects.json';

export interface Project {
  id?: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  image: string;
  description?: string;
  url?: string;
  published?: boolean;
}

const COLLECTION_NAME = 'projects';
const LOCAL_STORAGE_KEY = 'projects_fallback';

const getFallbackProjects = (): Project[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse local storage projects', e);
    }
  }
  return initialProjects as Project[];
};

const saveToFallback = (projects: Project[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
};

export const projectService = {
  async getAllProjects(): Promise<Project[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('year', 'desc'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        if (auth.currentUser) {
          await this.seedProjects(initialProjects as any);
        }
        return getFallbackProjects();
      }

      const projects = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...(doc.data() as object) 
      })) as Project[];

      saveToFallback(projects);
      return projects;
    } catch (error) {
      console.warn('Firestore projects failed, using backup:', error);
      return getFallbackProjects();
    }
  },

  async seedProjects(projects: Project[]) {
    // Basic seed logic
    for (const project of projects) {
       try {
         await addDoc(collection(db, COLLECTION_NAME), {
           ...project,
           createdAt: serverTimestamp()
         });
       } catch (e) {
         console.error('Seed failed for project', project.title, e);
       }
    }
  },

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...project,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
  },

  async deleteProject(id: string) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  }
};
