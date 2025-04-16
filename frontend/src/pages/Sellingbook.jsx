import React, { useState } from 'react';
import { toast } from "sonner";
import './Sellingbook.css';

const SellingBook = () => {
  const [bookForm, setBookForm] = useState({
    title: '',
    category: '',
    description: '',
    author: '',
    brand: '',
    publisher: '',
    price: '',
    sellerId: ''
  });
  const [images, setImages] = useState([]);

  const handleBookFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    setImages(files);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    const { title, category, author, description, price, sellerId } = bookForm;
    
    if (!title || !category || !author || !description || !price || !sellerId) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    console.log({ ...bookForm, images });
    toast.success("Book listing submitted successfully!");
    
    // Reset form
    setBookForm({
      title: '',
      category: '',
      description: '',
      author: '',
      brand: '',
      publisher: '',
      price: '',
      sellerId: ''
    });
    setImages([]);
  };

  const categories = [
    "Fiction", "Non-Fiction", "Mystery", "Romance", "Science Fiction", 
    "Fantasy", "Biography", "History", "Self-Help", "Children's",
    "Young Adult", "Poetry", "Comics & Graphic Novels", "Religion & Spirituality",
    "Business", "Cooking", "Travel", "Art & Photography", "Other"
  ];

  return (
    <div className="explore-book-listing-container">
      <div className="explore-book-content-wrapper">
        <div className="explore-book-form-container">
          <form onSubmit={handleBookSubmit} className="explore-book-form">
            <div className="explore-book-form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Book title"
                className="explore-book-input-field"
                value={bookForm.title}
                onChange={handleBookFormChange}
              />
            </div>
            
            <div className="explore-book-form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                className="explore-book-input-field"
                value={bookForm.category}
                onChange={handleBookFormChange}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="explore-book-form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Author name"
                className="explore-book-input-field"
                value={bookForm.author}
                onChange={handleBookFormChange}
              />
            </div>
            
            <div className="explore-book-form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                placeholder="Book brand"
                className="explore-book-input-field"
                value={bookForm.brand}
                onChange={handleBookFormChange}
              />
            </div>
            
            <div className="explore-book-form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                placeholder="Publisher name"
                className="explore-book-input-field"
                value={bookForm.publisher}
                onChange={handleBookFormChange}
              />
            </div>
            
            <div className="explore-book-form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="0.00"
                className="explore-book-input-field"
                value={bookForm.price}
                onChange={handleBookFormChange}
              />
            </div>
            
            <div className="explore-book-form-group">
              <label htmlFor="sellerId">Seller ID *</label>
              <input
                type="text"
                id="sellerId"
                name="sellerId"
                placeholder="Your seller ID"
                className="explore-book-input-field"
                value={bookForm.sellerId}
                onChange={handleBookFormChange}
              />
            </div>
            
            <div className="explore-book-form-group explore-book-full-width">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter a detailed description of the book"
                className="explore-book-input-field explore-book-textarea"
                value={bookForm.description}
                onChange={handleBookFormChange}
              />
            </div>
            
            <div className="explore-book-form-group explore-book-full-width">
              <label>Images *</label>
              <div className="explore-book-image-upload">
                <label htmlFor="image-input" className="explore-book-image-upload-label">
                  <span>Upload images (max 5)</span>
                </label>
                <input
                  id="image-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="explore-book-hidden-input"
                />
              </div>
              {images.length > 0 && (
                <div className="explore-book-image-preview-text">
                  {images.length} {images.length === 1 ? 'image' : 'images'} selected
                </div>
              )}
            </div>
            
            <button type="submit" className="explore-book-submit-btn">
              Submit Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellingBook;