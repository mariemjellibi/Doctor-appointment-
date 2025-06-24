import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Heart, Users, Clock, Star, ArrowRight, Shield, BookOpen } from "lucide-react";

const About = () => {
  const achievements = [
    { icon: Users, number: "500+", label: "Patients accompagnés", color: "text-blue-600" },
    { icon: Award, number: "10+", label: "Années d'expérience", color: "text-green-600" },
    { icon: Star, number: "4.9/5", label: "Note de satisfaction", color: "text-yellow-600" },
    { icon: Heart, number: "98%", label: "Recommandations", color: "text-red-600" }
  ];

  const qualities = [
    {
      icon: Heart,
      title: "Approche Bienveillante",
      description: "Un environnement chaleureux où chaque enfant se sent écouté et respecté.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Soins Personnalisés",
      description: "Chaque traitement est adapté aux besoins spécifiques de votre enfant.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: BookOpen,
      title: "Expertise Reconnue",
      description: "Formation continue et utilisation des dernières méthodes thérapeutiques.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Disponibilité",
      description: "Prise en charge rapide et suivi régulier pour un accompagnement optimal.",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            À propos de notre 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> cabinet</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des soins de santé mentale spécialisés pour enfants et adolescents dans un environnement accueillant et sécurisant
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Doctor Image & Info */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/assets/doctor.jpg"
                  alt="Dr. Majdouline Hamdi"
                  className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating credential card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Certifiée</p>
                    <p className="text-sm text-gray-600">Psychiatre infantile</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 blur-xl"></div>
            </div>

            {/* Achievements */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mt-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300"
                    variants={itemVariants}
                  >
                    <IconComponent className={`w-8 h-8 ${achievement.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-gray-800">{achievement.number}</div>
                    <div className="text-sm text-gray-600">{achievement.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Dr. Majdouline Hamdi
                <span className="block text-lg font-normal text-blue-600 mt-1">
                  Psychiatre spécialisée en pédopsychiatrie
                </span>
              </h3>
              
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Passionnée par le bien-être des enfants et adolescents, Dr. Hamdi accompagne les jeunes patients 
                  et leurs familles depuis plus de 10 ans avec une approche holistique et bienveillante.
                </p>
                <p>
                  Notre cabinet se distingue par une méthode centrée sur l'enfant, où chaque jeune est écouté, 
                  compris et soutenu dans un environnement sécurisant pour retrouver confiance et sérénité.
                </p>
              </div>

              {/* Professional credentials */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2">Formations & Certifications</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Doctorat en Psychiatrie - Université de Tunis</li>
                  <li>• Spécialisation en Pédopsychiatrie</li>
                  <li>• Formation continue en thérapies cognitivo-comportementales</li>
                  <li>• Membre de la Société Tunisienne de Psychiatrie</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Pourquoi choisir notre cabinet ?
          </h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {qualities.map((quality, index) => {
              const IconComponent = quality.icon;
              return (
                <motion.div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  variants={itemVariants}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${quality.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {quality.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {quality.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-4">
            Prêt à commencer le parcours de votre enfant ?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Prenez rendez-vous dès aujourd'hui pour une consultation personnalisée
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
                Prendre Rendez-vous
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
              Appeler maintenant
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Réponse sous 24h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Consultations sécurisées</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;