import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Trash2, User, Clock } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { commentService, Comment } from '../services/commentService';
import { format } from 'date-fns';

interface CommentsProps {
  postId: string;
  isAdmin: boolean;
}

export default function Comments({ postId, isAdmin }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(setUser);
    const unsubscribeComments = commentService.subscribeToComments(postId, setComments);
    
    return () => {
      unsubscribeAuth();
      unsubscribeComments();
    };
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await commentService.addComment(postId, newComment);
      setNewComment('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (window.confirm('Erase this message from the archive?')) {
      await commentService.deleteComment(postId, commentId);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '...';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return format(date, 'MMM dd, HH:mm');
  };

  return (
    <div className="mt-24 pt-12 border-t border-white/5 max-w-2xl mx-auto w-full">
      <div className="flex items-center space-x-3 mb-10">
        <MessageSquare size={20} className="text-gold" />
        <h3 className="text-xl font-serif text-white tracking-tight">Archives Discourse</h3>
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
          [{comments.length}_Entries]
        </span>
      </div>

      {/* Input Area */}
      <div className="mb-12">
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-6 h-6 rounded-md border border-gold/30 overflow-hidden">
                <img src={user.photoURL || ''} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest">{user.displayName}</span>
            </div>
            <div className="relative">
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Initialize discourse entry..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm font-light focus:border-gold/50 outline-none transition-all placeholder:text-white/10 resize-none h-32"
                maxLength={1000}
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="absolute bottom-4 right-4 bg-gold hover:bg-white text-dark p-2 rounded-xl transition-all disabled:opacity-50 disabled:grayscale group"
              >
                <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </form>
        ) : (
          <div className="glass-morphism p-8 rounded-3xl border border-white/5 text-center">
            <p className="text-white/30 text-xs font-mono uppercase tracking-[0.2em] mb-6">
              Authentication required for discourse participation.
            </p>
            <button 
              onClick={handleLogin}
              className="inline-flex items-center space-x-3 bg-white/5 hover:bg-gold hover:text-dark px-6 py-3 rounded-xl border border-white/10 transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              <User size={16} />
              <span>Identity Verification</span>
            </button>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.div 
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative group"
            >
              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold/40">
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold text-white tracking-wide">{comment.authorName}</span>
                      <span className="text-[9px] font-mono text-white/20 flex items-center">
                        <Clock size={10} className="mr-1" />
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    {(isAdmin || user?.uid === comment.authorId) && (
                      <button 
                        onClick={() => handleDelete(comment.id!)}
                        className="text-white/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div className="text-white/60 text-sm font-light leading-relaxed">
                    {comment.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {comments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/10 font-mono text-[9px] uppercase tracking-[0.4em]">No entries recorded in discourse.</p>
          </div>
        )}
      </div>
    </div>
  );
}
