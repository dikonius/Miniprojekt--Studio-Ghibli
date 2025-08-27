import axios from "axios"
import type { Film } from '../data/filmInterface';


const API_BASE = "https://ghibliapi.vercel.app";

export async function getFilms(): Promise<Film[]> {
  const response = await axios.get<Film[]>(`${API_BASE}/films`);
  return response.data;
}