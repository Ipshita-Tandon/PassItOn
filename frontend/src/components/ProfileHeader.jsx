import React from 'react';
import { MessageSquare, Calendar, Github, Linkedin, Twitter } from 'lucide-react';
import './ProfileHeader.css';

const ProfileHeader = ({ name, title, bio, location, availability, imageUrl }) => {
  return (
    <div className="profile-header-container">
      <div className="profile-header-content">
        <div className="profile-card">
          <div className="profile-image-container">
            <div className="profile-image-wrapper">
              <img 
                src={imageUrl || "/placeholder.svg"} 
                alt={name} 
                className="profile-image"
              />
            </div>
          </div>

          <div className="profile-info">
            <h1 className="profile-name">{name}</h1>
            <p className="profile-title">{title}</p>
            <p className="profile-location">{location}</p>
            
            <p className="profile-bio">{bio}</p>
            
            <div className="social-icons">
              <a href="#" aria-label="GitHub Profile" className="social-icon-link">
                <Github size={20} />
              </a>
              <a href="#" aria-label="LinkedIn Profile" className="social-icon-link">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="Twitter Profile" className="social-icon-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
