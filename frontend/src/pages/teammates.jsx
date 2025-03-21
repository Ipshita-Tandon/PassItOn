import React, { useState, useEffect, useRef } from 'react';
import './teammates.css';
import {
  Search,
  PlusSquare,
  Users,
  Briefcase,
  Bell,
  MessageSquare,
  User,
  LogOut,
  ChevronDown,
  Filter,
  X,
  Check,
  Clock,
  Bookmark
} from 'lucide-react';

// Mock data
const SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C++', 
  'UI/UX Design', 'Product Management', 'Data Science', 'Machine Learning',
  'Mobile Development', 'Blockchain', 'Cloud Computing', 'DevOps'
];

const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'AI-Powered Study Assistant',
    description: 'Building an AI assistant to help students optimize their study habits and improve learning outcomes.',
    requiredSkills: ['Machine Learning', 'Python', 'UI/UX Design', 'Product Management'],
    deadline: '2023-12-15',
    teamSize: 4,
    currentMembers: 2,
    postedBy: 'Alex Chen',
    postedDate: '2023-10-20',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
    bookmarked: false
  },
  {
    id: 2,
    title: 'Campus Navigation App',
    description: 'Creating a mobile app that helps new students navigate the campus efficiently and locate resources.',
    requiredSkills: ['Mobile Development', 'UI/UX Design', 'React', 'JavaScript'],
    deadline: '2023-12-01',
    teamSize: 3,
    currentMembers: 1,
    postedBy: 'Jamie Smith',
    postedDate: '2023-10-18',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    status: 'busy',
    bookmarked: true
  },
  {
    id: 3,
    title: 'Peer-to-Peer Learning Platform',
    description: 'Developing a platform where students can teach and learn from each other through short courses.',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'Product Management'],
    deadline: '2024-01-10',
    teamSize: 5,
    currentMembers: 3,
    postedBy: 'Taylor Wong',
    postedDate: '2023-10-15',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    status: 'offline',
    bookmarked: false
  },
  {
    id: 4,
    title: 'Blockchain for Student Records',
    description: 'Research project to explore using blockchain for secure, tamper-proof academic records.',
    requiredSkills: ['Blockchain', 'JavaScript', 'Node.js', 'Data Science'],
    deadline: '2024-02-20',
    teamSize: 3,
    currentMembers: 1,
    postedBy: 'Morgan Lee',
    postedDate: '2023-10-10',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    status: 'online',
    bookmarked: true
  },
  {
    id: 5,
    title: 'Smart Campus IoT Solution',
    description: 'Creating an IoT ecosystem to monitor and optimize resource usage across campus buildings.',
    requiredSkills: ['IoT', 'Cloud Computing', 'Python', 'Data Science'],
    deadline: '2024-01-25',
    teamSize: 4,
    currentMembers: 2,
    postedBy: 'Riley Johnson',
    postedDate: '2023-10-05',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    status: 'busy',
    bookmarked: false
  }
];

const MOCK_STUDENTS = [
  {
    id: 1,
    name: 'Alex Chen',
    skills: ['Machine Learning', 'Python', 'Data Science'],
    major: 'Computer Science',
    year: 'Junior',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
    bio: 'Passionate about AI and its applications in education. Looking to collaborate on innovative projects!'
  },
  {
    id: 2,
    name: 'Jamie Smith',
    skills: ['UI/UX Design', 'React', 'Mobile Development'],
    major: 'Digital Media Design',
    year: 'Senior',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    status: 'busy',
    bio: 'UI/UX designer with a focus on creating intuitive and accessible interfaces for educational platforms.'
  },
  {
    id: 3,
    name: 'Taylor Wong',
    skills: ['React', 'Node.js', 'TypeScript', 'Product Management'],
    major: 'Information Systems',
    year: 'Graduate Student',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    status: 'offline',
    bio: 'Full-stack developer with 3 years of experience. Interested in EdTech and collaborative learning platforms.'
  },
  {
    id: 4,
    name: 'Morgan Lee',
    skills: ['Blockchain', 'JavaScript', 'Cloud Computing'],
    major: 'Computer Engineering',
    year: 'Senior',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    status: 'online',
    bio: 'Exploring the intersection of blockchain technology and education. Looking for innovative hackathon teams!'
  },
  {
    id: 5,
    name: 'Riley Johnson',
    skills: ['IoT', 'Cloud Computing', 'Python'],
    major: 'Electrical Engineering',
    year: 'Junior',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    status: 'busy',
    bio: 'IoT enthusiast working on smart campus solutions. Looking for team members with complementary skills.'
  }
];

