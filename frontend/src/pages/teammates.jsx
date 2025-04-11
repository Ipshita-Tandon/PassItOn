import React, { useState, useEffect, useRef } from 'react';
import './teammates.css';

const Teammates = () => {
  // State management
  const [activeTab, setActiveTab] = useState('projects');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [bookmarkedProjects, setBookmarkedProjects] = useState([2, 4]);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    requiredSkills: [],
    deadline: '',
    teamSize: 3
  });
  const [newSkill, setNewSkill] = useState('');
  
  // Refs for outside click handling
  const skillsDropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  
  // Mock data - Skills
  const SKILLS = [
    'React', 'JavaScript', 'Python', 'Java', 'C++', 'UI/UX Design', 
    'Data Science', 'Machine Learning', 'Mobile Development', 'Node.js',
    'Product Management', 'Blockchain', 'Cloud Computing', 'DevOps'
  ];

  // Mock data - Projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'AI-Powered Study Assistant',
      description: 'Building an AI assistant to help students optimize their study habits and improve learning outcomes.',
      requiredSkills: ['Machine Learning', 'Python', 'UI/UX Design'],
      deadline: '2023-12-15',
      teamSize: 4,
      currentMembers: 2,
      postedBy: 'Alex Chen',
      postedDate: '2023-10-20',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'online',
      bookmarked: false
    },
    {
      id: 2,
      title: 'Campus Navigation App',
      description: 'Creating a mobile app that helps new students navigate the campus efficiently and locate resources.',
      requiredSkills: ['Mobile Development', 'UI/UX Design', 'React'],
      deadline: '2023-12-01',
      teamSize: 3,
      currentMembers: 1,
      postedBy: 'Jamie Smith',
      postedDate: '2023-10-18',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'busy',
      bookmarked: true
    },
    {
      id: 3,
      title: 'Peer-to-Peer Learning Platform',
      description: 'Developing a platform where students can teach and learn from each other through short courses.',
      requiredSkills: ['React', 'Node.js', 'Product Management'],
      deadline: '2024-01-10',
      teamSize: 5,
      currentMembers: 3,
      postedBy: 'Taylor Wong',
      postedDate: '2023-10-15',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'offline',
      bookmarked: false
    },
    {
      id: 4,
      title: 'Blockchain for Student Records',
      description: 'Research project to explore using blockchain for secure, tamper-proof academic records.',
      requiredSkills: ['Blockchain', 'JavaScript', 'Data Science'],
      deadline: '2024-02-20',
      teamSize: 3,
      currentMembers: 1,
      postedBy: 'Morgan Lee',
      postedDate: '2023-10-10',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'online',
      bookmarked: true
    }
  ]);

  // Mock data - Students
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Alex Chen',
      skills: ['Machine Learning', 'Python', 'Data Science'],
      major: 'Computer Science',
      year: 'Junior',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'online',
      bio: 'Passionate about AI and its applications in education. Looking to collaborate on innovative projects!'
    },
    {
      id: 2,
      name: 'Jamie Smith',
      skills: ['UI/UX Design', 'React', 'Mobile Development'],
      major: 'Digital Media Design',
      year: 'Senior',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'busy',
      bio: 'UI/UX designer with a focus on creating intuitive and accessible interfaces for educational platforms.'
    },
    {
      id: 3,
      name: 'Taylor Wong',
      skills: ['React', 'Node.js', 'Product Management'],
      major: 'Information Systems',
      year: 'Graduate Student',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'offline',
      bio: 'Full-stack developer with 3 years of experience. Interested in EdTech and collaborative learning platforms.'
    },
    {
      id: 4,
      name: 'Morgan Lee',
      skills: ['Blockchain', 'JavaScript', 'Cloud Computing'],
      major: 'Computer Engineering',
      year: 'Senior',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'online',
      bio: 'Exploring the intersection of blockchain technology and education. Looking for innovative hackathon teams!'
    }
  ]);

  // Filtered data for display
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [filteredStudents, setFilteredStudents] = useState(students);

  // Handle outside clicks for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (skillsDropdownRef.current && !skillsDropdownRef.current.contains(event.target)) {
        setShowSkillsDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter projects when search or skills selection changes
  useEffect(() => {
    let results = projects;
    
    if (searchTerm) {
      results = results.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSkills.length > 0) {
      results = results.filter(project => 
        selectedSkills.some(skill => project.requiredSkills.includes(skill))
      );
    }
    
    setFilteredProjects(results);
  }, [searchTerm, selectedSkills, projects]);

  // Filter students when search or skills selection changes
  useEffect(() => {
    let results = students;
    
    if (searchTerm) {
      results = results.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedSkills.length > 0) {
      results = results.filter(student => 
        selectedSkills.some(skill => student.skills.includes(skill))
      );
    }
    
    setFilteredStudents(results);
  }, [searchTerm, selectedSkills, students]);

  // Toggle selection of skills for filtering
  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(item => item !== skill)
        : [...prev, skill]
    );
  };

  // Toggle project bookmark status
  const toggleBookmark = (projectId) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? {...project, bookmarked: !project.bookmarked}
          : project
      )
    );
    
    setBookmarkedProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
    
    alert(bookmarkedProjects.includes(projectId) 
      ? "Project removed from bookmarks" 
      : "Project added to bookmarks");
  };

  // Add a new skill to project form
  const addSkillToProject = () => {
    if (newSkill && !newProject.requiredSkills.includes(newSkill)) {
      setNewProject({
        ...newProject,
        requiredSkills: [...newProject.requiredSkills, newSkill]
      });
      setNewSkill('');
    }
  };

  // Remove a skill from project form
  const removeSkillFromProject = (skill) => {
    setNewProject({
      ...newProject,
      requiredSkills: newProject.requiredSkills.filter(s => s !== skill)
    });
  };

  // Submit new project
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newProject.title || !newProject.description || newProject.requiredSkills.length === 0 || !newProject.deadline) {
      alert("Please fill all required fields");
      return;
    }
    
    // Create new project and add to list
    const newProjectObj = {
      id: projects.length + 1,
      ...newProject,
      postedBy: 'You',
      postedDate: new Date().toISOString().split('T')[0],
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'online',
      currentMembers: 1,
      bookmarked: false
    };
    
    setProjects(prev => [newProjectObj, ...prev]);
    
    // Reset form and hide it
    setNewProject({
      title: '',
      description: '',
      requiredSkills: [],
      deadline: '',
      teamSize: 3
    });
    
    setShowProjectForm(false);
    alert("Project created successfully!");
  };

  // Express interest in a project
  const expressInterest = (projectId) => {
    alert("Your interest has been sent to the project owner!");
  };

  // Calculate time remaining until deadline
  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "Deadline passed";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  // Connect with a student
  const connectWithStudent = (studentName) => {
    alert(`Connection request sent to ${studentName}`);
  };

  return (
    <div className="teammates-container">
      {/* Header */}
      <header className="teammates-header">
        <div className="logo-container">
          <h1 className="logo">TeamMate</h1>
        </div>
        
        <div className="header-actions">
          <button className="header-button notification-btn">
            <span className="icon">🔔</span>
          </button>
          
          <button className="header-button message-btn">
            <span className="icon">✉️</span>
          </button>
          
          <div className="user-profile" ref={userMenuRef}>
            <button 
              className="profile-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="profile-pic status-online">
                <img 
                  src="/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png" 
                  alt="Your profile" 
                />
              </div>
              <span className="icon dropdown-arrow">▼</span>
            </button>
            
            {showUserMenu && (
              <div className="user-menu">
                <div className="user-menu-header">
                  <p className="user-name">Jordan Smith</p>
                  <p className="user-email">jordan@university.edu</p>
                </div>
                <button className="user-menu-item">
                  <span className="icon">👤</span>
                  <span>Profile</span>
                </button>
                <button className="user-menu-item">
                  <span className="icon">🚪</span>
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find the perfect teammates for your next project</h1>
          <p>
            Connect with talented students, collaborate on innovative ideas, and build amazing projects together.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="primary-button"
              onClick={() => setShowProjectForm(true)}
            >
              <span className="icon">➕</span>
              Post a Project
            </button>
            
            <button 
              className="secondary-button"
              onClick={() => setActiveTab('students')}
            >
              <span className="icon">👥</span>
              Find Students
            </button>
            
            <button 
              className="secondary-button"
              onClick={() => setActiveTab('projects')}
            >
              <span className="icon">📋</span>
              Browse Projects
            </button>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <main className="main-content">
        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          
          <button 
            className={`tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
        </div>
        
        {/* Search and filters */}
        <div className="search-filters">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={`Search ${activeTab === 'projects' ? 'projects' : 'students'}...`}
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-container" ref={skillsDropdownRef}>
            <button 
              className="filter-button"
              onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
            >
              <span className="icon">🔍</span>
              Filter by Skills
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {showSkillsDropdown && (
              <div className="skills-dropdown">
                {SKILLS.map((skill) => (
                  <button
                    key={skill}
                    className={`skill-option ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    <span>{skill}</span>
                    {selectedSkills.includes(skill) && <span className="check-icon">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {selectedSkills.length > 0 && (
            <button 
              className="clear-filters"
              onClick={() => setSelectedSkills([])}
            >
              Clear filters ✕
            </button>
          )}
        </div>
        
        {/* Selected skills display */}
        {selectedSkills.length > 0 && (
          <div className="selected-skills">
            {selectedSkills.map(skill => (
              <span key={skill} className="skill-tag">
                {skill}
                <button onClick={() => toggleSkill(skill)} className="remove-skill">
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
        
        {/* Projects list */}
        {activeTab === 'projects' && (
          <>
            {filteredProjects.length === 0 ? (
              <div className="empty-state">
                <p>No projects found matching your criteria</p>
                <button 
                  className="reset-button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSkills([]);
                  }}
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              <div className="projects-grid">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <div className="project-poster">
                        <div className={`profile-pic status-${project.status}`}>
                          <img 
                            src={project.avatarUrl} 
                            alt={project.postedBy} 
                          />
                        </div>
                        <div>
                          <p className="poster-name">{project.postedBy}</p>
                          <p className="post-date">Posted on {new Date(project.postedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button 
                        className={`bookmark-button ${bookmarkedProjects.includes(project.id) ? 'bookmarked' : ''}`} 
                        onClick={() => toggleBookmark(project.id)}
                        aria-label={bookmarkedProjects.includes(project.id) ? "Remove bookmark" : "Bookmark project"}
                      >
                        {bookmarkedProjects.includes(project.id) ? '★' : '☆'}
                      </button>
                    </div>
                    
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-skills">
                      <p className="section-label">Required Skills</p>
                      <div className="skills-list">
                        {project.requiredSkills.map((skill) => (
                          <span key={skill} className="skill-tag small">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="project-meta">
                      <div className="meta-item">
                        <span className="icon">👥</span>
                        <span>{project.currentMembers}/{project.teamSize} members</span>
                      </div>
                      <div className="meta-item">
                        <span className="icon">⏱️</span>
                        <span>{getTimeRemaining(project.deadline)}</span>
                      </div>
                    </div>
                    
                    <div className="project-actions">
                      <button 
                        className="primary-button"
                        onClick={() => expressInterest(project.id)}
                      >
                        Express Interest
                      </button>
                      <button 
                        className="secondary-button"
                        onClick={() => setOpenProjectId(openProjectId === project.id ? null : project.id)}
                      >
                        Details
                      </button>
                    </div>
                    
                    {openProjectId === project.id && (
                      <div className="project-details">
                        <div className="detail-item">
                          <p className="detail-label">Deadline</p>
                          <p className="detail-value">{new Date(project.deadline).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="detail-item">
                          <p className="detail-label">Team Size</p>
                          <p className="detail-value">{project.teamSize} members needed</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Students list */}
        {activeTab === 'students' && (
          <>
            {filteredStudents.length === 0 ? (
              <div className="empty-state">
                <p>No students found matching your criteria</p>
                <button 
                  className="reset-button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSkills([]);
                  }}
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              <div className="students-grid">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="student-card">
                    <div className="student-header">
                      <div className={`profile-pic large status-${student.status}`}>
                        <img 
                          src={student.avatarUrl} 
                          alt={student.name} 
                        />
                      </div>
                      <div>
                        <h3 className="student-name">{student.name}</h3>
                        <p className="student-info">{student.major}, {student.year}</p>
                      </div>
                    </div>
                    
                    <p className="student-bio">{student.bio}</p>
                    
                    <div className="student-skills">
                      <p className="section-label">Skills</p>
                      <div className="skills-list">
                        {student.skills.map((skill) => (
                          <span key={skill} className="skill-tag small">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      className="primary-button full-width"
                      onClick={() => connectWithStudent(student.name)}
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Project form modal */}
      {showProjectForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Post a New Project</h2>
              <button className="close-button" onClick={() => setShowProjectForm(false)}>
                ✕
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit}>
              <div className="form-group">
                <label htmlFor="title">Project Title *</label>
                <input
                  type="text"
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Project Description *</label>
                <textarea
                  id="description"
                  rows={4}
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Required Skills *</label>
                <div className="skill-input-container">
                  <input
                    type="text"
                    list="skills-list"
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <datalist id="skills-list">
                    {SKILLS.filter(skill => !newProject.requiredSkills.includes(skill)).map((skill) => (
                      <option key={skill} value={skill} />
                    ))}
                  </datalist>
                  <button
                    type="button"
                    className="add-skill-button"
                    onClick={addSkillToProject}
                  >
                    Add
                  </button>
                </div>
                
                {newProject.requiredSkills.length > 0 && (
                  <div className="selected-skills">
                    {newProject.requiredSkills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkillFromProject(skill)} 
                          className="remove-skill"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="deadline">Deadline *</label>
                  <input
                    type="date"
                    id="deadline"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="teamSize">Team Size</label>
                  <select
                    id="teamSize"
                    value={newProject.teamSize}
                    onChange={(e) => setNewProject({...newProject, teamSize: parseInt(e.target.value)})}
                  >
                    {[2, 3, 4, 5, 6, 7, 8].map(size => (
                      <option key={size} value={size}>{size} members</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowProjectForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-button"
                >
                  Post Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="footer">
        <p>© 2023 TeamMate - Connect, Collaborate, Create</p>
      </footer>
    </div>
  );
};

export default Teammates;