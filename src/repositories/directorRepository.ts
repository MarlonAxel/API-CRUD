import { AppDataSource } from "../data-source";
import { Director } from '../entities/Director'

export const directorRepository = AppDataSource.getRepository(Director);



