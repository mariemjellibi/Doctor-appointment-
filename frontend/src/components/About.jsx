import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-[#e0e7ff] via-[#f4f4ff] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">À propos de notre cabinet</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous offrons des soins de santé mentale adaptés aux enfants et adolescents dans un environnement chaleureux et accueillant.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center space-y-12 lg:space-y-0 lg:space-x-12">
          {/* Doctor Image */}
          <div className="lg:w-1/3 w-full flex justify-center">
            <img
              src="/assets/doctor.jpg" // Replace with actual image path
              alt="Doctor"
              className="w-full h-auto object-cover rounded-xl shadow-md transform transition-all hover:scale-105"
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-2/3 w-full lg:pl-12 p-6 rounded-lg ">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4 underline font-bold">Le Dr. [Nom du Docteur]</h3>
            <p className="text-lg text-gray-600 mb-6">
              Le Dr. Majdouline Hamdi est un psychiatre passionné par le bien-être des enfants et adolescents. Avec plus de 10 ans d'expérience, il/elle offre des soins personnalisés pour chaque patient dans un cadre bienveillant et respectueux.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Notre cabinet se distingue par une approche centrée sur l'enfant, où chaque jeune est écouté et soutenu pour retrouver confiance et sérénité.
            </p>
            <h4 className="text-2xl font-semibold text-gray-800 mb-4 underline font-bold">Pourquoi choisir notre cabinet ?</h4>
            <ul className="list-disc pl-6 text-lg text-gray-600 mt-4">
              <li>Soins personnalisés et adaptés à chaque enfant et adolescent.</li>
              <li>Un environnement chaleureux et rassurant.</li>
              <li>Écoute attentive et approche empathique.</li>
              <li>Prise en charge rapide pour des consultations de qualité.</li>
            </ul>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-12 text-center">
          <Link to="/login">
            <button className="bg-gradient-to-r from-[#4828d7] to-[#621dd7] text-white py-3 px-8 rounded-full hover:from-[#626de1] hover:to-[#4662b7] transition transform hover:scale-105">
              Prenez Rendez-vous
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
