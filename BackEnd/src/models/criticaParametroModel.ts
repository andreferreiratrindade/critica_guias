  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'CriticaParametro',timestamps: false})
export class CriticaParametro extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    CriticaParametroId !: number;

    @Column(DataType.INTEGER)
    ParametroTipoId !: number;

    @Column(DataType.INTEGER)
    criticaId!:number;

    @Column(DataType.STRING)
    NmeParametro!:number;

}

