import React, { useState } from 'react';
import './SortAndSearch.css';
import type { Film } from '../data/filmInterface';


interface SortAndSearchProps {
    items: Film[];
}

const SortAndSearch: React.FC<SortAndSearchProps> = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortKey, setSortKey] = useState<keyof Film>('title');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.release_date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    const sortedItems = [...filteredItems].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
    });
    

    const handleSort = (key: keyof Film) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };
    
    return (
        <div className="sort-and-search-container">

        <div className="search-container">
        <input
        type="text"
        placeholder="Sök efter titel eller premiärår..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        />
        </div>
        

        <div className="sort-buttons">
        
        <button
        onClick={() => handleSort('title')}
        className={`sort-button ${sortKey === 'title' ? 'active' : ''}`}
        >
        Sortera efter titel {sortKey === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        
        <button
        onClick={() => handleSort('release_date')}
        className={`sort-button ${sortKey === 'release_date' ? 'active' : ''}`}
        >
        Sortera efter premiärår {sortKey === 'release_date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        
        </div>
        

        <div className="items-grid">
        {sortedItems.length > 0 ? (
            sortedItems.map(item => (
                <div
                key={item.id}
                className="item-card"
                >
                <div>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-release_date">{item.release_date}</p>
                </div>
                
                </div>
            ))
        ) : (
            <p className="no-results">Inga resultat hittades.</p>
        )}
        </div>
        </div>
    );
};

export default SortAndSearch;