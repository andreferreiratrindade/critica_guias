  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'CriticaTabelaDependencia',timestamps: false})
export class CriticaTabelaDependencia extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    criticaTabelaDependenciaId !: number;

    @Column(DataType.INTEGER)
    criticaId !: number;

    @Column(DataType.STRING)
    nmeTabela!:string;

}

