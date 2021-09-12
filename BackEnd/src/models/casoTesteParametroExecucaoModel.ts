  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'CasoTesteParametroExecucao',timestamps: false})
export class CasoTesteParametroExecucao extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    CasoTesteParametroExecucaoId !: number;

    @Column(DataType.INTEGER)
    CasoTesteId !: number;

    @Column(DataType.INTEGER)
    CriticaParametroId !: number;

    @Column(DataType.STRING)
    ValorParametroExecucao!:string;

}

