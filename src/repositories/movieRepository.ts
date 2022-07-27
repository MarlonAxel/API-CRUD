import { AppDataSource } from "../data-source";
import { Movie } from '../entities/Movie'

//Repositorio da entidade Filme
export const movieRepository = AppDataSource.getRepository(Movie);



