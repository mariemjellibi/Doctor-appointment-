const Faq = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 rounded-2xl shadow-lg bg-gradient-to-r from-[#e0e7ff] via-[#f4f4ff] to-white">
      {/* Text Section */}
      <div className="flex-1">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center">
  Informations sur les rendez-vous
</h2>

        <div className="space-y-6">
          {/* Question 1 */}
          <details className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <summary className="flex items-center justify-between font-medium text-lg text-gray-700 cursor-pointer hover:text-indigo-600">
              <span>Comment prendre un rendez-vous ?</span>
              <svg
                className="w-6 h-6 text-gray-500 group-open:rotate-180 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="text-gray-600 mt-3 pl-4">
              Vous pouvez nous contacter par téléphone ou via notre site web pour
              planifier une première consultation.
            </p>
          </details>

          {/* Question 2 */}
          <details className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <summary className="flex items-center justify-between font-medium text-lg text-gray-700 cursor-pointer hover:text-indigo-600">
              <span>Durée et fréquence des séances</span>
              <svg
                className="w-6 h-6 text-gray-500 group-open:rotate-180 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="text-gray-600 mt-3 pl-4">
              Les séances durent généralement 45 à 60 minutes et ont lieu de façon hebdomadaire ou bimensuelle.
            </p>
          </details>

          {/* Question 3 */}
          <details className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <summary className="flex items-center justify-between font-medium text-lg text-gray-700 cursor-pointer hover:text-indigo-600">
              <span>Tarifs et remboursements</span>
              <svg
                className="w-6 h-6 text-gray-500 group-open:rotate-180 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="text-gray-600 mt-3 pl-4">
              Nos tarifs sont alignés avec les recommandations de la sécurité sociale. Certains frais peuvent être remboursés.
            </p>
          </details>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-shrink-0 w-full md:w-1/3">
        <img
          src="assets/image.jpg"
          alt="Notes et lunettes"
          className="rounded-xl object-cover max-w-full h-auto shadow-md"
        />
      </div>
    </div>
  );
};

export default Faq;
