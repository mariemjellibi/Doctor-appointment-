import Slideshow from "../components/Slideshow";
import NavBar from "../components/NavBar";
import About from "../components/About";
import Services from "../components/Services";
import Faq from "../components/Faq";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Slideshow />
      {/* Add IDs to the sections */}
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="faq">
        <Faq />
      </div>
      <div id="temoignages">
<Testimonials/>
      </div>
      <div id="contact">
        <Footer/>
      </div>
    </div>
  );
};

export default HomePage;
