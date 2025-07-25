import React, { useState, useMemo } from 'react';
import { products } from './products';
import './App.css';

function App() {
  // State for the search term and selected category
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get all unique categories from the product data, plus "All"
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // useMemo will re-calculate the filtered products only when the dependencies change
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Category filter
        return selectedCategory === 'All' || product.category === selectedCategory;
      })
      .filter(product => {
        // Search term filter (case-insensitive)
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Interactive Product Filter</h1>
      </header>
      
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search by product name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className={`stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products-found">No products match your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default App;