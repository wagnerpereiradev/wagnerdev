import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      <Navbar />
      <Hero />
      <Profile />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
