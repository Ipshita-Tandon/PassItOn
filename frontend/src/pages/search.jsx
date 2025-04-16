// // src/components/Search/Search.jsx
// import React, { useState, useEffect } from 'react';
// import { Search as SearchIcon, Heart, ShoppingCart } from 'lucide-react';
// import Navbar from '../components/navbar';
// import './search.css';
// import { sampleData } from '../data/data';

// const Search = () => {
//   // State for search and filters
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedBranch, setSelectedBranch] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [selectedSubject, setSelectedSubject] = useState('');
//   const [priceRange, setPriceRange] = useState([100, 500]);
//   const [categories, setCategories] = useState({
//     'Course Books': false,
//     'Stationary': false,
//     'Novels': false,
//     'PYQs': false,
//     'Notes': false,
//   });

//   const [books, setBooks] = useState(sampleData);
  
//   // Filtered books based on search and filters
//   const [filteredBooks, setFilteredBooks] = useState(books);
  
//   // Handle category checkbox change
//   const handleCategoryChange = (category) => {
//     setCategories({
//       ...categories,
//       [category]: !categories[category]
//     });
//   };
  
//   // Handle price range change
//   const handlePriceChange = (e) => {
//     const value = parseInt(e.target.value);
//     const isMinSlider = e.target.id === 'min-price';
    
//     if (isMinSlider) {
//       setPriceRange([value, priceRange[1]]);
//     } else {
//       setPriceRange([priceRange[0], value]);
//     }
//   };
  
//   // Toggle favorite
//   const toggleFavorite = (id) => {
//     setBooks(books.map(book => 
//       book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
//     ));
//   };
  
//   // Add to cart function
//   const addToCart = (book) => {
//     console.log(`Added to cart: ${book.title}`);
//     // Here you would implement cart functionality
//   };
  
//   // Filter books based on all criteria
//   useEffect(() => {
//     let result = books;
    
//     // Filter by search query
//     if (searchQuery) {
//       result = result.filter(book => 
//         book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         book.author.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     // Filter by branch
//     if (selectedBranch) {
//       result = result.filter(book => book.branch === selectedBranch);
//     }
    
//     // Filter by semester
//     if (selectedSemester) {
//       result = result.filter(book => book.semester === selectedSemester);
//     }
    
//     // Filter by subject
//     if (selectedSubject) {
//       result = result.filter(book => book.subject === selectedSubject);
//     }
    
//     // Filter by price range
//     result = result.filter(book => 
//       book.price >= priceRange[0] && book.price <= priceRange[1]
//     );
    
//     // Filter by categories
//     const selectedCategories = Object.keys(categories).filter(key => categories[key]);
//     if (selectedCategories.length > 0) {
//       result = result.filter(book => selectedCategories.includes(book.category));
//     }
    
//     setFilteredBooks(result);
//   }, [searchQuery, selectedBranch, selectedSemester, selectedSubject, priceRange, categories, books]);

//   return (
//     <div className="bookstore-container">
//       <Navbar />
//       <div className="bookstore-search-page">
//         <div className="bookstore-filters-container">
//           <div className="bookstore-search-filters">
//             <div className="bookstore-search-box">
//               <SearchIcon className="bookstore-search-icon" size={20} />
//               <input 
//                 type="text" 
//                 placeholder="Search for books..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
            
//             <div className="bookstore-filter-item">
//               <select 
//                 value={selectedBranch}
//                 onChange={(e) => setSelectedBranch(e.target.value)}
//                 className="bookstore-filter-select"
//               >
//                 <option value="">Select Branch</option>
//                 <option value="Engineering">Engineering</option>
//                 <option value="Science">Science</option>
//                 <option value="Arts">Arts</option>
//               </select>
//             </div>
            
//             <div className="bookstore-filter-item">
//               <select 
//                 value={selectedSemester}
//                 onChange={(e) => setSelectedSemester(e.target.value)}
//                 className="bookstore-filter-select"
//               >
//                 <option value="">Select Semester</option>
//                 <option value="1">Semester 1</option>
//                 <option value="2">Semester 2</option>
//                 <option value="3">Semester 3</option>
//                 <option value="4">Semester 4</option>
//               </select>
//             </div>
            
