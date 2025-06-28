import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Phone,
  Mail,
  Calendar,
  HelpCircle,
  ArrowRight,
  Mic,
  MicOff
} from 'lucide-react';

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['En savoir plus sur vos services', 'Demander un devis', 'Prendre rendez-vous', 'FAQ']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Predefined responses for demo
  const responses = {
    services: {
      text: "Nous offrons une gamme complète de services digitaux : développement web, applications mobiles, stratégie digitale, et consulting tech. Souhaitez-vous en savoir plus sur un service spécifique?",
      suggestions: ['Développement web', 'Apps mobiles', 'Consulting', 'Voir tous les services']
    },
    devis: {
      text: "Je serais ravi de vous aider avec un devis personnalisé! Pour vous proposer la meilleure solution, j'aurais besoin de quelques informations sur votre projet.",
      suggestions: ['Type de projet', 'Budget approximatif', 'Délais souhaités', 'Prendre RDV']
    },
    contact: {
      text: "Parfait! Vous pouvez nous contacter de plusieurs façons : par téléphone, email, ou planifier un rendez-vous directement. Quelle option préférez-vous?",
      suggestions: ['Téléphone', 'Email', 'Rendez-vous', 'Chat en direct']
    },
    faq: {
      text: "Voici nos questions les plus fréquentes : Quels sont vos délais? Travaillez-vous avec des startups? Proposez-vous de la maintenance? Sur quoi souhaitez-vous plus d'informations?",
      suggestions: ['Délais projets', 'Tarification', 'Process de travail', 'Technologies utilisées']
    }
  };

  const quickActions = [
    { icon: Phone, text: 'Appeler', action: 'contact' },
    { icon: Mail, text: 'Email', action: 'contact' },
    { icon: Calendar, text: 'RDV', action: 'devis' },
    { icon: HelpCircle, text: 'FAQ', action: 'faq' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text = inputText, isQuickAction = false) => {
    if (!text.trim()) return;
//we need to create the user message first 
    const userMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

//now it is time to add the users's message 

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
  setTimeout(() => {
      const botResponse = generateResponse(text);
        setMessages(prev => [...prev, botResponse]);    
      setIsTyping(false);
    }, 1000);
        
  };

  const generateResponse = (input) => {
    let response = responses.services; // default

    if (input.includes('service') || input.includes('développement') || input.includes('web')) {
      response = responses.services;
    } else if (input.includes('devis') || input.includes('prix') || input.includes('coût') || input.includes('rdv') || input.includes('rendez-vous')) {
      response = responses.devis;
    } else if (input.includes('contact') || input.includes('téléphone') || input.includes('email') || input.includes('appel')) {
      response = responses.contact;
    } else if (input.includes('faq') || input.includes('question') || input.includes('aide')) {
      response = responses.faq;
    }

    return {
      id: Date.now() + 1,
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: response.suggestions
    };
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion, true);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
    setTimeout(() => setIsListening(false), 3000); // Demo timeout
  };

  const handleQuickAction = (actionType) => {
    const actionTexts = {
      contact: 'Je souhaite vous contacter',
      devis: 'Je voudrais un devis',
      faq: 'J\'ai des questions fréquentes'
    };
    handleSendMessage(actionTexts[actionType] || 'Bonjour', true);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={24} />
          
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Notification dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Assistant AI</h3>
                  <p className="text-xs text-blue-100">En ligne • Répond en temps réel</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-gray-50 border-b">
              <div className="flex space-x-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center space-x-1 bg-white px-3 py-2 rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <action.icon size={14} />
                    <span>{action.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    }`}>
                      {message.sender === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                    </div>
                    <div>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      
                      {/* Suggestions */}
                      {message.sender === 'bot' && message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center justify-between">
                                <span>{suggestion}</span>
                                <ArrowRight size={14} />
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Sparkles size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Tapez votre message..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
                <motion.button
                  onClick={toggleVoice}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </motion.button>
                <motion.button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                  whileHover={{ scale: inputText.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: inputText.trim() ? 0.95 : 1 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAgent;