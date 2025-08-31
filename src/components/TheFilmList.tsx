import { useEffect, useState } from 'react';
import '../App.css';
import type { Film } from '../data/filmInterface';
import { getFilms } from '../data/filmApi';
import FilmCard from './FilmCard';
import SearchBar from './SearchBar';
import SortButtons from './SortButtonss';
import { filterFilms, sortFilms } from '../data/utils';

export default function SortAndSearch() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortKey, setSortKey] = useState<keyof Film>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    getFilms()
      .then(setFilms)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;


  const filteredItems = filterFilms(films, searchTerm);
  const sortedItems = sortFilms(filteredItems, sortKey, sortOrder);

  const handleSort = (key: keyof Film) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="sort-search-container">
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <SortButtons sortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />

      <div className="layout">
        {sortedItems.length > 0 ? (
          sortedItems.map(item => (
            <FilmCard key={item.id} film={item} />
          ))
        ) : (
          <h3 className="no-results">No results found.</h3>
        )}
      </div>
    </div>

  );
}
