import React, { useEffect, useRef } from 'react';
import './aboutUs.css';
import Navbar from '../components/navbar';

const AboutUs = () => {
  const creators = [
    {
      name: "Amishi Kumar",
      imageURL: 'images/amishi.jpeg',
      description: "Amishi is an enthusiastic tech developer, always eager to learn and a great team player. Skilled in Machine Learning, she enjoys tackling challenges with innovative solutions. Currently pursuing a B.Tech in CSE at IGDTUW, she is in her third year, constantly expanding her expertise in AI and advanced technologies."
    },
    {
      name: "Ipshita Tandon",
      imageURL: 'images/Ipshita.jpg',
      description: "Ipshita is an enthusiastic tech developer, always eager to learn and a great team player. Skilled in Machine Learning, she enjoys tackling challenges with innovative solutions. Currently pursuing a B.Tech in CSE at IGDTUW, she is in her third year, constantly expanding her expertise in AI and advanced technologies."
    },
    {
      name: "Bhuvi Singh",
      imageURL: "https://i.pinimg.com/474x/9c/bd/74/9cbd744294b488939adc6b861898117a.jpg",
      description: "Bhuvi is an enthusiastic tech developer, always eager to learn and a great team player. Skilled in Machine Learning, she excels in solving complex problems with innovative solutions. Currently pursuing a B.Tech in CSE at IGDTUW, she is in her third year, actively expanding her knowledge in AI and emerging technologies."
    },
    {
      name: "Dwiti Narang",
      imageURL: 'images/dwiti.jpeg',
      description: "Dwiti is an enthusiastic tech developer, always eager to learn and a great team player. Skilled in Machine Learning, she excels in solving complex problems with innovative solutions. Currently pursuing a B.Tech in CSE at IGDTUW, she is in her third year, actively expanding her knowledge in AI and emerging technologies."
    }
  ];

  // Observer for scrolling animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="about-us-container">
      <div className="container">
      <Navbar/>
        {/* About Creators Section */}
        <div className="creators-section animate-on-scroll">
          <div className="section-header">
            <div className="tag">Our Team</div>
            <h1 className="title">
              Meet <span className="highlight">The Creators</span>
            </h1>
            <div className="divider"></div>
          </div>
          
          <div className="creators-grid">
            {creators.map((creator, index) => (
              <div 
                key={index} 
                className={`creator-card fade-in-item item-${index + 1}`}
              >
                <div className="avatar-container">
                  <img 
                    src={creator.imageURL}
                    alt={creator.name}
                    className="avatar-image"
                    loading="lazy"
                  />
                </div>
                <h3 className="creator-name">{creator.name}</h3>
                <p className="creator-description">
                  {creator.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
