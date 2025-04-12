import { useState, useEffect } from 'react';
import supabase from '../supabase/supabase.js';

// Using JSDoc comments instead of TypeScript interfaces
/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {string} author
 * @property {number} price
 * @property {string} image
 * @property {string} category
 * @property {string} subject
 * @property {string} branch
 * @property {string} semester
 * @property {string} sellerId
 * @property {{email: string, name: string}} [seller]
 * @property {boolean} [isFavorite]
 */

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch products and join with user profiles
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            seller:sellerId (
              email,
              name: raw_user_meta_data->name
            )
          `);

        if (error) throw error;

        // Transform data to match our expected format
        const transformedProducts = data.map(product => ({
          ...product,
          isFavorite: false, // Setting default favorite state
          // Ensure author is set from seller name if available
          author: product.seller?.name || product.author || 'Unknown Author',
        }));

        setProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Toggle favorite status for a product
  const toggleFavorite = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
    ));
  };

  return { products, loading, error, toggleFavorite };
};
