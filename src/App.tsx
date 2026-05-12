import React, { useRef, useEffect, useState } from 'react';
import { trackPageView } from './lib/analytics';
import Navbar from "./components/Navbar";
import Bio from "./components/Bio";
import SocialMedia from "./components/SocialMedia";
import Portfolio from "./components/Portfolio";
import Books from "./components/Books";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import FeedSidebar from "./components/FeedSidebar";
import BackToTop from "./components/BackToTop";
import AdminPanel from "./components/AdminPanel";
import SEO from "./components/SEO";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    trackPageView(window.location.pathname);
    
    // Simple routing for admin
    const handleLocationChange = () => {
      setIsAdminView(window.location.pathname === '/admin' || window.location.hash === '#admin');
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  if (isAdminView) {
    return (
      <>
        <SEO 
          title="Admin Portal" 
          description="Restricted administrative access for archive management."
        />
        <AdminPanel />
      </>
    );
  }

  return (
    <main className="font-sans antialiased bg-dark bg-mesh min-h-screen text-[#E5E5E5] selection:bg-gold/30 overflow-hidden">
      <SEO 
        title="Architecture & Tech Insights" 
        description="Official portfolio of Pedro Martins. Exploring software architecture, technological innovation, and literary discourse."
        keywords="Pedro Martins, Architecture, Software Engineering, PWA, React, Tech Books, NLP, Gemini API"
      />
      <Navbar />
      <FeedSidebar />
      <BackToTop containerRef={containerRef} />
      <div ref={containerRef} className="snap-container no-scrollbar">
        <section className="snap-section">
          <Bio />
        </section>
        <section className="snap-section">
          <SocialMedia />
        </section>
        <section className="snap-section">
          <Portfolio />
        </section>
        <section className="snap-section">
          <Blog />
        </section>
        <section className="snap-section">
          <Books />
        </section>
        <section className="snap-section">
          <Footer />
        </section>
      </div>
    </main>
  );
}
