  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'CriticaParametro',timestamps: false})
export class CriticaParametro extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    criticaParametroId !: number;

    @Column(DataType.INTEGER)
    parametroTipoId !: number;

    @Column(DataType.INTEGER)
    criticaId!:number;

    @Column(DataType.STRING)
    nmeParametro!:number;

}