//             <div className="bookstore-filter-item">
//               <select 
//                 value={selectedSubject}
//                 onChange={(e) => setSelectedSubject(e.target.value)}
//                 className="bookstore-filter-select"
//               >
//                 <option value="">Select Subject</option>
//                 <option value="Mathematics">Mathematics</option>
//                 <option value="Chemistry">Chemistry</option>
//                 <option value="Physics">Physics</option>
//                 <option value="Electrical">Electrical</option>
//                 <option value="Computer Science">Computer Science</option>
//                 <option value="Psychology">Psychology</option>
//                 <option value="Economics">Economics</option>
//                 <option value="Art History">Art History</option>
//               </select>
//             </div>
            
//             <div className="bookstore-filter-price">
//               <h3>Filter Price Range</h3>
//               <div className="bookstore-price-slider-container">
//                 <input 
//                   type="range" 
//                   id="min-price" 
//                   min="0" 
//                   max="1000" 
//                   value={priceRange[0]} 
//                   onChange={handlePriceChange}
//                   className="bookstore-price-slider"
//                 />
//                 <input 
//                   type="range" 
//                   id="max-price" 
//                   min="0" 
//                   max="1000" 
//                   value={priceRange[1]} 
//                   onChange={handlePriceChange}
//                   className="bookstore-price-slider"
//                 />
//                 <div className="bookstore-price-values">
//                   <span>₹{priceRange[0]}</span>
//                   <span>₹{priceRange[1]}</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bookstore-filter-categories">
//               <h3>Categories</h3>
//               {Object.keys(categories).map((category) => (
//                 <label key={category} className="bookstore-category-checkbox">
//                   <input 
//                     type="checkbox" 
//                     checked={categories[category]} 
//                     onChange={() => handleCategoryChange(category)}
//                   />
//                   <span>{category}</span>
//                 </label>
//               ))}
//             </div>
            
//             <button className="bookstore-explore-all-btn">
//               Explore All <span className="bookstore-arrow">→</span>
//             </button>
//           </div>
//         </div>
        
//         <div className="bookstore-search-results">
//           <h2 className="bookstore-results-title">
//             {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'} Found
//           </h2>
          
//           <div className="bookstore-books-grid">
//             {filteredBooks.map((book) => (
//               <div className="bookstore-book-card" key={book.id}>
//                 <div className="bookstore-book-image">
//                   <img src={book.image} alt={book.title} />
//                   <button 
//                     className={`bookstore-favorite-btn ${book.isFavorite ? 'active' : ''}`}
//                     onClick={() => toggleFavorite(book.id)}
//                   >
//                     <Heart size={20} fill={book.isFavorite ? "#ea384c" : "none"} stroke={book.isFavorite ? "#ea384c" : "white"} />
//                   </button>
//                 </div>
//                 <div className="bookstore-book-info">
//                   <div className="bookstore-book-category">{book.category}</div>
//                   <h3 className="bookstore-book-title">{book.title}</h3>
//                   <p className="bookstore-book-author">by {book.author}</p>
//                   <div className="bookstore-book-details">
//                     <span className="bookstore-book-subject">{book.subject}</span>
//                     <span className="bookstore-book-semester">Sem {book.semester}</span>
//                   </div>
//                   <div className="bookstore-book-price-action">
//                     <p className="bookstore-book-price">₹{book.price}</p>
//                     <button 
//                       className="bookstore-add-to-cart-btn"
//                       onClick={() => addToCart(book)}
//                     >
//                       <ShoppingCart size={16} />
//                       Add to cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;


// import React, { useState, useEffect } from 'react';
// import { Search as SearchIcon, Heart, ShoppingCart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/navbar';
// import './search.css';
// import { sampleData } from '../data/data';

// const Search = () => {
//   // State for search and filters
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedBranch, setSelectedBranch] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [selectedSubject, setSelectedSubject] = useState('');
//   const [priceRange, setPriceRange] = useState([100, 500]);
//   const [categories, setCategories] = useState({
//     'Course Books': false,
//     'Stationary': false,
//     'Novels': false,
//     'PYQs': false,
//     'Notes': false,
//   });

//   const [books, setBooks] = useState(sampleData);
//   const [filteredBooks, setFilteredBooks] = useState(books);
//   const navigate = useNavigate();
  
//   // Handle category checkbox change
//   const handleCategoryChange = (category) => {
//     setCategories({
//       ...categories,
//       [category]: !categories[category]
//     });
//   };
  
