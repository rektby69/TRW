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
  return (
    <div className="min-h-screen bg-ivory-100">
      <Header />
      <main>
        <Hero />
        <Services />
        <Guidance />
        <Portfolio />
        <Trust />
        <Reviews />
        <Process />
        <Contact />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
