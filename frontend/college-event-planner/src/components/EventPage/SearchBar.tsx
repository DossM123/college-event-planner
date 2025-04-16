import React from 'react';
import '../../styles/SearchBar.css'
interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search events"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  );
};

export default SearchBar;
