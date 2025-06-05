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
    <div>
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <div className="pt-[100px]">
        {/* Slideshow with motion animation */}
        <motion.div 
          variants={fadeIn("down", 0.5)} 
          initial="hidden" 
          animate="show"
        >
          <Slideshow />
        </motion.div>

        {/* Sections with motion effects */}
        <motion.section 
          id="about" 
          variants={fadeIn("left", 0.3)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
        >
          <About />
        </motion.section>

        <motion.section 
          id="services" 
          variants={fadeIn("right", 0.4)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
        >
          <Services />
        </motion.section>

        <motion.section 
          id="faq" 
          variants={fadeIn("up", 0.5)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
        >
          <Faq />
        </motion.section>

        <motion.section 
          id="temoignages" 
          variants={fadeIn("down", 0.6)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
        >
          <Testimonials />
        </motion.section>

        <motion.section 
          id="contact" 
          variants={fadeIn("up", 0.7)} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }}
        >
          <Footer />
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;
