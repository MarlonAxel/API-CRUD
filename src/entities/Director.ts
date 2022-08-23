import { text } from "stream/consumers";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Movie } from "./Movie";
import { Serie } from "./Serie";

@Entity('diretor')
export class Director {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text'})
    nome:string;

    @OneToMany( _=> Movie, movie => movie.diretor )
    filme: Movie[];

    @OneToMany( _=> Serie, serie => serie.diretor )
    serie: Serie[];

    @UpdateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    
}