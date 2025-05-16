import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import Process from '@/components/Process';
import Projects from '@/components/Projects';
// import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Script from 'next/script';

export default function Home() {
  return (
    <main className="bg-neutral-950 text-neutral-100 cursor-default select-none">
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Wagner Pereira',
            url: 'https://wagnerai.me',
            jobTitle: 'Desenvolvedor Full Stack',
            worksFor: {
              '@type': 'Organization',
              name: 'Wagner Pereira Dev'
            },
            image: 'https://wagnerai.me/images/profile.jpg',
            sameAs: [
              'https://github.com/wagnerpereiradev',
              'https://linkedin.com/in/owrp',
              'https://instagram.com/wagnerai.me',
              'https://x.com/wagnerdvlpr'
            ],
            description: 'Desenvolvedor Full Stack especializado em criar experiências digitais modernas.'
          })
        }}
      />
      <Navbar />
      <Hero />
      <Profile />
      <Process />
      <Projects />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </main>
  );
}
