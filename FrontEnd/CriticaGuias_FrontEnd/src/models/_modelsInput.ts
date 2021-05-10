export namespace _modelsInput{

    export interface Critica{

        nmeCritica: string | null,
        desCritica:string| null,
        nroCritica:number| null
    }


    export interface CrticaParametro{

        idParametro: number | null,
        seqCriticaParametro:number| null,
        idCritica : number | null,
        idCriticaParametro : number| null
    }

    export interface CriticaTeste{

        nmeCritica: string | null,
        desCritica:string| null,
        nroCritica:number| null
    }

    

}
 