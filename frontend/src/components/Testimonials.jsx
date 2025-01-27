import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    { text: "Nous nous sentons enfin écoutés et compris.", author: "Famille de Mathis", age: "8 ans" },
    { text: "Le traitement a vraiment changé la vie de notre fille.", author: "Parents d'Emma", age: "14 ans" },
    { text: "L'équipe est à l'écoute et très professionnelle.", author: "Jeanne", age: "17 ans" },
    { text: "Nous recommandons vivement ce cabinet.", author: "Famille de Léo", age: "11 ans" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="bg-gradient-to-r from-[#e0e7ff] via-[#f4f4ff] to-white py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Témoignages de nos patients
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-blue-100 p-4 rounded-xl shadow-sm text-gray-800"
              variants={itemVariants}
            >
              <p className="italic">« {testimonial.text} »</p>
              <p className="mt-4 text-sm font-medium text-gray-600">
                - {testimonial.author}, {testimonial.age}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
