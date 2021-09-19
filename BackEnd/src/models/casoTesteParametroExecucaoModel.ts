  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'CasoTesteParametroExecucao',timestamps: false})
export class CasoTesteParametroExecucao extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true,
            allowNull:true
           })
    
    casoTesteParametroExecucaoId !: number;

    @Column(DataType.INTEGER)
    casoTesteId !: number;

    @Column(DataType.INTEGER)
    storedProcedureParametroId !: number;

    @Column(DataType.STRING)
    valorParametroExecucao!:string;

}

