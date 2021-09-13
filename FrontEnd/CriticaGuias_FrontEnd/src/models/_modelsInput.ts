export namespace _modelsInput{

    export interface Critica{
        criticaId : number | null,
        nmeCritica: string | null,
        desCritica:string| null,
        nroCritica:number| null,
        nmeStoredProcedure : string | null

    }


    export interface CasoTeste{
        casoTesteId: number | null,
        criticaId :number | null,
        casoTesteSituacaoId : number | null,
        nmeCasoTeste : string | null,
        nmeEsperado : string | null
    }

    export interface CrticaParametro{

        idParametro: number | null,
        seqCriticaParametro:number| null,
        criticaId : number | null,
        criticaIdParametro : number| null
    }

    export interface CriticaTeste{

        nmeCritica: string | null,
        desCritica:string| null,
        nroCritica:number| null
    }

    export interface BeneficiarioBuildMock{
        beneficiarioId :number | null, 
        nmeBeneficiario : string | null, 
        cpf : number| null, 

    }

    export interface PrestadorBuildMock{

        
    }

    export interface CasoTesteParametroExecucao{
        casoTesteId : number | null,
        casoTesteParametroExecucaoId : number| null,
        criticaParametroId : number | null, 
        valorParametroExecucao : number | null,
        parametroTipoId :number | null, 
        nmeParametro : string | null
    }
}
 