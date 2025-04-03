import React from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProjectCard from '../components/projectsCard';
import EducationCard from '../components/educationCard';
import { ArrowUpCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './techprofile.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const TechProfile = () => {
  const profileData = {
    name: "Alex Johnson",
    title: "Full Stack Developer",
    bio: "Passionate developer with 5+ years of experience building web applications. Specialized in React, Node.js, and cloud technologies. Looking to join innovative projects.",
    location: "San Francisco, CA",
    availability: "Available for Projects",
    imageUrl: "/placeholder.svg",
  };

  const skillsData = {
    frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Python", "GraphQL"],
    database: ["MongoDB", "PostgreSQL", "Redis", "Firebase"],
    devops: ["AWS", "Docker", "Git", "CI/CD"],
    other: ["UI/UX Design", "Responsive Design", "SEO", "Performance Optimization", "Unit Testing", "REST API", "Microservices", "Agile/Scrum", "Technical Documentation", "Team Leadership"],
  };

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform with payment integration, admin dashboard, and analytics.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      imageUrl: "/placeholder.svg",
      repoUrl: "#",
      demoUrl: "#",
      stars: 45,
      forks: 12,
    },
  ];

  const education = [
    {
      type: "education",
      title: "Master of Science in Computer Science",
      institution: "Stanford University",
      date: "2018 - 2020",
      description: "Specialized in Artificial Intelligence and Machine Learning",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="tech-profile-container">
      {/* <header className="profile-header">
        <div className="header-content">
          <div className="nav-container">
            <Link to="/" className="logo">TeamMate</Link>
            <nav className="main-nav">
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#education" className="nav-link">Education</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>
          </div>
        </div>
      </header> */}

      <Navbar/>

      <main className="main-content">
        <ProfileHeader {...profileData} />

        <section id="skills" className="skills-section">
          <div className="section-container">
            <h2 className="section-heading">Technical Skills</h2>
            <div className="skills-grid">
              {skillsData.frontend.map((skill, index) => (
                <div key={index} className="skill-item">
                  <CheckCircle2 className="skill-icon" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="section-container">
            <h2 className="section-heading">Featured Projects</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="education-section">
          <div className="section-container">
            <h2 className="section-heading">Education & Certifications</h2>
            <div className="education-grid">
              {education.map((item, index) => (
                <EducationCard key={index} {...item} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer/>

      <button onClick={scrollToTop} className="scroll-top-button" aria-label="Scroll to top">
        <ArrowUpCircle />
      </button>
    </div>
  );
};

export default TechProfile;
