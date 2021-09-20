  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'StoredProcedureCobertura',timestamps: false})
export class StoredProcedureCobertura extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
            storedProcedureCoberturaId !: number;

    @Column(DataType.INTEGER)
    storedProcedureId !: number;

    @Column(DataType.INTEGER)
    totalCoberto!:number;

    @Column(DataType.INTEGER)
    totalEtapa!:number;

    @Column(DataType.STRING)
    coberturaHtml!:string;
}

