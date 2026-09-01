import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ProfessionalStats from "./components/ProfessionalStats/ProfessionalStats";
import PersonalIntro from "./components/PersonalIntro/PersonalIntro";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import CampanasIntegrales from "./components/CampanasIntegrales/CampanasIntegrales";
import Skills from "./components/Skills/Skills";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { useT } from "./i18n/LanguageContext";

function App() {
  const t = useT();
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.skipLink}
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <ProfessionalStats />
        <PersonalIntro />
        <Experience />
        <Projects />
        <CampanasIntegrales />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
