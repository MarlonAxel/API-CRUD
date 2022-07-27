import { text } from "stream/consumers";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Director } from "./Director";

@Entity('filmes')
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text'})
    titulo:string;
    
    @Column({type:'text'})
    genero:string;

    // @Column({type:Number, nullable: true})
    // ano_lancamento: number

    @UpdateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @ManyToOne(()=>Director, director => director.filme)
    @JoinColumn({name:'id_diretor'})
    diretor: Director
}