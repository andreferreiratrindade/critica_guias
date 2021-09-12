  
import {Model, Table, Column,  DataType } from 'sequelize-typescript';


@Table({ tableName: 'Parametro',timestamps: false})
export class Parametro extends Model {

    @Column({type:DataType.INTEGER, 
            primaryKey:true,
            autoIncrement : true})
    
    criticaId !: number;

    @Column(DataType.STRING)
    nmeCritica !: string;

    @Column(DataType.STRING)
    desCritica!:string;

    @Column(DataType.INTEGER)
    nroCritica!:number;

}

