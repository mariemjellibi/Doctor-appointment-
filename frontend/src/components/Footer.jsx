const Footer = () => {
    return (
      <footer className="bg-[#8eaaea]  py-8">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Contact Section */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contactez-nous</h3>
              <p className="mb-2">
                <strong>Adresse:</strong> 123 Rue de la Santé, Tunis, TN
              </p>
              <p className="mb-2">
                <strong>Téléphone:</strong> +216 12 345 678
              </p>
              <p className="mb-2">
                <strong>Email:</strong> contact@docteur.com
              </p>
              <div className="mt-4">
                <h4 className="text-xl font-semibold">Suivez-nous</h4>
                <div className="flex space-x-4 mt-2">
                 <a href="#" >    <img src="/assets/facebook.webp" alt="Facebook" className="w-17 h-17"/>
                 
                
                  </a>
                  <a href="#" className="text-blue-400 hover:text-blue-600">
                  <img src="/assets/twitter.png"  alt="twitter" className="w-17 h-17"/>
                  </a>
                  <a href="#" className="text-pink-500 hover:text-pink-700">
                    <img src="/assets/insta.png" alt="insta" className="w-17 h-17"/>
                  </a>
                </div>
              </div>
            </div>
  
            {/* Special Services Section */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Nos Services Spéciaux</h3>
              <ul className="space-y-2">
                <li>

                  <a href="#" className="text-gray-700 hover:text-white">
                    Consultation en ligne
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-white">
                    Séances de groupe
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-white">
                    Suivi personnalisé
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-white">
                    Ateliers de bien-être
                  </a>
                </li>
              </ul>
            </div>
  
          </div>
  
          {/* Footer Bottom */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Docteur. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  