//   // Handle price range change
//   const handlePriceChange = (e) => {
//     const value = parseInt(e.target.value);
//     const isMinSlider = e.target.id === 'min-price';
    
//     if (isMinSlider) {
//       setPriceRange([value, priceRange[1]]);
//     } else {
//       setPriceRange([priceRange[0], value]);
//     }
//   };
  
//   // Toggle favorite
//   const toggleFavorite = (id) => {
//     setBooks(books.map(book => 
//       book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
//     ));
//   };
  
//   // Add to cart function
//   const addToCart = (book, e) => {
//     e.stopPropagation();
//     console.log(`Added to cart: ${book.title}`);
//     // Here you would implement cart functionality
//   };

//   // Handle book click to navigate to details page
//   const handleBookClick = (id) => {
//     navigate(`/book/${id}`);
//   };
  
//   // Filter books based on all criteria
//   useEffect(() => {
//     let result = books;
    
//     // Filter by search query
//     if (searchQuery) {
//       result = result.filter(book => 
//         book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         book.author.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     // Filter by branch
//     if (selectedBranch) {
//       result = result.filter(book => book.branch === selectedBranch);
//     }
    
//     // Filter by semester
//     if (selectedSemester) {
//       result = result.filter(book => book.semester === selectedSemester);
//     }
    
//     // Filter by subject
//     if (selectedSubject) {
//       result = result.filter(book => book.subject === selectedSubject);
//     }
    
//     // Filter by price range
//     result = result.filter(book => 
//       book.price >= priceRange[0] && book.price <= priceRange[1]
//     );
    
//     // Filter by categories
//     const selectedCategories = Object.keys(categories).filter(key => categories[key]);
//     if (selectedCategories.length > 0) {
//       result = result.filter(book => selectedCategories.includes(book.category));
//     }
    
//     setFilteredBooks(result);
//   }, [searchQuery, selectedBranch, selectedSemester, selectedSubject, priceRange, categories, books]);

//   // Handle favorite button click without navigating
//   const handleFavoriteClick = (e, id) => {
//     e.stopPropagation();
//     toggleFavorite(id);
//   };

//   return (
//     <div className="bookstore-container">
//       <Navbar />
//       <div className="bookstore-search-page">
//         <div className="bookstore-filters-container">
//           <div className="bookstore-search-filters">
//             <div className="bookstore-search-box">
//               <SearchIcon className="bookstore-search-icon" size={20} />
//               <input 
//                 type="text" 
//                 placeholder="Search for books..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
            
//             <div className="bookstore-filter-item">
//               <select 
//                 value={selectedBranch}
//                 onChange={(e) => setSelectedBranch(e.target.value)}
//                 className="bookstore-filter-select"
//               >
//                 <option value="">Select Branch</option>
//                 <option value="Engineering">Engineering</option>
//                 <option value="Science">Science</option>
//                 <option value="Arts">Arts</option>
//               </select>
//             </div>
            
//             <div className="bookstore-filter-item">
//               <select 
//                 value={selectedSemester}
//                 onChange={(e) => setSelectedSemester(e.target.value)}
//                 className="bookstore-filter-select"
//               >
//                 <option value="">Select Semester</option>
//                 <option value="1">Semester 1</option>
//                 <option value="2">Semester 2</option>
//                 <option value="3">Semester 3</option>
//                 <option value="4">Semester 4</option>
//               </select>
//             </div>
            
//             <div className="bookstore-filter-item">
//               <select 
//                 value={selectedSubject}
//                 onChange={(e) => setSelectedSubject(e.target.value)}
//                 className="bookstore-filter-select"
//               >
//                 <option value="">Select Subject</option>
//                 <option value="Mathematics">Mathematics</option>
//                 <option value="Chemistry">Chemistry</option>
//                 <option value="Physics">Physics</option>
//                 <option value="Electrical">Electrical</option>
//                 <option value="Computer Science">Computer Science</option>
//                 <option value="Psychology">Psychology</option>
//                 <option value="Economics">Economics</option>
//                 <option value="Art History">Art History</option>
//               </select>
//             </div>
            
