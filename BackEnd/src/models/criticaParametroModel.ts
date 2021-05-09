  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'CriticaParametro',timestamps: false})
export class CriticaParametro extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    idCriticaParametro !: number;

    @Column(DataType.INTEGER)
    idParametro !: number;

    @Column(DataType.INTEGER)
    idCritica!:number;

    @Column(DataType.INTEGER)
    seqCriticaParametro!:number;

}

