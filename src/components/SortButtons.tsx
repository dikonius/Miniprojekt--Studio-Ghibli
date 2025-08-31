import type { Film } from '../data/filmInterface';

interface SortButtonsProps {
  sortKey: keyof Film;
  sortOrder: 'asc' | 'desc';
  onSort: (key: keyof Film) => void;
}

export default function SortButtons({ sortKey, sortOrder, onSort }: SortButtonsProps) {
  return (
    <div className="sort-buttons">
      <button
        onClick={() => onSort('title')}
        className={`sort-button ${sortKey === 'title' ? 'active' : ''}`}
      >
        Sort by title {sortKey === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
      </button>

      <button
        onClick={() => onSort('release_date')}
        className={`sort-button ${sortKey === 'release_date' ? 'active' : ''}`}
      >
        Sort by release year {sortKey === 'release_date' && (sortOrder === 'asc' ? '↑' : '↓')}
      </button>
    </div>
  );
}
