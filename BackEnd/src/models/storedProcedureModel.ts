  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'StoredProcedure',timestamps: false})
export class StoredProcedure extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    storedProcedureId !: number;

    @Column(DataType.STRING)
    nmeStoredProcedure!:number;

}

