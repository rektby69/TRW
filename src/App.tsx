import { usePreferences } from '@/hooks/usePreferences';
import { PrefContext } from '@/context/PrefContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Classes } from '@/sections/Classes';
import { Studio } from '@/sections/Studio';
import { Schedule } from '@/sections/Schedule';
import { Instructors } from '@/sections/Instructors';
import { Gallery } from '@/sections/Gallery';
import { GettingStarted } from '@/sections/GettingStarted';
import { Location } from '@/sections/Location';
import { Reviews } from '@/sections/Reviews';
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
          <Classes />
          <Studio />
          <Schedule />
          <Instructors />
          <Gallery />
          <GettingStarted />
          <Location />
          <Reviews />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </PrefContext.Provider>
  );
}

export default App;
