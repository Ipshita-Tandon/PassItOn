import React from 'react';
import './projectsCard.css';

const ProjectCard = ({
  title,
  description,
  technologies,
  imageUrl,
  repoUrl,
  demoUrl,
  stars,
  forks,
  index,
}) => {
  return (
    <div 
      className="project-card"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="project-content">
        {imageUrl && (
          <div className="project-image-container">
            <img 
              src={imageUrl} 
              alt={title} 
              className="project-image"
            />
          </div>
        )}
        
        <div className="project-details">
          <div className="project-header">
            <h3 className="project-title">{title}</h3>
          </div>
          
          <p className="project-description">{description}</p>
        </div>
        
        <div className="project-links">
          {repoUrl && (
            <a 
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Repository
            </a>
          )}
          {demoUrl && (
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
