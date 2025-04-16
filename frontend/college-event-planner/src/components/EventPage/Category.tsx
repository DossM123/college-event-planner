import React, { useState, useEffect } from 'react';
import '../../styles/Category.css';

interface Category {
  category_id: number;
  name: string;
}

interface CategoryDropdownProps {
  onCategoryChange: (categoryId: number | null) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories/view');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value ? parseInt(event.target.value) : null;
    setSelectedCategoryId(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="category-dropdown-container">
      <h2 className="category-dropdown-title">Filter by Category</h2>
      <select
        value={selectedCategoryId ?? ''}
        onChange={handleChange}
        className="category-dropdown-select"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
