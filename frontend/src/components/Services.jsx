import { motion } from "framer-motion";
import { FileText, Search, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";

const Services = () => {
  const steps = [
    {
      number: "1",
      title: "Anamnèse",
      description: "Nous recueillons des informations détaillées sur le développement et les antécédents de l'enfant dans un environnement bienveillant.",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      number: "2", 
      title: "Évaluations",
      description: "Des tests psychologiques et des observations sont effectués pour établir un diagnostic précis et personnalisé.",
      icon: Search,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      number: "3",
      title: "Restitution",
      description: "Nous expliquons les résultats de manière claire et bienveillante à la famille, avec un plan de suivi adapté.",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
  ];

  const features = [
    "Approche personnalisée pour chaque enfant",
    "Environnement sécurisé et rassurant",
    "Équipe spécialisée en psychiatrie infantile", 
    "Suivi continu et adaptatif"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
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
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Notre Processus d'
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Évaluation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un parcours structuré et bienveillant pour comprendre et accompagner votre enfant
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-16">
          {/* Process Timeline */}
          <motion.div 
            className="w-full xl:w-2/3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative">
              {/* Desktop vertical line */}
              <div className="hidden md:block absolute top-0 left-8 h-full w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 rounded-full"></div>

              {/* Steps */}
              <div className="space-y-8">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <motion.div
                      key={index}
                      className="relative"
                      variants={itemVariants}
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        {/* Step number and icon */}
                        <div className="flex items-center space-x-4 md:space-x-0">
                          {/* Number circle - visible on mobile */}
                          <div className={`md:hidden w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {step.number}
                          </div>
                          
                          {/* Desktop icon circle */}
                          <div className={`hidden md:flex relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                        </div>

                        {/* Content card */}
                        <div className={`flex-1 ${step.bgColor} ${step.borderColor} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm`}>
                              {step.number}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Arrow connector - desktop only */}
                        {index < steps.length - 1 && (
                          <div className="hidden md:block absolute left-8 top-20 transform translate-x-1/2">
                            <ArrowRight className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Features section */}
            <motion.div 
              className="mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Pourquoi choisir notre approche ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Image Section */}
          <motion.div 
            className="w-full xl:w-1/3"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative">
              {/* Main image container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/assets/image1.jpg"
                  alt="Docteur et enfant lors d'une consultation"
                  className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Floating stats card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">500+</div>
                      <div className="text-sm text-gray-600">Patients suivis</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">98%</div>
                      <div className="text-sm text-gray-600">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
            </div>

            {/* Call to action */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Commencer l'évaluation
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <p className="mt-3 text-sm text-gray-600">
                Premier rendez-vous disponible sous 48h
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;