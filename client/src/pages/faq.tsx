import { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. The product must be unused and in original packaging.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping typically takes 3–7 business days depending on your location.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, our support team is available 24/7 via email or live chat.",
  },
  {
    question: "Can I change my order after placing it?",
    answer:
      "Orders can be changed within 2 hours of placing them by contacting support.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 text-left text-gray-800 font-medium focus:outline-none flex justify-between items-center"
              >
                {faq.question}
                <span className="ml-4 text-gray-500 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
