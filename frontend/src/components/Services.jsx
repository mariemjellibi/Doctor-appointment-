const Services = () => {
    const steps = [
      {
        number: "1",
        title: "Anamnèse",
        description:
          "Nous recueillons des informations détaillées sur le développement et les antécédents de l'enfant.",
      },
      {
        number: "2",
        title: "Évaluations",
        description:
          "Des tests psychologiques et des observations sont effectués pour établir un diagnostic précis.",
      },
      {
        number: "3",
        title: "Restitution",
        description:
          "Nous expliquons les résultats de manière claire et bienveillante à la famille.",
      },
    ];
  
    return (
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between  bg-gradient-to-r from-[#e0e7ff] via-[#f4f4ff] to-white p-8 lg:p-16 rounded-lg shadow-md">
        {/* Timeline Section */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
            Évaluation et diagnostic
          </h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute top-0 left-4 h-full border-l-2 border-blue-200"></div>
  
            {/* Steps */}
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start mb-8 last:mb-0 pl-10 relative"
              >
                {/* Step Number */}
                <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-500 font-bold rounded-full shadow">
                  {step.number}
                </div>
  
                {/* Step Content */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Image Section */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <img
            src="/assets/image1.jpg" // Remplacez par le chemin de votre image
            alt="Doctor and child"
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    );
  };
  
  export default Services;
  