import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedPrograms from './components/FeaturedPrograms'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="fade-in min-h-screen w-full bg-light text-dark transition-colors duration-300 dark:bg-dark dark:text-light">
      <Navbar />
      <main>
        <Hero />
        <FeaturedPrograms />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
