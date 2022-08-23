
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Director } from "./Director";

@Entity('series')
export class Serie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text'})
    titulo:string;
    
    @Column({type:'text'})
    genero:string;

    @Column({type:Number})
    qtd_temporada:number;

    @Column({type:Number, nullable: true})
    ano_lancamento: number
   
    @UpdateDateColumn()
    createdAt:Date;
    
    @UpdateDateColumn()
    updatedAt:Date;
    
    @ManyToOne(()=>Director, director => director.serie)
    @JoinColumn({name:'id_diretor'})
    diretor: Director;
    
}