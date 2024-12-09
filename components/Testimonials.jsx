import React, { useState } from 'react';

const Testimonials = ({ setTestimonialsVisible }) => {
  const [testimonials, setTestimonials] = useState([
    "This is an amazing initiative. I donated blood for the first time and the experience was great! -Alejandro Gutiérrez",
    "I received a blood donation last month and it saved my life. Thank you to all the donors! - Juliette Dubois",
    `Donating blood is such an easy way to help others. I'm proud to be part of this community. -Fatima Abdelkarim`,
    `I registered as an organ donor after hearing stories of people who received transplants. Knowing that I could 
    be part of someone’s second chance at life gives me a sense of peace and purpose. -Sophie Watts`,
    `I donated blood in honor of my uncle who had surgery. Knowing that my donation could help someone like him 
    was an amazing feeling. Please donate if you can — it truly saves lives! -Carlos R`
  ]);
  const [newTestimonial, setNewTestimonial] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTestimonial.trim() !== '') {
      setTestimonials([...testimonials, newTestimonial.trim()]);
      setNewTestimonial('');
    }
  };

  return (
    <div className="testimonials-modal">
      <div className="testimonials-content">
        {/* Close button */}
        <span className="close-btn" onClick={() => setTestimonialsVisible(false)}>
          &times;
        </span>
        <h2>Testimonials</h2>
        
        {/* Display existing testimonials */}
        <div className="testimonials-list">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <p>{testimonial}</p>
            </div>
          ))}
        </div>
        
        {/* Form to submit a new testimonial */}
        <form onSubmit={handleSubmit} className="testimonial-form">
          <textarea
            value={newTestimonial}
            onChange={(e) => setNewTestimonial(e.target.value)}
            placeholder="Share your experience..."
          ></textarea>
          <button type="submit">Submit Testimonial</button>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;
