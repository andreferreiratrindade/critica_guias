  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'Critica',timestamps: false})
export class Critica extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    idCritica !: number;

    @Column(DataType.STRING)
    nmeCritica !: string;

    @Column(DataType.STRING)
    desCritica!:string;

    @Column(DataType.INTEGER)
    nroCritica!:number;

}

