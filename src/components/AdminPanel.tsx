import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Lock, 
  Eye, 
  EyeOff, 
  Layout, 
  LogIn,
  LogOut,
  Settings,
  Database,
  Mail,
  Key,
  ShieldCheck
} from 'lucide-react';
import { auth, googleProvider, signInWithEmailAndPassword } from '../lib/firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { blogService, BlogPost } from '../services/blogService';
import usersData from '../data/users.json';

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');
  
  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Check for local session first
    const localUser = localStorage.getItem('admin_session');
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUser(parsedUser);
      setIsAdmin(true);
      fetchPosts();
    }

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const adminStatus = await blogService.checkIsAdmin();
        if (adminStatus) {
          setUser(u);
          setIsAdmin(true);
          fetchPosts();
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchPosts = async () => {
    const data = await blogService.getAllPosts(true);
    setPosts(data);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    
    // Check against local JSON file
    const localMatch = usersData.find(u => u.email === email && u.password === password);
    
    if (localMatch) {
      try {
        // Also try to sign in to Firebase to satisfy Firestore rules
        await signInWithEmailAndPassword(auth, email, password);
      } catch (fbError) {
        console.warn('Firebase sync failed, using local session only:', fbError);
      }
      
      const sessionData = { 
        uid: localMatch.email, 
        email: localMatch.email, 
        displayName: localMatch.name,
        photoURL: `https://ui-avatars.com/api/?name=${localMatch.name}&background=D4AF37&color=000`
      };
      
      setUser(sessionData);
      setIsAdmin(true);
      localStorage.setItem('admin_session', JSON.stringify(sessionData));
      fetchPosts();
    } else {
      setLoginError('Invalid local credentials. Protocol rejected.');
    }
    
    setIsLoggingIn(false);
  };

  const handleGoogleLogin = async () => {
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const adminStatus = await blogService.checkIsAdmin();
      if (adminStatus) {
        setUser(result.user);
        setIsAdmin(true);
        fetchPosts();
      } else {
        setLoginError('Google identity not in administrative whitelist.');
        await signOut(auth);
      }
    } catch (error: any) {
      setLoginError('Protocol failed. Check identity provider.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('admin_session');
    setUser(null);
    setIsAdmin(false);
    setPosts([]);
  };

  const handleCreate = () => {
    setIsEditing({
      title: '',
      content: '',
      excerpt: '',
      authorId: user?.uid || '',
      authorName: user?.displayName || 'Admin',
      published: false,
      createdAt: null,
      updatedAt: null,
      tags: [],
      imageUrl: ''
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;

    if (isEditing.id) {
      await blogService.updatePost(isEditing.id, isEditing);
    } else {
      await blogService.createPost(isEditing);
    }
    
    setIsEditing(null);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this post permanently?')) {
      await blogService.deletePost(id);
      fetchPosts();
    }
  };

  if (loading) return null;

  if (!user || !isAdmin) {
    return (
      <div id="admin" className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 bg-mesh">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism p-8 md:p-12 rounded-[2.5rem] border border-gold/20 w-full max-w-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl pointer-events-none" />
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
              <Lock size={28} className="text-gold" />
            </div>
            <h2 className="font-serif text-3xl text-white mb-2">Central Intelligence</h2>
            <p className="text-white/30 font-mono text-[9px] uppercase tracking-[0.2em]">
              {user ? 'ACCESS_DENIED: Admin Credentials Required' : 'RESTRICTED_AREA: Proxy Authentication Needed'}
            </p>
          </div>

          {!user ? (
            <div className="space-y-6">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="root@system.admin"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white text-xs font-mono focus:border-gold/50 outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Key size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white text-xs font-mono focus:border-gold/50 outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>

                {loginError && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-[10px] font-mono text-center bg-red-500/5 border border-red-500/10 py-2 rounded-lg"
                  >
                    {loginError}
                  </motion.p>
                )}

                <button 
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gold hover:bg-white text-dark py-3.5 rounded-xl flex items-center justify-center space-x-2 font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50"
                >
                  {isLoggingIn ? (
                    <div className="w-4 h-4 border-2 border-dark/20 border-t-dark rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn size={18} />
                      <span className="text-[10px]">Initialize Access</span>
                    </>
                  )}
                </button>
              </form>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <span className="relative px-4 bg-[#0a0a0a] text-white/10 text-[8px] font-mono uppercase tracking-[0.4em]">Alternative</span>
              </div>

              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-white/5 hover:bg-white/10 text-white/60 py-3.5 rounded-xl border border-white/10 flex items-center justify-center space-x-2 font-bold uppercase tracking-widest transition-all duration-300 text-[10px]"
              >
                <span>Google Authority SSO</span>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-red-400 font-mono text-[10px] border border-red-500/20 bg-red-500/5 p-4 rounded-xl mb-6">
                 SYSTEM_ERR: UID_{user.uid.substring(0, 8)} is not whitelisted for administrative protocols.
              </div>
              <button 
                onClick={handleLogout}
                className="text-white/20 hover:text-white font-mono text-[9px] uppercase tracking-widest transition-colors underline decoration-white/10 underline-offset-4"
              >
                Terminate Session
              </button>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div id="admin" className="min-h-screen bg-dark flex flex-col p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold/5 opacity-20 blur-[150px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 z-10 gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="h-px w-8 bg-gold" />
            <span className="text-gold font-mono text-[10px] tracking-widest uppercase font-bold">CMS_ARCHIVE_CORE // V1.0</span>
          </div>
          <h1 className="font-serif text-5xl text-white">Console Control</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-2 pr-6 border border-white/5">
            <img 
              src={user.photoURL || ''} 
              alt={user.displayName || ''} 
              className="w-10 h-10 rounded-xl border border-gold/20"
            />
            <div className="flex flex-col">
              <span className="text-white text-xs font-bold">{user.displayName}</span>
              <span className="text-white/30 text-[8px] font-mono uppercase tracking-widest">Operator_Active</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-3 text-white/30 hover:text-red-400 transition-colors bg-white/5 rounded-2xl border border-white/5"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-8 z-10">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-mono text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === 'posts' ? 'bg-gold text-dark' : 'text-white/40 hover:text-gold bg-white/5'}`}
        >
          <Database size={16} />
          <span>Entries</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-mono text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === 'settings' ? 'bg-gold text-dark' : 'text-white/40 hover:text-gold bg-white/5'}`}
        >
          <Settings size={16} />
          <span>Protocols</span>
        </button>
      </div>

      <div className="flex-1 z-10">
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[600px]">
            {/* Post List - Hidden on mobile when editing */}
            <div className={`lg:col-span-4 flex flex-col space-y-4 ${isEditing ? 'hidden lg:flex' : 'flex'}`}>
              <button 
                onClick={handleCreate}
                className="w-full glass-morphism border border-gold/30 p-4 md:p-6 rounded-3xl flex items-center justify-center space-x-3 group hover:bg-gold hover:text-dark transition-all duration-300"
              >
                <Plus className="group-hover:rotate-90 transition-transform" />
                <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.2em]">New Archive Entry</span>
              </button>
              
              <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2 max-h-[60vh] lg:max-h-none">
                {posts.map(post => (
                  <div 
                    key={post.id}
                    className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer group ${isEditing?.id === post.id ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                    onClick={() => setIsEditing(post)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-sm font-bold truncate pr-4 ${isEditing?.id === post.id ? 'text-gold' : 'text-white'}`}>{post.title}</h3>
                      {post.published ? (
                        <Eye size={12} className="text-gold/50" />
                      ) : (
                        <EyeOff size={12} className="text-white/20" />
                      )}
                    </div>
                    <p className="text-white/20 text-[9px] font-mono uppercase tracking-widest mb-3">
                      UID_{post.id?.substring(0, 8)} // {post.tags[0] || 'Unlabeled'}
                    </p>
                    <div className="flex justify-between items-center">
                       <span className={`text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter ${post.published ? 'bg-gold/10 text-gold' : 'bg-white/10 text-white/40'}`}>
                          {post.published ? 'Published' : 'Draft'}
                       </span>
                       <div className="flex space-x-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                          <button 
                            className="p-2 hover:text-red-400 bg-white/5 rounded-lg border border-white/10"
                            onClick={(e) => { e.stopPropagation(); handleDelete(post.id!); }}
                          >
                            <Trash2 size={12} />
                          </button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor Area - Full width on mobile when editing */}
            <div className={`lg:col-span-8 ${isEditing ? 'block' : 'hidden lg:block'}`}>
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.form 
                    key="editor"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSave}
                    className="glass-morphism p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 flex flex-col h-full lg:sticky lg:top-6"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-10 gap-4">
                      <div className="flex items-center space-x-3 w-full md:w-auto">
                        <button 
                          type="button" 
                          onClick={() => setIsEditing(null)}
                          className="lg:hidden p-2 bg-white/5 rounded-xl border border-white/10 text-gold hover:bg-gold hover:text-dark transition-all mr-2"
                        >
                          <X size={18} />
                        </button>
                        <Layout size={20} className="text-gold hidden md:block" />
                        <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest truncate">Entry Editor</h2>
                      </div>
                      <div className="flex space-x-2 md:space-x-3 w-full md:w-auto">
                        <button 
                          type="button" 
                          onClick={() => setIsEditing(null)}
                          className="hidden lg:block px-4 py-2 text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest font-mono"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="flex-1 md:flex-none justify-center bg-gold text-dark px-6 py-3 md:py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        >
                          <Save size={16} />
                          <span>Commit Changes</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 space-y-6 md:space-y-8 overflow-y-auto custom-scrollbar pr-2 md:pr-4">
                      {/* Form inputs */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] ml-2">Display Title</label>
                        <input 
                          value={isEditing.title}
                          onChange={(e) => setIsEditing({...isEditing, title: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white font-serif text-lg md:text-xl focus:border-gold/50 outline-none transition-all placeholder:text-white/10"
                          placeholder="Untitled Insight..."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] ml-2">Tags</label>
                          <input 
                            value={isEditing.tags.join(', ')}
                            onChange={(e) => setIsEditing({...isEditing, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 text-white text-xs font-mono focus:border-gold/50 outline-none transition-all placeholder:text-white/10"
                            placeholder="Architecture, DevOps..."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] ml-2">Thumbnail URL</label>
                          <input 
                            value={isEditing.imageUrl}
                            onChange={(e) => setIsEditing({...isEditing, imageUrl: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 text-white text-xs font-mono focus:border-gold/50 outline-none transition-all placeholder:text-white/10"
                            placeholder="https://..."
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] ml-2">Abstract Summary</label>
                        <textarea 
                          value={isEditing.excerpt}
                          onChange={(e) => setIsEditing({...isEditing, excerpt: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white text-sm font-light leading-relaxed focus:border-gold/50 outline-none transition-all placeholder:text-white/10 resize-none h-24"
                          placeholder="Short summary for the index feed..."
                        />
                      </div>

                      <div className="space-y-2">
                         <div className="flex justify-between items-center mb-2 px-2">
                            <label className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Markdown Core</label>
                            <span className="text-[8px] font-mono text-gold/30 hidden md:block">SUPPORTED_FMT: GFM</span>
                         </div>
                        <textarea 
                          value={isEditing.content}
                          onChange={(e) => setIsEditing({...isEditing, content: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 text-white text-sm font-mono leading-relaxed focus:border-gold/50 outline-none transition-all placeholder:text-white/10 resize-none h-[300px] md:h-[400px]"
                          placeholder="## Start writing..."
                          required
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 md:p-6 bg-white/5 rounded-xl md:rounded-2xl border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${isEditing.published ? 'bg-gold/20' : 'bg-white/10'}`}>
                             {isEditing.published ? <Eye size={16} className="text-gold" /> : <EyeOff size={16} className="text-white/40" />}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap">Protocol Staging</p>
                            <p className="text-[8px] font-mono text-white/30 uppercase">Status: {isEditing.published ? 'Public' : 'Draft'}</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setIsEditing({...isEditing, published: !isEditing.published})}
                          className={`w-12 md:w-14 h-7 md:h-8 rounded-full relative transition-colors flex-shrink-0 ${isEditing.published ? 'bg-gold' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-0.5 md:top-1 w-6 h-6 rounded-full bg-dark transition-all ${isEditing.published ? 'left-5 md:left-7' : 'left-0.5 md:left-1'}`} />
                        </button>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center glass-morphism rounded-[2.5rem] border border-white/5 border-dashed">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                       <Edit3 size={24} className="text-white/10" />
                    </div>
                    <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]">Awaiting Selection // Select or Create Entry</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-morphism p-6 md:p-12 rounded-[2.5rem] border border-white/10 h-full"
          >
             <div className="max-w-2xl">
                <h2 className="font-serif text-3xl text-white mb-8">Management Protocols</h2>
                <div className="space-y-6">
                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-white">Bootstrap Admin Status</p>
                        <p className="text-xs text-white/30 font-mono">Permission delegated to: mourao.martins@gmail.com</p>
                      </div>
                      <div className="px-3 py-1 bg-gold/10 text-gold rounded-full text-[10px] font-bold uppercase tracking-widest">Permanent</div>
                   </div>

                   <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center opacity-40">
                      <div>
                        <p className="text-sm font-bold text-white">System Logs</p>
                        <p className="text-xs text-white/30 font-mono">Firestore write stream tracking</p>
                      </div>
                      <div className="px-3 py-1 bg-white/10 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">Locked</div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
