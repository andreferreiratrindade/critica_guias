  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'Parametro',timestamps: false})
export class Parametro extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    storedProcedureId !: number;

    @Column(DataType.STRING)
    nmeStoredProcedure !: string;

    @Column(DataType.STRING)
    desStoredProcedure!:string;

    @Column(DataType.INTEGER)
    nroStoredProcedure!:number;

}

