
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
  const [skillInput, setSkillInput] = useState('');
  
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
      postedBy: 'Harnoor Kaur',
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
      postedBy: 'Geet Kaushik',
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
      postedBy: 'Shanti Priya',
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
      postedBy: 'Naina Talwar',
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
      name: 'Priya Singh',
      skills: ['Machine Learning', 'Python', 'Data Science'],
      major: 'Computer Science',
      year: 'Junior',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'online',
      bio: 'Passionate about AI and its applications in education. Looking to collaborate on innovative projects!',
      projects: 12,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Parul Garg',
      skills: ['UI/UX Design', 'React', 'Mobile Development'],
      major: 'Digital Media Design',
      year: 'Senior',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'busy',
      bio: 'UI/UX designer with a focus on creating intuitive and accessible interfaces for educational platforms.',
      projects: 8,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Shanti Priya',
      skills: ['React', 'Node.js', 'Product Management'],
      major: 'Information Systems',
      year: 'Graduate Student',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'offline',
      bio: 'Full-stack developer with 3 years of experience. Interested in EdTech and collaborative learning platforms.',
      projects: 15,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Naina Talwar',
      skills: ['Blockchain', 'JavaScript', 'Cloud Computing'],
      major: 'Computer Engineering',
      year: 'Senior',
      avatarUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      status: 'online',
      bio: 'Exploring the intersection of blockchain technology and education. Looking for innovative hackathon teams!',
      projects: 10,
      rating: 4.7
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
        student.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.major.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Handle adding a skill with the input from CODE-2
  const handleSkillAdd = () => {
    if (skillInput && !newProject.requiredSkills.includes(skillInput)) {
      setNewProject({
        ...newProject,
        requiredSkills: [...newProject.requiredSkills, skillInput]
      });
      setSkillInput('');
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
    
    if (!newProject.title || !newProject.description || newProject.requiredSkills.length === 0 || !newProject.deadline) {
      alert("Please fill all required fields");
      return;
    }
    
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

  // Navigation functions
  const navigateToStudents = () => {
    setActiveTab('students');
  };

  const navigateToProjects = () => {
    setActiveTab('projects');
  };

  // View student profile
  const viewStudentProfile = (studentId) => {
    alert(`Viewing profile of student #${studentId}`);
  };

  return (
    <div className="tm-container">
      {/* Header */}
      <header className="tm-header">
        <div className="tm-logo-container">
          <h1 className="tm-logo">TeamMate</h1>
        </div>
        
        <div className="tm-header-actions">
          <button className="tm-header-button tm-notification-btn">
            <span className="tm-icon">🔔</span>
          </button>
          
          <button className="tm-header-button tm-message-btn">
            <span className="tm-icon">✉️</span>
          </button>
          
          <div className="tm-user-profile" ref={userMenuRef}>
            <button 
              className="tm-profile-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className={`tm-profile-pic tm-status-${projects[0].status}`}>
                <img 
                  src="/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png" 
                  alt="Your profile" 
                />
              </div>
              <span className="tm-icon tm-dropdown-arrow">▼</span>
            </button>
            
            {showUserMenu && (
              <div className="tm-user-menu">
                <div className="tm-user-menu-header">
                  <p className="tm-user-name">Jordan Smith</p>
                  <p className="tm-user-email">jordan@university.edu</p>
                </div>
                <button className="tm-user-menu-item">
                  <span className="tm-icon">👤</span>
                  <span>Profile</span>
                </button>
                <button className="tm-user-menu-item">
                  <span className="tm-icon">⚙️</span>
                  <span>Settings</span>
                </button>
                <button className="tm-user-menu-item">
                  <span className="tm-icon">🚪</span>
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="tm-hero-section">
        <div className="tm-hero-content">
          <h1>Find the perfect teammates for your next project</h1>
          <p>
            Connect with talented students, collaborate on innovative ideas, and build amazing projects together.
          </p>
          
          <div className="tm-hero-buttons">
            <button 
              className="tm-primary-button"
              onClick={() => setShowProjectForm(true)}
            >
              <span className="tm-icon">➕</span>
              Post a Project
            </button>
            
            <button 
              className="tm-secondary-button"
              onClick={navigateToStudents}
            >
              <span className="tm-icon">👥</span>
              Find Students
            </button>
            
            <button 
              className="tm-secondary-button"
              onClick={navigateToProjects}
            >
              <span className="tm-icon">📋</span>
              Browse Projects
            </button>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <main className="tm-main-content">
        {/* Tabs */}
        <div className="tm-tabs">
          <button 
            className={`tm-tab ${activeTab === 'projects' ? 'tm-active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          
          <button 
            className={`tm-tab ${activeTab === 'students' ? 'tm-active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
        </div>
        
        {/* Search and filters */}
        <div className="tm-search-filters">
          <div className="tm-search-container">
            <span className="tm-search-icon">🔍</span>
            <input
              type="text"
              placeholder={`Search ${activeTab === 'projects' ? 'projects' : 'students'}...`}
              className="tm-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="tm-filter-container" ref={skillsDropdownRef}>
            <button 
              className="tm-filter-button"
              onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
            >
              <span className="tm-icon">🔍</span>
              Filter by Skills
              <span className="tm-dropdown-arrow">▼</span>
            </button>
            
            {showSkillsDropdown && (
              <div className="tm-skills-dropdown">
                {SKILLS.map((skill) => (
                  <button
                    key={skill}
                    className={`tm-skill-option ${selectedSkills.includes(skill) ? 'tm-selected' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    <span>{skill}</span>
                    {selectedSkills.includes(skill) && <span className="tm-check-icon">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {selectedSkills.length > 0 && (
            <button 
              className="tm-clear-filters"
              onClick={() => setSelectedSkills([])}
            >
              Clear filters ✕
            </button>
          )}
        </div>
        
        {/* Selected skills display */}
        {selectedSkills.length > 0 && (
          <div className="tm-selected-skills">
            {selectedSkills.map(skill => (
              <span key={skill} className="tm-skill-tag">
                {skill}
                <button onClick={() => toggleSkill(skill)} className="tm-remove-skill">
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
              <div className="tm-empty-state">
                <p>No projects found matching your criteria</p>
                <button 
                  className="tm-reset-button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSkills([]);
                  }}
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              <div className="tm-projects-grid">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="tm-project-card">
                    <div className="tm-project-header">
                      <div className="tm-project-poster">
                        <div className={`tm-profile-pic tm-status-${project.status}`}>
                          <img 
                            src={project.avatarUrl} 
                            alt={project.postedBy} 
                          />
                        </div>
                        <div>
                          <p className="tm-poster-name">{project.postedBy}</p>
                          <p className="tm-post-date">Posted on {new Date(project.postedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button 
                        className={`tm-bookmark-button ${bookmarkedProjects.includes(project.id) ? 'tm-bookmarked' : ''}`} 
                        onClick={() => toggleBookmark(project.id)}
                        aria-label={bookmarkedProjects.includes(project.id) ? "Remove bookmark" : "Bookmark project"}
                      >
                        {bookmarkedProjects.includes(project.id) ? '★' : '☆'}
                      </button>
                    </div>
                    
                    <h3 className="tm-project-title">{project.title}</h3>
                    <p className="tm-project-description">{project.description}</p>
                    
                    <div className="tm-project-skills">
                      <p className="tm-section-label">Required Skills</p>
                      <div className="tm-skills-list">
                        {project.requiredSkills.map((skill) => (
                          <span key={skill} className="tm-skill-tag tm-small">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="tm-project-meta">
                      <div className="tm-meta-item">
                        <span className="tm-icon">👥</span>
                        <span>{project.currentMembers}/{project.teamSize} members</span>
                      </div>
                      <div className="tm-meta-item">
                        <span className="tm-icon">⏱️</span>
                        <span>{getTimeRemaining(project.deadline)}</span>
                      </div>
                    </div>
                    
                    <div className="tm-project-actions">
                      <button 
                        className="tm-primary-button"
                        onClick={() => expressInterest(project.id)}
                      >
                        Express Interest
                      </button>
                      <button 
                        className="tm-secondary-button"
                        onClick={() => setOpenProjectId(openProjectId === project.id ? null : project.id)}
                      >
                        Details
                      </button>
                    </div>
                    
                    {openProjectId === project.id && (
                      <div className="tm-project-details">
                        <div className="tm-detail-item">
                          <p className="tm-detail-label">Deadline</p>
                          <p className="tm-detail-value">{new Date(project.deadline).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="tm-detail-item">
                          <p className="tm-detail-label">Team Size</p>
                          <p className="tm-detail-value">{project.teamSize} members needed</p>
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
              <div className="tm-empty-state">
                <p>No students found matching your criteria</p>
                <button 
                  className="tm-reset-button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSkills([]);
                  }}
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              <div className="tm-students-grid">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="tm-student-card">
                    <div className="tm-student-header">
                      <div className={`tm-profile-pic tm-large tm-status-${student.status}`}>
                        <img 
                          src={student.avatarUrl} 
                          alt={student.name} 
                        />
                      </div>
                      <div>
                        <h3 className="tm-student-name">{student.name}</h3>
                        <p className="tm-student-info">{student.major}, {student.year}</p>
                      </div>
                    </div>
                    
                    <p className="tm-student-bio">{student.bio}</p>
                    
                    <div className="tm-student-skills">
                      <p className="tm-section-label">Skills</p>
                      <div className="tm-skills-list">
                        {student.skills.map((skill) => (
                          <span key={skill} className="tm-skill-tag tm-small">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="tm-student-stats">
                      <div className="tm-stat">
                        <span className="tm-stat-number">{student.projects}</span>
                        <span className="tm-stat-label">Projects</span>
                      </div>
                      <div className="tm-stat">
                        <span className="tm-stat-number">{student.rating}</span>
                        <span className="tm-stat-label">Rating</span>
                      </div>
                    </div>
                    
                    <div className="tm-student-actions">
                      <button 
                        className="tm-secondary-button"
                        onClick={() => viewStudentProfile(student.id)}
                      >
                        View Profile
                      </button>
                      <button 
                        className="tm-primary-button"
                        onClick={() => connectWithStudent(student.name)}
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Project form modal */}
      {showProjectForm && (
        <div className="tm-modal-overlay">
          <div className="tm-modal">
            <div className="tm-modal-header">
              <h2>Post a New Project</h2>
              <button className="tm-close-button" onClick={() => setShowProjectForm(false)}>
                ✕
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="tm-form">
              <div className="tm-form-group">
                <label htmlFor="title" className="tm-label">Project Title *</label>
                <input
                  type="text"
                  id="title"
                  className="tm-input"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="tm-form-group">
                <label htmlFor="description" className="tm-label">Project Description *</label>
                <textarea
                  id="description"
                  rows={4}
                  className="tm-textarea"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="tm-form-group">
                <label className="tm-label">Required Skills *</label>
                <div className="tm-skill-input-container">
                  <input
                    type="text"
                    list="skills-list"
                    placeholder="Add a skill"
                    className="tm-input"
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
                    className="tm-add-skill-button"
                    onClick={addSkillToProject}
                  >
                    Add
                  </button>
                </div>
                
                {newProject.requiredSkills.length > 0 && (
                  <div className="tm-selected-skills">
                    {newProject.requiredSkills.map((skill) => (
                      <span key={skill} className="tm-skill-tag">
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkillFromProject(skill)} 
                          className="tm-remove-skill"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="tm-form-row">
                <div className="tm-form-group">
                  <label htmlFor="deadline" className="tm-label">Deadline *</label>
                  <input
                    type="date"
                    id="deadline"
                    className="tm-input"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                    required
                  />
                </div>
                
                <div className="tm-form-group">
                  <label htmlFor="teamSize" className="tm-label">Team Size</label>
                  <select
                    id="teamSize"
                    className="tm-select"
                    value={newProject.teamSize}
                    onChange={(e) => setNewProject({...newProject, teamSize: parseInt(e.target.value)})}
                  >
                    {[2, 3, 4, 5, 6, 7, 8].map(size => (
                      <option key={size} value={size}>{size} members</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="tm-form-actions">
                <button
                  type="button"
                  className="tm-secondary-button"
                  onClick={() => setShowProjectForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="tm-primary-button"
                >
                  Post Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="tm-footer">
        <p>© 2023 TeamMate - Connect, Collaborate, Create</p>
      </footer>
    </div>
  );
};

export default Teammates;
