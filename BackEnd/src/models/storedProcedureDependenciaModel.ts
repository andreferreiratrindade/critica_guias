  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'StoredProcedureDependencia',timestamps: false})
export class StoredProcedureDependencia extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    storedProcedureDependenciaId !: number;

    @Column(DataType.INTEGER)
    storedProcedureId !: number;

    @Column(DataType.STRING)
    nmeDependencia!:string;

    @Column(DataType.INTEGER)
    storedProcedureDependenciaTipoId !: number;

}

