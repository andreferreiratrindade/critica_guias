  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'StoredProcedureParametro',timestamps: false})
export class StoredProcedureParametro extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    storedProcedureParametroId !: number;

    @Column(DataType.INTEGER)
    parametroTipoId !: number;

    @Column(DataType.INTEGER)
    storedProcedureId!:number;

    @Column(DataType.STRING)
    nmeParametro!:number;

}

