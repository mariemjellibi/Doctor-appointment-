import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    { 
      text: "Nous nous sentons enfin écoutés et compris. L'approche du Dr. Hamdi a transformé notre quotidien.", 
      author: "Famille de Mathis", 
      age: "8 ans",
      rating: 5
    },
    { 
      text: "Le traitement a vraiment changé la vie de notre fille. Elle a retrouvé sa joie de vivre.", 
      author: "Parents d'Emma", 
      age: "14 ans",
      rating: 5
    },
    { 
      text: "L'équipe est à l'écoute et très professionnelle. Un environnement parfait pour les enfants.", 
      author: "Jeanne", 
      age: "17 ans",
      rating: 5
    },
    { 
      text: "Nous recommandons vivement ce cabinet. Des soins exceptionnels dans un cadre bienveillant.", 
      author: "Famille de Léo", 
      age: "11 ans",
      rating: 5
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    },
  };

  return (
    <div className="relative py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <Quote className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Témoignages de nos 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> patients</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les expériences de familles qui nous ont fait confiance pour accompagner leurs enfants
          </p>
        </motion.div>

        {/* Enhanced Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Rating stars */}
              <div className="flex items-center mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-gray-700 mb-6 italic font-medium leading-relaxed">
                « {testimonial.text} »
              </blockquote>

              {/* Author info */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800 text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-blue-600 text-xs font-medium">
                      {testimonial.age}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover effect gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Rejoignez les familles qui nous font confiance
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Prendre Rendez-vous
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;