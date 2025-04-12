import React, { useState, useEffect } from 'react';
import './teammates.css';

const Teammates = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('projects');
  
  // State for projects and students data
  const [projects, setProjects] = useState([
    {
      id: 1,
      author: "Alex Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "20/10/2023",
      title: "AI-Powered Study Assistant",
      description: "Building an AI assistant to help students optimize their study habits and improve learning outcomes.",
      skills: ["Machine Learning", "Python", "UI/UX Design"],
      members: "2/4",
      deadline: "passed",
      starred: false
    },
    {
      id: 2,
      author: "Jamie Smith",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "18/10/2023",
      title: "Campus Navigation App",
      description: "Creating a mobile app that helps new students navigate the campus efficiently and locate resources.",
      skills: ["Mobile Development", "UI/UX Design", "React"],
      members: "1/3",
      deadline: "passed",
      starred: true
    },
    {
      id: 3,
      author: "Taylor Wong",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      date: "15/10/2023",
      title: "Peer-to-Peer Learning Platform",
      description: "Developing a platform where students can teach and learn from each other through short courses.",
      skills: ["React", "Node.js", "Product Management"],
      members: "3/5",
      deadline: "passed",
      starred: false
    },
    {
      id: 4,
      author: "Morgan Lee",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      date: "10/10/2023",
      title: "Blockchain for Student Records",
      description: "Implementing a blockchain solution to securely store and verify academic records and credentials.",
      skills: ["Blockchain", "Solidity", "Backend Development"],
      members: "2/4",
      deadline: "active",
      starred: true
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    skills: [],
    maxMembers: 4
  });
  const [skillInput, setSkillInput] = useState('');
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Toggle star (favorite) status
  const toggleStar = (id) => {
    setProjects(projects.map(project => 
      project.id === id ? {...project, starred: !project.starred} : project
    ));
  };
  
  // Express interest in a project
  const expressInterest = (id) => {
    alert(`You've expressed interest in project #${id}. The project creator will be notified.`);
  };
  
  // Handle form input changes for new project
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({...newProject, [name]: value});
  };
  
  // Add a skill to the new project
  const addSkill = () => {
    if (skillInput.trim() && !newProject.skills.includes(skillInput.trim())) {
      setNewProject({...newProject, skills: [...newProject.skills, skillInput.trim()]});
      setSkillInput('');
    }
  };
  
  // Remove a skill from the new project
  const removeSkill = (skillToRemove) => {
    setNewProject({
      ...newProject, 
      skills: newProject.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  // Submit new project
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    
    const projectToAdd = {
      id: newId,
      author: "You", // In a real app, this would be the logged-in user
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg", // Placeholder
      date: formattedDate,
      title: newProject.title,
      description: newProject.description,
      skills: newProject.skills,
      members: `1/${newProject.maxMembers}`,
      deadline: "active",
      starred: false
    };
    
    setProjects([projectToAdd, ...projects]);
    setNewProject({
      title: '',
      description: '',
      skills: [],
      maxMembers: 4
    });
    setShowPostModal(false);
  };
  
  return (
    <div className="teammates-container">
      <header className="teammates-header">
        <div className="logo">TeamMate</div>
        <div className="header-icons">
          <span className="icon notification">🔔</span>
          <span className="icon message">✉️</span>
          <div className="profile">
            <span>You</span>
            <span className="dropdown-icon">▼</span>
          </div>
        </div>
      </header>
      
      <section className="hero-section">
        <h1>Find the perfect teammates for your next project</h1>
        <p>Connect with talented students, collaborate on innovative ideas, and build amazing projects together.</p>
        
        <div className="action-buttons">
          <button className="post-button" onClick={() => setShowPostModal(true)}>
            <span className="plus-icon">+</span> Post a Project
          </button>
          <button className="find-button">
            <span className="people-icon">👥</span> Find Students
          </button>
          <button className="browse-button">
            <span className="clipboard-icon">📋</span> Browse Projects
          </button>
        </div>
      </section>
      
      <nav className="tabs">
        <button 
          className={activeTab === 'projects' ? 'active' : ''} 
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button 
          className={activeTab === 'students' ? 'active' : ''} 
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
      </nav>
      
      <div className="search-filter">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="filter-container">
          <span className="filter-icon">🔍</span>
          <span>Filter by Skills</span>
          <span className="dropdown-icon">▼</span>
        </div>
      </div>
      
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div className="project-card" key={project.id}>
            <div className="project-header">
              <div className="author-info">
                <img src={project.avatar} alt={project.author} className="avatar" />
                <div>
                  <div className="author-name">{project.author}</div>
                  <div className="post-date">Posted on {project.date}</div>
                </div>
              </div>
              <button 
                className={`star-button ${project.starred ? 'starred' : ''}`}
                onClick={() => toggleStar(project.id)}
              >
                {project.starred ? '⭐' : '☆'}
              </button>
            </div>
            
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            
            <div className="skills-section">
              <h3 className="skills-title">REQUIRED SKILLS</h3>
              <div className="skills-tags">
                {project.skills.map((skill, index) => (
                  <span className="skill-tag" key={index}>{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="project-footer">
              <div className="members-info">
                <span className="members-icon">👥</span>
                <span>{project.members} members</span>
              </div>
              <div className="deadline-info">
                <span className="deadline-icon">⏱️</span>
                <span>Deadline {project.deadline}</span>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className="express-interest-button"
                onClick={() => expressInterest(project.id)}
              >
                Express Interest
              </button>
              <button className="details-button">Details</button>
            </div>
          </div>
        ))}
      </div>
      
      {showPostModal && (
        <div className="modal-overlay">
          <div className="post-modal">
            <div className="modal-header">
              <h2>Post a New Project</h2>
              <button className="close-button" onClick={() => setShowPostModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={newProject.title} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={newProject.description} 
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Required Skills</label>
                <div className="skills-input">
                  <input 
                    type="text" 
                    value={skillInput} 
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill"
                  />
                  <button type="button" onClick={addSkill}>Add</button>
                </div>
                <div className="skills-tags">
                  {newProject.skills.map((skill, index) => (
                    <span className="skill-tag" key={index}>
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>Maximum Team Size</label>
                <input 
                  type="number" 
                  name="maxMembers" 
                  value={newProject.maxMembers} 
                  onChange={handleInputChange}
                  min="2"
                  max="10"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowPostModal(false)}>Cancel</button>
                <button type="submit">Post Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teammates;