//             <div className="bookstore-filter-price">
//               <h3>Filter Price Range</h3>
//               <div className="bookstore-price-slider-container">
//                 <input 
//                   type="range" 
//                   id="min-price" 
//                   min="0" 
//                   max="1000" 
//                   value={priceRange[0]} 
//                   onChange={handlePriceChange}
//                   className="bookstore-price-slider"
//                 />
//                 <input 
//                   type="range" 
//                   id="max-price" 
//                   min="0" 
//                   max="1000" 
//                   value={priceRange[1]} 
//                   onChange={handlePriceChange}
//                   className="bookstore-price-slider"
//                 />
//                 <div className="bookstore-price-values">
//                   <span>₹{priceRange[0]}</span>
//                   <span>₹{priceRange[1]}</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bookstore-filter-categories">
//               <h3>Categories</h3>
//               {Object.keys(categories).map((category) => (
//                 <label key={category} className="bookstore-category-checkbox">
//                   <input 
//                     type="checkbox" 
//                     checked={categories[category]} 
//                     onChange={() => handleCategoryChange(category)}
//                   />
//                   <span>{category}</span>
//                 </label>
//               ))}
//             </div>
            
//             <button className="bookstore-explore-all-btn">
//               Explore All <span className="bookstore-arrow">→</span>
//             </button>
//           </div>
//         </div>
        
//         <div className="bookstore-search-results">
//           <h2 className="bookstore-results-title">
//             {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'} Found
//           </h2>
          
//           <div className="bookstore-books-grid">
//             {filteredBooks.map((book) => (
//               <div 
//                 className="bookstore-book-card" 
//                 key={book.id}
//                 onClick={() => handleBookClick(book.id)}
//               >
//                 <div className="bookstore-book-image">
//                   <img src={book.image} alt={book.title} />
//                   <button 
//                     className={`bookstore-favorite-btn ${book.isFavorite ? 'active' : ''}`}
//                     onClick={(e) => handleFavoriteClick(e, book.id)}
//                   >
//                     <Heart size={20} fill={book.isFavorite ? "#ea384c" : "none"} stroke={book.isFavorite ? "#ea384c" : "white"} />
//                   </button>
//                 </div>
//                 <div className="bookstore-book-info">
//                   <div className="bookstore-book-category">{book.category}</div>
//                   <h3 className="bookstore-book-title">{book.title}</h3>
//                   <p className="bookstore-book-author">by {book.author}</p>
//                   <div className="bookstore-book-details">
//                     <span className="bookstore-book-subject">{book.subject}</span>
//                     <span className="bookstore-book-semester">Sem {book.semester}</span>
//                   </div>
//                   <div className="bookstore-book-price-action">
//                     <p className="bookstore-book-price">₹{book.price}</p>
//                     <button 
//                       className="bookstore-add-to-cart-btn"
//                       onClick={(e) => addToCart(book, e)}
//                     >
//                       <ShoppingCart size={16} />
//                       Add to cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;




import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import './search.css';
import toast from 'react-hot-toast';
import supabase from '../supabase/supabase';

