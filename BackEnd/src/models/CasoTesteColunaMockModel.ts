  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'CasoTesteColunaMock',timestamps: false})
export class CasoTesteColunaMock extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    casoTesteColunaMockId !: number;

    @Column(DataType.INTEGER)
    casoTesteId !: number;

    @Column(DataType.INTEGER)
    storedProcedureDependenciaColunaId !: number;

    @Column(DataType.STRING)
    valorColunaMock!:string;

}

