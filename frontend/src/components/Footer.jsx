import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" }
  ];

  const services = [
    "Consultation en ligne",
    "Séances de groupe", 
    "Suivi personnalisé",
    "Ateliers de bien-être"
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Contactez-nous
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-200">Adresse</p>
                      <p className="text-gray-400">123 Rue de la Santé, Tunis, TN</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <Phone className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-200">Téléphone</p>
                      <a href="tel:+21612345678" className="text-gray-400 hover:text-green-400 transition-colors">
                        +216 12 345 678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-200">Email</p>
                      <a href="mailto:contact@docteur.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                        contact@docteur.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                      <Clock className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-200">Heures d'ouverture</p>
                      <p className="text-gray-400 text-sm">Lun-Ven: 8h-18h</p>
                      <p className="text-gray-400 text-sm">Sam: 9h-16h</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Nos Services Spéciaux
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></div>
                      <span>{service}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="pt-6">
                <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Prendre Rendez-vous
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Social Media & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Restez Connecté
              </h3>
              
              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-200">Suivez-nous</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:bg-gray-700 transform hover:scale-110 transition-all duration-300`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-200">Newsletter</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Recevez nos conseils et actualités directement dans votre boîte email
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                    S'abonner
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 Docteur Majdouline Hamdi. Tous droits réservés.
              </p>
              
              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
              >
                <span className="text-sm">Retour en haut</span>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;