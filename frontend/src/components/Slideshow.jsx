import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slides = [
    {
      image: "/assets/pic1.jpg",
      caption: "Bienvenue dans notre cabinet de psychiatrie de l'enfant et de l'adolescent",
      title: "Accueil Chaleureux",
      description: "Un environnement bienveillant pour votre enfant"
    },
    {
      image: "/assets/pic2.jpg",
      caption: "Nos services sont dédiés aux enfants et adolescents",
      title: "Expertise Spécialisée",
      description: "Des professionnels qualifiés pour accompagner votre enfant"
    },
    {
      image: "/assets/pic4.jpg",
      caption: "Prenez rendez-vous pour des soins de qualité",
      title: "Soins Personnalisés",
      description: "Une approche adaptée à chaque situation"
    },
  ];

  const nextSlide = useCallback(() => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setSlideIndex(index);
  }, []);

  // Auto-advance functionality
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(!isPaused);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isPaused]);

  // Touch navigation
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Preload images
  useEffect(() => {
    const imagePromises = slides.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = slide.image;
      });
    });

    Promise.all(imagePromises)
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(true)); // Still show content even if images fail
  }, [slides]);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Slideshow de présentation"
    >
      {/* Slideshow Background */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            index === slideIndex 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
          style={{ 
            backgroundImage: `url(${slide.image})`, 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }}
          aria-hidden={index !== slideIndex}
        />
      ))}

      {/* Enhanced Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent flex items-center justify-center">
        <div className="px-6 sm:px-8 lg:px-16 max-w-4xl text-center">
          <div className="mb-4">
            <span className="inline-block bg-blue-600/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              {slides[slideIndex].title}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 animate-fade-in">
            {slides[slideIndex].caption}
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in">
            {slides[slideIndex].description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <button 
              onClick={() => window.location.href = '/login'}
              className="w-full sm:w-auto bg-blue-600 text-white py-4 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold"
            >
              Prendre rendez-vous
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white py-4 px-8 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
        aria-label="Diapositive précédente"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
        aria-label="Diapositive suivante"
      >
        <ChevronRight size={24} />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
        aria-label={isPaused ? "Reprendre le slideshow" : "Mettre en pause le slideshow"}
      >
        {isPaused ? <Play size={20} /> : <Pause size={20} />}
      </button>

      {/* Enhanced Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              index === slideIndex 
                ? "bg-white scale-125 shadow-lg" 
                : "bg-gray-400 hover:bg-gray-300"
            }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
            aria-current={index === slideIndex ? "true" : "false"}
          >
            {/* Progress indicator for current slide */}
            {index === slideIndex && !isPaused && (
              <div 
                className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse"
                style={{
                  animation: `slideProgress 5s linear infinite`
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 right-6 bg-black/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {slideIndex + 1} / {slides.length}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideProgress {
          0% { transform: scale(1) rotate(0deg); opacity: 0.7; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
          100% { transform: scale(1) rotate(360deg); opacity: 0.7; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Slideshow;