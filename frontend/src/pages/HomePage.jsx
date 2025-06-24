import Slideshow from "../components/Slideshow";
import NavBar from "../components/NavBar";
import About from "../components/About";
import Services from "../components/Services";
import Faq from "../components/Faq";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { fadeIn } from "../framerMotion/variants";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <div className="pt-[100px] overflow-hidden">
        {/* Slideshow with enhanced motion animation */}
        <motion.div 
          variants={fadeIn("down", 0.5)} 
          initial="hidden" 
          animate="show"
          className="relative z-10"
        >
          <Slideshow />
        </motion.div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-3/4 right-10 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Enhanced sections with improved spacing and backgrounds */}
        <motion.section 
          id="about" 
          variants={fadeIn("left", 0.3)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mb-20"
        >
          <About />
        </motion.section>

        <motion.section 
          id="services" 
          variants={fadeIn("right", 0.4)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mb-20"
        >
          <Services />
        </motion.section>

        <motion.section 
          id="faq" 
          variants={fadeIn("up", 0.5)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mb-20"
        >
          <Faq />
        </motion.section>

        <motion.section 
          id="temoignages" 
          variants={fadeIn("down", 0.6)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mb-20"
        >
          <Testimonials />
        </motion.section>

        <motion.section 
          id="contact" 
          variants={fadeIn("up", 0.7)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10"
        >
          <Footer />
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;