const Teammates = () => {
  // State variables
  const [activeTab, setActiveTab] = useState('projects');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(MOCK_PROJECTS);
  const [filteredStudents, setFilteredStudents] = useState(MOCK_STUDENTS);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [bookmarkedProjects, setBookmarkedProjects] = useState(
    MOCK_PROJECTS.filter(p => p.bookmarked).map(p => p.id)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    requiredSkills: [],
    deadline: '',
    teamSize: 3
  });
  const [newSkill, setNewSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  
  // Refs
  const menuRef = useRef(null);
  const skillsDropdownRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (skillsDropdownRef.current && !skillsDropdownRef.current.contains(event.target)) {
        setShowSkillsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter projects based on search term and active filters
  useEffect(() => {
    let results = MOCK_PROJECTS;
    
    if (searchTerm) {
      results = results.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilters.length > 0) {
      results = results.filter(project => 
        activeFilters.some(filter => project.requiredSkills.includes(filter))
      );
    }
    
    setFilteredProjects(results);
  }, [searchTerm, activeFilters]);

  // Filter students based on search term and selected skills
  useEffect(() => {
    let results = MOCK_STUDENTS;
    
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
  }, [searchTerm, selectedSkills]);

  // Toggle filter function
  const toggleFilter = (skill) => {
    setActiveFilters(prev => 
      prev.includes(skill) 
        ? prev.filter(item => item !== skill)
        : [...prev, skill]
    );
  };

  // Toggle bookmark function
  const toggleProjectBookmark = (projectId) => {
    setBookmarkedProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
    
    // Simple toast simulation
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = bookmarkedProjects.includes(projectId) 
      ? "Project removed from bookmarks" 
      : "Project added to bookmarks";
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  };

  // Toggle skill selection function
  const toggleSelectedSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(item => item !== skill)
        : [...prev, skill]
    );
  };

  // Add new skill function
  const addNewSkill = () => {
    if (newSkill && !newProject.requiredSkills.includes(newSkill)) {
      setNewProject({
        ...newProject,
        requiredSkills: [...newProject.requiredSkills, newSkill]
      });
      setNewSkill('');
    }
  };

  // Remove skill function
  const removeSkill = (skill) => {
    setNewProject({
      ...newProject,
      requiredSkills: newProject.requiredSkills.filter(s => s !== skill)
    });
  };

  // Project form submit handler
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newProject.title || !newProject.description || newProject.requiredSkills.length === 0 || !newProject.deadline) {
      // Simple toast for errors
      const toast = document.createElement('div');
      toast.className = 'toast toast-error';
      toast.textContent = "Please fill all required fields";
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 2000);
      return;
    }
    
    // Here you would typically save the project to your backend
    // Simple toast for success
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.textContent = "Project created successfully!";
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
    
    // Reset the form and hide it
    setNewProject({
      title: '',
      description: '',
      requiredSkills: [],
      deadline: '',
      teamSize: 3
    });
    setShowProjectForm(false);
  };

  // Show interest in project
  const handleProjectInterest = (projectId) => {
    // Simple toast
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.textContent = "Interest submitted!";
    toast.innerHTML = "Interest submitted! <br/><small>The project owner will be notified of your interest.</small>";
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  };

  // Calculate time remaining for project
  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "Deadline passed";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  // Show notification toast
  const showNotification = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  };

  return (
    <div className="teammates-container">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <h1 className="logo">TeamUp</h1>
        </div>
        
        <div className="header-actions">
          <div className="header-icon-container">
            <button 
              className="icon-button"
              onClick={() => showNotification("No new notifications")}
            >
              <Bell size={20} />
            </button>
          </div>
          
          <div className="header-icon-container">
            <button 
              className="icon-button"
              onClick={() => showNotification("No new messages")}
            >
              <MessageSquare size={20} />
            </button>
          </div>
          
          <div className="profile-dropdown" ref={menuRef}>
            <button 
              className="profile-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="profile-pic status-online">
                <img 
                  src="https://i.pravatar.cc/150?img=67" 
                  alt="Your profile" 
                />
              </div>
              <ChevronDown size={16} />
            </button>
            
            {isMenuOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <p className="dropdown-user-name">John Doe</p>
                  <p className="dropdown-user-email">john.doe@university.edu</p>
                </div>
                <button className="dropdown-item">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="dropdown-item">
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="hero">
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find the perfect teammates for your next project</h1>
          <p className="hero-subtitle">
            Connect with talented students, collaborate on innovative ideas, and build amazing projects together.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => setShowProjectForm(true)}
            >
              <PlusSquare size={18} />
              Post a Project
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setActiveTab('students')}
            >
              <Users size={18} />
              Find Students
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setActiveTab('projects')}
            >
              <Briefcase size={18} />
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
        <div className="search-container">
          <div className="search-input-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'projects' ? 'projects' : 'students'}...`}
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-container">
            <button 
              className="filter-button"
              onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
            >
              <Filter size={16} />
              Filter by Skills
              <ChevronDown size={16} />
            </button>
            
            {showSkillsDropdown && (
              <div 
                className="skills-dropdown"
                ref={skillsDropdownRef}
              >
                {SKILLS.map((skill) => (
                  <button
                    key={skill}
                    className={`skill-item ${
                      activeTab === 'projects' 
                        ? activeFilters.includes(skill) ? 'active' : ''
                        : selectedSkills.includes(skill) ? 'active' : ''
                    }`}
                    onClick={() => activeTab === 'projects' ? toggleFilter(skill) : toggleSelectedSkill(skill)}
                  >
                    <span>{skill}</span>
                    {activeTab === 'projects' 
                      ? activeFilters.includes(skill) && <Check size={16} />
                      : selectedSkills.includes(skill) && <Check size={16} />
                    }
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {(activeTab === 'projects' && activeFilters.length > 0) || (activeTab === 'students' && selectedSkills.length > 0) ? (
            <button 
              className="clear-filters-button"
              onClick={() => activeTab === 'projects' ? setActiveFilters([]) : setSelectedSkills([])}
            >
              Clear filters <X size={14} />
            </button>
          ) : null}
        </div>
        
        {/* Active filters/skills display */}
        {((activeTab === 'projects' && activeFilters.length > 0) || (activeTab === 'students' && selectedSkills.length > 0)) && (
          <div className="active-filters">
            {activeTab === 'projects' ? 
              activeFilters.map(filter => (
                <span 
                  key={filter} 
                  className="filter-chip"
                >
                  {filter}
                  <button onClick={() => toggleFilter(filter)} className="chip-remove">
                    <X size={12} />
                  </button>
                </span>
              )) :
              selectedSkills.map(skill => (
                <span 
                  key={skill} 
                  className="filter-chip"
                >
                  {skill}
                  <button onClick={() => toggleSelectedSkill(skill)} className="chip-remove">
                    <X size={12} />
                  </button>
                </span>
              ))
            }
          </div>
        )}
        
        {/* Projects list */}
        {activeTab === 'projects' && (
          <>
            {filteredProjects.length === 0 ? (
              <div className="empty-state">
                <p className="empty-message">No projects found matching your criteria</p>
                <button 
                  className="reset-button"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilters([]);
                  }}
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              <div className="projects-grid">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="project-card"
                  >
                    <div className="card-header">
                      <div className="user-info">
                        <div className={`profile-pic status-${project.status}`}>
                          <img 
                            src={project.avatarUrl} 
                            alt={project.postedBy} 
                          />
                        </div>
                        <div>
                          <p className="user-name">{project.postedBy}</p>
                          <p className="post-date">Posted on {new Date(project.postedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button 
                        className="bookmark-button" 
                        onClick={() => toggleProjectBookmark(project.id)}
                        aria-label={bookmarkedProjects.includes(project.id) ? "Remove bookmark" : "Bookmark project"}
                      >
                        <Bookmark 
                          size={18} 
                          fill={bookmarkedProjects.includes(project.id) ? "currentColor" : "none"} 
                        />
                      </button>
                    </div>
                    
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="skills-section">
                      <p className="section-label">Required Skills</p>
                      <div className="skills-list">
                        {project.requiredSkills.map((skill) => (
                          <span 
                            key={skill} 
                            className="skill-tag"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="project-meta">
                      <div className="meta-item">
                        <Users size={16} />
                        <span>{project.currentMembers}/{project.teamSize} members</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{getTimeRemaining(project.deadline)}</span>
                      </div>
                    </div>
                    
                    <div className="card-actions">
                      <button 
                        className="btn btn-primary full-width"
                        onClick={() => handleProjectInterest(project.id)}
                      >
                        Express Interest
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => setOpenProjectId(openProjectId === project.id ? null : project.id)}
                      >
                        Details
                      </button>
                    </div>
                    
                    {openProjectId === project.id && (
                      <div className="project-details">
                        <p className="details-label">Deadline</p>
                        <p className="details-value">{new Date(project.deadline).toLocaleDateString()}</p>
                        
                        <p className="details-label">Team Size</p>
                        <p className="details-value">{project.teamSize} members needed</p>
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
                <p className="empty-message">No students found matching your criteria</p>
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
                  <div 
                    key={student.id} 
                    className="student-card"
                  >
                    <div className="student-header">
                      <div className={`profile-pic status-${student.status}`}>
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
                    
                    <div className="skills-section">
                      <p className="section-label">Skills</p>
                      <div className="skills-list">
                        {student.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="skill-tag"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      className="btn btn-primary full-width"
                      onClick={() => showNotification(`Connection request sent to ${student.name}`)}
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
              <h2 className="modal-title">Post a New Project</h2>
              <button className="modal-close" onClick={() => setShowProjectForm(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="project-form">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-input"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="form-textarea"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  Required Skills *
                </label>
                <div className="skills-input-container">
                  <div className="skills-input-wrapper">
                    <input
                      type="text"
                      list="skills-list"
                      className="form-input"
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <datalist id="skills-list">
                      {SKILLS.filter(skill => !newProject.requiredSkills.includes(skill)).map((skill) => (
                        <option key={skill} value={skill} />
                      ))}
                    </datalist>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addNewSkill}
                  >
                    Add
                  </button>
                </div>
                
                {newProject.requiredSkills.length > 0 && (
                  <div className="selected-skills">
                    {newProject.requiredSkills.map((skill) => (
                      <span 
                        key={skill} 
                        className="skill-chip"
                      >
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill(skill)} 
                          className="chip-remove"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="deadline" className="form-label">
                    Deadline *
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    className="form-input"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="teamSize" className="form-label">
                    Team Size
                  </label>
                  <select
                    id="teamSize"
                    className="form-select"
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
                  className="btn btn-secondary"
                  onClick={() => setShowProjectForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
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
        <p>©️ 2023 TeamUp - Connect, Collaborate, Create</p>
      </footer>
    </div>
  );
};

export default Teammates;