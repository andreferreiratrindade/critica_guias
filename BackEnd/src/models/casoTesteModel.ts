  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'CasoTeste',timestamps: false})
export class CasoTeste extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    casoTesteId !: number;

    @Column(DataType.INTEGER)
    criticaId !: number;

    @Column(DataType.INTEGER)
    casoTesteSituacaoId !: number;

    @Column(DataType.STRING)
    nmeCasoTeste!:string;

    @Column(DataType.STRING)
    nmeEsperado!:number;

    @Column(DataType.STRING)
    nmeAtual!:number;

}

