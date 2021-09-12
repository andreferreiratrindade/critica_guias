  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'CasoTeste',timestamps: false})
export class CasoTeste extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    CasoTesteId !: number;

    @Column(DataType.INTEGER)
    CriticaId !: number;

    @Column(DataType.INTEGER)
    CasoTesteSituacaoId !: number;

    @Column(DataType.STRING)
    NmeCasoTeste!:string;

    @Column(DataType.STRING)
    NmeEsperado!:number;

    @Column(DataType.STRING)
    NmeAtual!:number;

}

