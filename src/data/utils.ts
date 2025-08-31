import type { Film } from '../data/filmInterface';

export function filterFilms(films: Film[], searchTerm: string): Film[] {
  const lowerSearch = searchTerm.toLowerCase();
  return films.filter(item =>
    item.title.toLowerCase().includes(lowerSearch) ||
    item.release_date.toLowerCase().includes(lowerSearch)
  );
}

export function sortFilms(
  films: Film[],
  sortKey: keyof Film,
  sortOrder: 'asc' | 'desc'
): Film[] {
  return [...films].sort((a, b) => {
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
}
