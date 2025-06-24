import { useState } from "react";
import { ChevronDown, Phone, Calendar, CreditCard, Clock, Users, FileText, Heart } from "lucide-react";

const Faq = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      icon: <Phone className="w-5 h-5" />,
      question: "Comment prendre un rendez-vous ?",
      answer: "Vous pouvez nous contacter par téléphone au +216 XX XXX XXX, via notre formulaire en ligne, ou directement en cabinet. Nous proposons également des consultations d'urgence pour les situations critiques."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      question: "Durée et fréquence des séances",
      answer: "Les séances durent généralement 45 à 60 minutes pour les adolescents et 30 à 45 minutes pour les enfants. La fréquence varie selon les besoins : hebdomadaire pour les suivis intensifs, bimensuelle pour l'entretien."
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      question: "Tarifs et remboursements",
      answer: "Nos tarifs sont alignés avec les recommandations du système de santé tunisien. Les consultations peuvent être partiellement remboursées par la CNSS ou les assurances privées. Nous proposons des facilités de paiement si nécessaire."
    },
    {
      icon: <Users className="w-5 h-5" />,
      question: "Accompagnement des parents",
      answer: "L'implication des parents est essentielle. Nous organisons des séances familiales, des entretiens de guidance parentale et fournissons des conseils pratiques pour soutenir votre enfant au quotidien."
    },
    {
      icon: <FileText className="w-5 h-5" />,
      question: "Confidentialité et dossier médical",
      answer: "Toutes nos consultations respectent le secret médical. Pour les mineurs, nous maintenons un équilibre entre confidentialité du patient et information nécessaire aux parents, toujours dans l'intérêt de l'enfant."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      question: "Que se passe-t-il lors de la première consultation ?",
      answer: "La première séance est un moment d'évaluation où nous faisons connaissance avec l'enfant et sa famille. Nous discutons des difficultés rencontrées, de l'historique médical et établissons ensemble un plan de soins personnalisé."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que vous devez savoir sur nos consultations en psychiatrie de l'enfant et de l'adolescent
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* FAQ Section */}
          <div className="flex-1 space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openItems.has(index)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 pr-4">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      openItems.has(index) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openItems.has(index) 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6">
                    <div className="pl-14">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image and Info Section */}
          <div className="lg:w-2/5 space-y-8">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="assets/image.jpg"
                alt="Consultation psychiatrique - Cabinet spécialisé enfants et adolescents"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Environnement Bienveillant</h3>
                <p className="text-sm opacity-90">Un cadre adapté aux enfants et adolescents</p>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Horaires</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Lun-Ven: 8h-17h<br />
                  Urgences: 24h/24
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Contact</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  +216 XX XXX XXX<br />
                  Tunis, Tunisie
                </p>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-xl">
              <h3 className="text-xl font-semibold mb-3">Besoin d'aide ?</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Notre équipe est là pour répondre à toutes vos questions et vous accompagner.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 w-full">
                Nous Contacter
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-gray-600 mb-6">
              N'hésitez pas à nous contacter directement. Nous sommes là pour vous aider et répondre à toutes vos préoccupations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200">
                Prendre Rendez-vous
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200">
                Poser une Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;