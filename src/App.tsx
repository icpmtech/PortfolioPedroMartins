import Navbar from "./components/Navbar";
import Bio from "./components/Bio";
import Portfolio from "./components/Portfolio";
import Books from "./components/Books";
import Footer from "./components/Footer";
import FeedSidebar from "./components/FeedSidebar";

export default function App() {
  return (
    <main className="font-sans antialiased bg-[#0A0A0A] text-[#E5E5E5] selection:bg-gold/30">
      <Navbar />
      <FeedSidebar />
      <div className="snap-container no-scrollbar">
        <section className="snap-section">
          <Bio />
        </section>
        <section className="snap-section">
          <Portfolio />
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
