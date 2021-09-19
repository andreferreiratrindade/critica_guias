import { sequelize } from '../instances/sequelize'

export class RepositoryQuery {
  static async RecuperaListagemParametros() {
    return await sequelize.query(
      `SELECT parametro.idParametro
      , parametro.nmeParametro
      ,  tipoParametro.nmeTipoParametro
      , parametro.desCorParametro
      FROM parametro parametro
      inner join tipoParametro tipoParametro
        on tipoParametro.IdTipoParametro = parametro.IdTipoParametro`,
      { type: 'SELECT' },
    )
  }

  static async RecuperaListagemParametroStoredProcedure(
    storedProcedureId: number,
  ) {
    return await sequelize.query(
      ` select storedProcedureParametro.parametroTipoId
      ,   storedProcedureParametro.nmeParametro
      FROM  teste.dbo.StoredProcedureParametro storedProcedureParametro
       
      inner join  teste.dbo.ParametroTipo parametroTipo
      
      on storedProcedureParametro.ParametroTipoId = parametroTipo.ParametroTipoId
        
    where storedProcedureParametro.storedProcedureId = :storedProcedureId
  order by storedProcedureParametro.seqStoredProcedureParametro`,
      {
        replacements: { storedProcedureId: storedProcedureId },
        type: 'SELECT',
      },
    )
  }

  static async RecuperaListagemCasoTeste(storedProcedureId: number) {
    return await sequelize.query(
      `
    select CasoTeste.casoTesteId,
    CasoTeste.nmeCasoTeste,
     CasoTesteSituacao.nmeCasoTesteSituacao, 
     CasoTeste.nmeEsperado, 
     CasoTeste.nmeAtual
    from Teste.dbo.CasoTeste CasoTeste
    inner join Teste.dbo.CasoTesteSituacao CasoTesteSituacao
    on CasoTesteSituacao.CasoTesteSituacaoId = CasoTeste.CasoTesteSituacaoId
    where CasoTeste.storedProcedureId = :storedProcedureId
    order by CasoTeste.CasoTesteId
    `,
      {
        replacements: { storedProcedureId: storedProcedureId },
        type: 'SELECT',
      },
    )
  }

  static async RecuperaListagemStoredProcedure() {
    return await sequelize.query(
      `
    select storedProcedure.storedProcedureId, storedProcedure.nmeStoredProcedure
     from teste.dbo.StoredProcedure storedProcedure
    `,
      { type: 'SELECT' },
    )
  }

  static async RecuperaPrestadoresMock() {
    return await sequelize.query(
      `
    SELECT [prestadorId]
    ,[nmeRazaoSocial]
    ,[enderecoId]
    ,[dtaValidade]
    FROM [PlanoSaude].[dbo].[Prestador_Mock]
    `,
      { type: 'SELECT' },
    )
  }

  static async RecuperaBeneficiariosMock() {
    return await sequelize.query(
      `
    SELECT  [beneficiarioId]
    ,[nmeBeneficiario]
    ,[cpf]
    FROM [PlanoSaude].[dbo].[Beneficiario_Mock]
    `,
      { type: 'SELECT' },
    )
  }

  static async RecuperaListagemCasoTesteParametroExecucaoPorCasoTeste(
    casoTesteId: number,
  ) {
    return await sequelize.query(
      `
    select StoredProcedureParametro.storedProcedureParametroId
, StoredProcedureParametro.storedProcedureId
, StoredProcedureParametro.nmeParametro 
, casoTesteId =  casoteste.casoTesteId
, CasoTesteParametroExecucao.casoTesteParametroExecucaoId
, CasoTesteParametroExecucao.valorParametroExecucao
from Teste.dbo.StoredProcedureParametro StoredProcedureParametro
inner join Teste.dbo.CasoTeste casoteste
    on casoteste.storedProcedureId = StoredProcedureParametro.storedProcedureId
left join Teste.dbo.CasoTesteParametroExecucao CasoTesteParametroExecucao
    on casoteste.CasoTesteId = CasoTesteParametroExecucao.CasoTesteId
    and CasoTesteParametroExecucao.StoredProcedureParametroId = StoredProcedureParametro.StoredProcedureParametroId
    where casoteste.casoTesteId = :casoTesteId
    `,
      { replacements: { casoTesteId: casoTesteId }, type: 'SELECT' },
    )
  }

