import React, { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Slider from "../components/slider";
import "./explore.css";

// Sample data for demonstration
const SAMPLE_ITEMS = [
  {
    id: 1,
    title: "Books",
    image: "/lovable-uploads/5a421641-4080-4e28-8043-462fd12f3246.png",
    category: "Course Books",
    price: 350,
  },
  {
    id: 2,
    title: "Stationery",
    image: "/lovable-uploads/5a421641-4080-4e28-8043-462fd12f3246.png",
    category: "Stationery",
    price: 150,
  },
  {
    id: 3,
    title: "Novels",
    image: "/lovable-uploads/5a421641-4080-4e28-8043-462fd12f3246.png",
    category: "Novels",
    price: 250,
  },
  {
    id: 4,
    title: "PYQs",
    image: "/lovable-uploads/5a421641-4080-4e28-8043-462fd12f3246.png",
    category: "PYQs",
    price: 120,
  },
  {
    id: 5,
    title: "Notes",
    image: "/lovable-uploads/5a421641-4080-4e28-8043-462fd12f3246.png",
    category: "Notes",
    price: 180,
  },
  {
    id: 6,
    title: "Roommates",
    image: "/lovable-uploads/5a421641-4080-4e28-8043-462fd12f3246.png",
    category: "Roommates",
    price: 0,
  },
];

// Sample dropdown data
const BRANCHES = ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics"];
const SEMESTERS = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];
const SUBJECTS = ["Data Structures", "Algorithms", "Database Management", "Operating Systems", "Computer Networks"];

// Category options
const CATEGORIES = ["Course Books", "Stationery", "Novels", "PYQs", "Notes"];

const Explore = () => {
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState(SAMPLE_ITEMS);
  
  // State for dropdown visibility
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  
  // State for selected dropdown values
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const navigate = useNavigate();

  // Handle price range change for min value
  const handleMinPriceChange = (value) => {
    setPriceRange([value, priceRange[1]]);
  };

  // Handle price range change for max value
  const handleMaxPriceChange = (value) => {
    setPriceRange([priceRange[0], value]);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Filter items based on selected criteria
  useEffect(() => {
    let filtered = SAMPLE_ITEMS;

    // Filter by price range
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
  }, [priceRange, selectedCategories, searchQuery]);

  // Handle dropdown selection
  const selectBranch = (branch) => {
    setSelectedBranch(branch);
    setBranchDropdownOpen(false);
  };

  const selectSemester = (semester) => {
    setSelectedSemester(semester);
    setSemesterDropdownOpen(false);
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setSubjectDropdownOpen(false);
  };

  const goToExplore = (category) => {
    // In a real application, we would navigate to a filtered view
    console.log(`Exploring ${category}`);
    // For demo purposes, we'll just show an alert
    alert(`Exploring ${category}`);
  };

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore By Category</h1>
      
      <div className="explore-content">
        <div className="filters-section">
          {/* Search */}
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* Dropdowns */}
          <div className="dropdown-container">
            <div className="custom-dropdown">
              <div 
                className="dropdown-header" 
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
              >
                <span>{selectedBranch || "Select Branch"}</span>
                <ChevronDown size={18} />
              </div>
              {branchDropdownOpen && (
                <div className="dropdown-options">
                  {BRANCHES.map((branch) => (
                    <div
                      key={branch}
                      className="dropdown-option"
                      onClick={() => selectBranch(branch)}
                    >
                      {branch}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="custom-dropdown">
              <div 
                className="dropdown-header" 
                onClick={() => setSemesterDropdownOpen(!semesterDropdownOpen)}
              >
                <span>{selectedSemester || "Select Semester"}</span>
                <ChevronDown size={18} />
              </div>
              {semesterDropdownOpen && (
                <div className="dropdown-options">
                  {SEMESTERS.map((semester) => (
                    <div
                      key={semester}
                      className="dropdown-option"
                      onClick={() => selectSemester(semester)}
                    >
                      {semester}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="custom-dropdown">
              <div 
                className="dropdown-header" 
                onClick={() => setSubjectDropdownOpen(!subjectDropdownOpen)}
              >
                <span>{selectedSubject || "Select Subject"}</span>
                <ChevronDown size={18} />
              </div>
              {subjectDropdownOpen && (
                <div className="dropdown-options">
                  {SUBJECTS.map((subject) => (
                    <div
                      key={subject}
                      className="dropdown-option"
                      onClick={() => selectSubject(subject)}
                    >
                      {subject}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Price Range */}
          <div className="price-range-container">
            <label className="filter-label">Filter Price Range</label>
            <div className="price-slider-container">
              <div className="slider-labels">
                <span>Min: ₹{priceRange[0]}</span>
                <span>Max: ₹{priceRange[1]}</span>
              </div>
              <div className="sliders-container">
                <Slider 
                  min={0} 
                  max={1000} 
                  step={10}
                  value={priceRange[0]}
                  onChange={handleMinPriceChange}
                />
                <Slider 
                  min={0} 
                  max={1000} 
                  step={10}
                  value={priceRange[1]}
                  onChange={handleMaxPriceChange}
                />
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="categories-container">
            <label className="filter-label">Categories</label>
            <div className="categories-checkboxes">
              {CATEGORIES.map((category) => (
                <div key={category} className="category-checkbox">
                  <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Explore All Button */}
          <button 
            className="explore-all-button"
            onClick={() => {
              setSelectedCategories([]);
              setPriceRange([100, 500]);
              setSearchQuery("");
            }}
          >
            Explore All <span className="arrow">→</span>
          </button>
        </div>
        
        {/* Results Grid */}
        <div className="results-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="category-card">
              <div 
                className="card-image" 
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="card-overlay">
                  <h3>{item.title}</h3>
                  <button 
                    className="explore-button"
                    onClick={() => goToExplore(item.title)}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
