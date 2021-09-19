export namespace _modelsInput{

    export interface StoredProcedure{
        storedProcedureId : number | null,
        nmeStoredProcedure: string | null
    }


    export interface CasoTeste{
        casoTesteId: number | null,
        storedProcedureId :number | null,
        casoTesteSituacaoId : number | null,
        nmeCasoTeste : string | null,
        nmeEsperado : string | null
    }

    export interface StoredProcedureParametro{

        storedProcedureParametroId: number | null,
        nmeParametro: string| null
        storedProcedureId : number | null,
        parametroTipoId:null|null
    }

    export interface StoredProcedureTeste{

        nmeStoredProcedure: string | null,
        desStoredProcedure:string| null,
        nroStoredProcedure:number| null
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
        storedProcedureParametroId : number | null, 
        valorParametroExecucao : number | null,
        parametroTipoId :number | null, 
        nmeParametro : string | null
    }

    export interface StoredProcedureDependencia {
        storedProcedureDependenciaId : number | null,
        storedProcedureId : number | null, 
        nmeDependencia : string | null

    }

    export interface CasoTesteDependenciaColuna{
        storedProcedureDependenciaColunaId : number | null, 
        nmeColuna : string | null,
        casoTesteColunaMockId : number | null,
        casoTesteId : number| null
        valorColunaMock : string | null
    }

    export interface StoredProcedureCobertura{
        storedProcedureCoberturaId : number | null,
        storedProcedureId : number | null,
        totalCoberto : number| null, 
        totalEtapa: number| null, 
        coberturaHtml: string| null
    }
}
 