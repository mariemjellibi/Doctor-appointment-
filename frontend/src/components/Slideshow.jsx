import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      image: "/assets/pic1.jpg", // Replace with actual paths to your images
      caption: "Bienvenue dans notre cabinet de psychiatrie de l'enfant et de l'adolescent",
    },
    {
      image: "/assets/pic2.jpg",
      caption: "Nos services sont dédiés aux enfants et adolescents",
    },
    {
      image: "/assets/pic4.jpg",
      caption: "Prenez rendez-vous pour des soins de qualité",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // 5-second interval

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slideshow Background */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === slideIndex ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        ></div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-grey via-grey/50 to-transparent flex items-center justify-center">
        <div className="px-8 lg:px-16 max-w-3xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-snug mb-4">
            Bienvenue dans notre cabinet de psychiatrie de lenfant et de ladolescent
          </h1>
          <p className="text-lg text-white mb-6">
            Nous sommes dédiés à offrir des soins de santé mentale de haute qualité aux enfants et aux adolescents.
          </p>
          <div className="mt-6 space-x-4 flex justify-center">
           <Link to="/login">
           <button className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition transform hover:scale-105">
              Prendre rendez-vous
            </button> </Link>
            <Link to="/"><button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full hover:bg-white hover:text-gray-700 transition transform hover:scale-105">
              En savoir plus
            </button>
            </Link>
            
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setSlideIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${index === slideIndex ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
