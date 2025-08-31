import React, { useState } from 'react';
import { searchSchema } from '../data/searchSchema';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const result = searchSchema.safeParse(value);

    if (result.success) {
      setError(null);
      onSearch(result.data ?? "");
    } else {
      setError(result.error.issues[0].message);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for release years or titles..."
        value={searchTerm}
        onChange={handleChange}
        className={`search-input ${error ? 'input-error' : ''}`}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default SearchBar;
