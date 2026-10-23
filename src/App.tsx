import { usePreferences } from '@/hooks/usePreferences';
import { PrefContext } from '@/context/PrefContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Guidance } from '@/sections/Guidance';
import { Portfolio } from '@/sections/Portfolio';
import { Trust } from '@/sections/Trust';
import { Reviews } from '@/sections/Reviews';
import { Process } from '@/sections/Process';
import { Contact } from '@/sections/Contact';
import { FAQ } from '@/sections/FAQ';
import { FinalCTA } from '@/sections/FinalCTA';

function App() {
  const prefs = usePreferences();

  return (
    <PrefContext.Provider value={prefs}>
      <div className="min-h-screen bg-ivory-100 transition-colors duration-300 dark:bg-ink-950">
        <Header />
        <main>
          <Hero />
          <Services />
          <Guidance />
          <Portfolio />
          <Trust />
          <Process />
          <Reviews />
          <Contact />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </PrefContext.Provider>
  );
}

export default App;
