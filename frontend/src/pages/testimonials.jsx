import React from 'react';
import './testimonials.css';

const testimonials = [
  {
    name: "Henry Cavill",
    image: "https://i.pinimg.com/736x/e9/2e/80/e92e80f8169cfd610312ec7bc49f2a91.jpg",
    text: "A customer is a person or business that buys goods or services from another business. Customers are crucial because they generate revenue. Without them, businesses would go out of business."
  },
  {
    name: "Marie Curie",
    image: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
    text: "A customer is a person or business that buys goods or services from another business. Customers are crucial because they generate revenue. Without them, businesses would go out of business."
  },
  {
    name: "Walt Disney",
    image: "https://i.pinimg.com/474x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
    text: "A customer is a person or business that buys goods or services from another business. Customers are crucial because they generate revenue. Without them, businesses would go out of business."
  },
  {
    name: "Maya Angelou",
    image: "https://i.pinimg.com/474x/9c/bd/74/9cbd744294b488939adc6b861898117a.jpg",
    text: "A customer is a person or business that buys goods or services from another business. Customers are crucial because they generate revenue. Without them, businesses would go out of business."
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">
          Our <span className="highlight">PassItOn</span> Happy Users
        </h2>
        <p className="testimonials-description">
          A customer is a person or business that buys goods or services from another business. Customers are crucial because they generate revenue. Without them, businesses would go out of business.
        </p>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card"
          >
            <div className="testimonial-image-container">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
            </div>
            <div className="testimonial-content">
              <p className="testimonial-text">{testimonial.text}</p>
              <h3 className="testimonial-name">
                {testimonial.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;