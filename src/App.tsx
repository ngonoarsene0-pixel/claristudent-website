import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Language } from './translations';
import Admin from './components/Admin';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        isAdminMode={isAdminMode} 
        setIsAdminMode={setIsAdminMode} 
      />
      
      <main className="flex-grow pt-20">
        {isAdminMode ? (
          <Admin onExit={() => setIsAdminMode(false)} />
        ) : (
          <>
            <Hero lang={lang} />
            <About lang={lang} />
            <Testimonials lang={lang} />
            <FAQ lang={lang} />
            <Contact lang={lang} />
          </>
        )}
      </main>

      <Footer lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}