const Search = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [categories, setCategories] = useState({
    'Course Books': false,
    'Stationary': false,
    'Novels': false,
    'PYQs': false,
    'Notes': false,
  });

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  
  // Fetch all books from Supabase
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Products")
          .select('*');
        
        if (error) {
          throw error;
        }
        
        setBooks(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error("Failed to load books. Please try again.");
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);
  
  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category]
    });
  };
  
  // Handle price range change
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const isMinSlider = e.target.id === 'min-price';
    
    if (isMinSlider) {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };
  
  // Toggle favorite
  const toggleFavorite = (id) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
    ));
  };
  
  // Add to cart function
  const addToCart = (book, e) => {
    e.stopPropagation();
    console.log(`Added to cart: ${book.title}`);
    toast.success(`${book.title} has been added to your cart.`);
    // Here you would implement cart functionality
  };

  // Handle book click to navigate to details page
  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };
  
  // Filter books based on all criteria
  useEffect(() => {
    let result = books;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(book => 
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by branch
    if (selectedBranch) {
      result = result.filter(book => book.branch === selectedBranch);
    }
    
    // Filter by semester
    if (selectedSemester) {
      result = result.filter(book => book.semester === selectedSemester);
    }
    
    // Filter by subject
    if (selectedSubject) {
      result = result.filter(book => book.subject === selectedSubject);
    }
    
    // Filter by price range
    result = result.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );
    
    // Filter by categories
    const selectedCategories = Object.keys(categories).filter(key => categories[key]);
    if (selectedCategories.length > 0) {
      result = result.filter(book => selectedCategories.includes(book.category));
    }
    
    setFilteredBooks(result);
  }, [searchQuery, selectedBranch, selectedSemester, selectedSubject, priceRange, categories, books]);

  // Handle favorite button click without navigating
  const handleFavoriteClick = (e, id) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="bookstore-container">
      <Navbar />
      <div className="bookstore-search-page">
        <div className="bookstore-filters-container">
          <div className="bookstore-search-filters">
            <div className="bookstore-search-box">
              <SearchIcon className="bookstore-search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search for books..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="bookstore-filter-item">
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bookstore-filter-select"
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="CSE-AI">CSE-AI</option>
                <option value="ECE">ECE</option>
                <option value="ECE-AI">ECE-AI</option>
                <option value="MECH">MECH</option>
                <option value="AI-ML">AI-ML</option>
                <option value="BARCH">BARCH</option>
                <option value="BBA">BBA</option>
              </select>
            </div>
            
            <div className="bookstore-filter-item">
              <select 
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="bookstore-filter-select"
              >
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
            
            <div className="bookstore-filter-item">
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bookstore-filter-select"
              >
                <option value="">Select Subject</option>
                <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
                <option value="DBMS">DBMS</option>
                <option value="OOPS">OOPS</option>
                <option value="Applied Mathematics">Applied Mathematics</option>
                <option value="Computer Organisation and Architecture">Computer Organisation and Architecture</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Programming Languages">Programming Languages</option>
                <option value="Disaster Management">Disaster Management</option>
                <option value="Engineering Graphics">Engineering Graphics</option>
              </select>
            </div>
            
            <div className="bookstore-filter-price">
              <h3>Filter Price Range</h3>
              <div className="bookstore-price-slider-container">
                <input 
                  type="range" 
                  id="min-price" 
                  min="0" 
                  max="1000" 
                  value={priceRange[0]} 
                  onChange={handlePriceChange}
                  className="bookstore-price-slider"
                />
                <input 
                  type="range" 
                  id="max-price" 
                  min="0" 
                  max="1000" 
                  value={priceRange[1]} 
                  onChange={handlePriceChange}
                  className="bookstore-price-slider"
                />
                <div className="bookstore-price-values">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div className="bookstore-filter-categories">
              <h3>Categories</h3>
              {Object.keys(categories).map((category) => (
                <label key={category} className="bookstore-category-checkbox">
                  <input 
                    type="checkbox" 
                    checked={categories[category]} 
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
            
            <button className="bookstore-explore-all-btn">
              Explore All <span className="bookstore-arrow">→</span>
            </button>
          </div>
        </div>
        
        <div className="bookstore-search-results">
          {loading ? (
            <div className="bookstore-loading">Loading books...</div>
          ) : (
            <>
              <h2 className="bookstore-results-title">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'} Found
              </h2>
              
              <div className="bookstore-books-grid">
                {filteredBooks.map((book) => (
                  <div 
                    className="bookstore-book-card" 
                    key={book.id}
                    onClick={() => handleBookClick(book.id)}
                  >
                    <div className="bookstore-book-image">
                      <img src={book.image} alt={book.title} />
                      <button 
                        className={`bookstore-favorite-btn ${book.isFavorite ? 'active' : ''}`}
                        onClick={(e) => handleFavoriteClick(e, book.id)}
                      >
                        <Heart size={20} fill={book.isFavorite ? "#ea384c" : "none"} stroke={book.isFavorite ? "#ea384c" : "white"} />
                      </button>
                    </div>
                    <div className="bookstore-book-info">
                      <div className="bookstore-book-category">{book.category}</div>
                      <h3 className="bookstore-book-title">{book.title}</h3>
                      <p className="bookstore-book-author">by {book.author}</p>
                      <div className="bookstore-book-details">
                        <span className="bookstore-book-subject">{book.subject}</span>
                        <span className="bookstore-book-semester">Sem {book.semester}</span>
                      </div>
                      <div className="bookstore-book-price-action">
                        <p className="bookstore-book-price">₹{book.price}</p>
                        <button 
                          className="bookstore-add-to-cart-btn"
                          onClick={(e) => addToCart(book, e)}
                        >
                          <ShoppingCart size={16} />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;