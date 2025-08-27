
import { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
import type { Film } from "../data/filmInterface";
import { getFilms } from "../data/filmApi";

export default function FilmList() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFilms()
      .then(setFilms)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
}