  static async RecuperaListagemCasoTesteParametroExecucaoPorStoredProcedure(
    storedProcedureId: number,
  ) {
    return await sequelize.query(
      `

    select StoredProcedureParametro.storedProcedureParametroId
    , StoredProcedureParametro.storedProcedureId
    , StoredProcedureParametro.nmeParametro 
    
    from Teste.dbo.StoredProcedureParametro StoredProcedureParametro
    
        where StoredProcedureParametro.storedProcedureId = :storedProcedureId
    `,
      {
        replacements: { storedProcedureId: storedProcedureId },
        type: 'SELECT',
      },
    )
  }

  static async RecuperaListagemStoredProcedureDependencia(
    storedProcedureId: number,
  ) {
    return await sequelize.query(
      `

    select StoredProcedureDependencia.storedProcedureDependenciaId
    , StoredProcedureDependencia.nmeDependencia 
    
    from Teste.dbo.StoredProcedureDependencia StoredProcedureDependencia
    
        where StoredProcedureDependencia.storedProcedureId = :storedProcedureId
    `,
      {
        replacements: { storedProcedureId: storedProcedureId },
        type: 'SELECT',
      },
    )
  }

  static async RecuperaListagemCasoTesteColunaMock(
    storedProcedureDependenciaId: number,
    casoTesteId: number,
  ) {
    console.log(storedProcedureDependenciaId)
    console.log(casoTesteId)
    return await sequelize.query(
      `

    select StoredProcedureDependenciaParametro.StoredProcedureDependenciaParametroId, 
    StoredProcedureDependenciaParametro.nmeDependenciaParametro,
    casoTesteColunaMockId = casoTesteColunaMock.casoTesteColunaMockId ,
    casoTesteId = casoTesteColunaMock.casoTesteId,
    valorColunaMock = casoTesteColunaMock.valorColunaMock
    
    from Teste.dbo.StoredProcedureDependenciaParametro StoredProcedureDependenciaParametro
        left join Teste.dbo.CasoTesteColunaMock casoTesteColunaMock
            on casoTesteColunaMock.StoredProcedureDependenciaParametroId = StoredProcedureDependenciaParametro.StoredProcedureDependenciaParametroId
            and casoTesteColunaMock.CasoTesteId = :casoTesteId
        where StoredProcedureDependenciaParametro.storedProcedureDependenciaId = :storedProcedureDependenciaId
    `,
      {
        replacements: {
          storedProcedureDependenciaId: storedProcedureDependenciaId,
          casoTesteId: casoTesteId,
        },
        type: 'SELECT',
      },
    )
  }

  static async ExecuteGerarCasoTeste(casoTesteId: number) {
    return await sequelize.query(
      `
execute aplicacao.dbo.Run_Teste_Por_CasoTeste @casoTesteId = :casoTesteId
    `,
      { replacements: { casoTesteId: casoTesteId } },
    )
  }

  static async ExecutaMontaStoredProcedureDependencias(
    storedProcedureId: number,
  ) {
    return await sequelize.query(
      `
execute aplicacao.dbo.monta_parametro_stored_procedure @storedProcedureId = :storedProcedureId
    `,
      { replacements: { storedProcedureId: storedProcedureId } },
    )
  }

  static async RecuperaStoredProcedureCobertura(
    storedProcedureId: number,
  ) {
    return await sequelize.query(
      `
        select storedProcedureCoberturaId, 
        storedProcedureId,
        totalCoberto,
        totalEtapa,
        coberturaHtml

        from Teste.dbo.StoredProcedureCobertura
        where storedProcedureId = :storedProcedureId
    `,
      { replacements: { storedProcedureId: storedProcedureId } },
    )
  }
}
