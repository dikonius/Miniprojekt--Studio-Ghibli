
import type { Film } from '../data/filmInterface';
import '../App.css'


interface FilmCardProps {
  film: Film;
}

export default function FilmCard({ film }: FilmCardProps) {
  return (

      <div className="item-card">
        <h2>{film.title}</h2>
        <div className="rightside-descript">
          <img 
          src={film.image} 
          alt={film.title} 
          className="item-image" 
        />
          <div className="paragraph-container">
            <p>{film.description}</p>
            <p className="release">Release date: {film.release_date}</p>
          </div>
        
        </div>
        
      </div>

  );
}
