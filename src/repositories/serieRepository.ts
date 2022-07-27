import { AppDataSource } from "../data-source";
import { Serie } from '../entities/Serie'

export const serieRepository = AppDataSource.getRepository(Serie);



