import React from 'react';
import ContactUsForm from '../../ContactPage/ContactUsForm';
import HighlightText from '../HomePage/HighlightText'; // Assuming HighlightText is in this path

const ContactForm = () => {
  return (
    // Main container with relative positioning for the background glow
    <div className="relative max-w-2xl mx-auto px-6 py-12 rounded-2xl">
      
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/20 to-burnt-sienna/20 rounded-full blur-3xl -z-10"></div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-espresso-brown mb-4">
        Get in <HighlightText text={"Touch"} />
      </h1>
      
      {/* Subheading */}
      <p className="text-center text-espresso-brown/80 mb-10">
        We'd love to hear from you! Please fill out this form and our team will get back to you as soon as possible.
      </p>

      {/* The actual form component */}
      <div className="relative z-10">
        <ContactUsForm />
      </div>
      
    </div>
  );
};

export default ContactForm;