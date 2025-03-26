import React from 'react';
import { Calendar, Award } from 'lucide-react';
import './educationCard.css';

const EducationCard = ({
  type,
  title,
  institution,
  date,
  description,
  logo,
  index,
}) => {
  return (
    <div 
      className="education-card"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="education-content">
        <div className="education-icon-container">
          {type === 'education' ? (
            <div className="education-icon education-icon-calendar">
              <Calendar className="icon" />
            </div>
          ) : (
            <div className="education-icon education-icon-award">
              <Award className="icon" />
            </div>
          )}
        </div>
        
        <div className="education-details">
          <h3 className="education-title">{title}</h3>
          <div className="institution-container">
            {logo ? (
              <img src={logo} alt={institution} className="institution-logo" />
            ) : null}
            <p className="institution-name">{institution}</p>
          </div>
          
          <p className="education-date">{date}</p>
          
          {description && (
            <p className="education-description">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationCard;