import { sequelize } from "../instances/sequelize";

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
      { type: 'SELECT' });
  }

  static async RecuperaListagemParametroStoredProcedure(storedProcedureId: number) {
    return await sequelize.query(
      `SELECT parametro.idParametro
      , parametro.nmeParametro
      ,  tipoParametro.nmeTipoParametro
      , storedProcedureParametro.storedProcedureIdParametro
      , storedProcedureParametro.seqStoredProcedureParametro
      , parametro.desCorParametro
      FROM parametro parametro
      inner join tipoParametro tipoParametro
        on tipoParametro.IdTipoParametro = parametro.IdTipoParametro
      inner join StoredProcedureParametro storedProcedureParametro
		on storedProcedureParametro.IdParametro = parametro.IdParametro
	where storedProcedureParametro.storedProcedureId = :storedProcedureId
  order by storedProcedureParametro.seqStoredProcedureParametro`,
      { replacements: { storedProcedureId: storedProcedureId }, type: 'SELECT' });

  }

  static async RecuperaListagemCasoTeste(storedProcedureId: number) {
    return await sequelize.query(`
    select CasoTeste.casoTesteId,
    CasoTeste.nmeCasoTeste,
     CasoTesteSituacao.nmeCasoTesteSituacao, 
     CasoTeste.nmeEsperado, 
     CasoTeste.nmeAtual
    from PlanoSaude.dbo.CasoTeste CasoTeste
    inner join PlanoSaude.dbo.CasoTesteSituacao CasoTesteSituacao
    on CasoTesteSituacao.CasoTesteSituacaoId = CasoTeste.CasoTesteSituacaoId
    where CasoTeste.storedProcedureId = :storedProcedureId
    order by CasoTeste.CasoTesteId
    `,
      { replacements: { storedProcedureId: storedProcedureId }, type: 'SELECT' });
  }

  static async RecuperaListagemStoredProcedure() {
    return await sequelize.query(`
    select critica.storedProcedureId, critica.nmeStoredProcedure, critica.desStoredProcedure, critica.nroStoredProcedure, critica.nmeStoredProcedure
     from PlanoSaude.dbo.StoredProcedure critica
    `,
      { type: 'SELECT' });
  }

  static async RecuperaPrestadoresMock() {
    return await sequelize.query(`
    SELECT [prestadorId]
    ,[nmeRazaoSocial]
    ,[enderecoId]
    ,[dtaValidade]
    FROM [PlanoSaude].[dbo].[Prestador_Mock]
    `,
      { type: 'SELECT' });
  }

  static async RecuperaBeneficiariosMock() {
    return await sequelize.query(`
    SELECT  [beneficiarioId]
    ,[nmeBeneficiario]
    ,[cpf]
    FROM [PlanoSaude].[dbo].[Beneficiario_Mock]
    `,
      { type: 'SELECT' });
  }



  static async RecuperaListagemCasoTesteParametroExecucaoPorCasoTeste(casoTesteId: number) {
    return await sequelize.query(`
    select StoredProcedureParametro.storedProcedureParametroId
, StoredProcedureParametro.storedProcedureId
, StoredProcedureParametro.nmeParametro 
, casoTesteId = :casoTesteId
, CasoTesteParametroExecucao.casoTesteParametroExecucaoId
, CasoTesteParametroExecucao.valorParametroExecucao
from PlanoSaude.dbo.StoredProcedureParametro StoredProcedureParametro
inner join PlanoSaude.dbo.CasoTeste casoteste
    on casoteste.storedProcedureId = StoredProcedureParametro.storedProcedureId
left join PlanoSaude.dbo.CasoTesteParametroExecucao CasoTesteParametroExecucao
    on casoteste.CasoTesteId = CasoTesteParametroExecucao.CasoTesteId
    and CasoTesteParametroExecucao.StoredProcedureParametroId = StoredProcedureParametro.StoredProcedureParametroId
    where casoteste.casoTesteId = :casoTesteId
    `,
      { replacements: { casoTesteId: casoTesteId }, type: 'SELECT' });
  }

  static async RecuperaListagemCasoTesteParametroExecucaoPorStoredProcedure(storedProcedureId: number) {
    return await sequelize.query(`

    select StoredProcedureParametro.storedProcedureParametroId
    , StoredProcedureParametro.storedProcedureId
    , StoredProcedureParametro.nmeParametro 
    
    from PlanoSaude.dbo.StoredProcedureParametro StoredProcedureParametro
    
        where StoredProcedureParametro.storedProcedureId = :storedProcedureId
    `,
      { replacements: { storedProcedureId: storedProcedureId }, type: 'SELECT' });
  }

  static async RecuperaListagemStoredProcedureDependencia(storedProcedureId: number) {
    return await sequelize.query(`

    select StoredProcedureDependencia.storedProcedureDependenciaId
    , StoredProcedureDependencia.nmeDependencia 
    
    from PlanoSaude.dbo.StoredProcedureDependencia StoredProcedureDependencia
    
        where StoredProcedureDependencia.storedProcedureId = :storedProcedureId
    `,
      { replacements: { storedProcedureId: storedProcedureId }, type: 'SELECT' });
  }

  static async RecuperaListagemCasoTesteColunaMock(storedProcedureDependenciaId: number, casoTesteId: number) {

    console.log(storedProcedureDependenciaId)
    console.log(casoTesteId)
    return await sequelize.query(`

    select StoredProcedureDependenciaColuna.storedProcedureDependenciaColunaId, 
    StoredProcedureDependenciaColuna.nmeColuna,
    casoTesteColunaMockId = casoTesteColunaMock.casoTesteColunaMockId ,
    casoTesteId = casoTesteColunaMock.casoTesteId,
    valorColunaMock = casoTesteColunaMock.valorColunaMock
    
    from PlanoSaude.dbo.StoredProcedureDependenciaColuna StoredProcedureDependenciaColuna
        left join PlanoSaude.dbo.CasoTesteColunaMock casoTesteColunaMock
            on casoTesteColunaMock.StoredProcedureDependenciaColunaId = StoredProcedureDependenciaColuna.StoredProcedureDependenciaColunaId
            and casoTesteColunaMock.CasoTesteId = :casoTesteId
        where StoredProcedureDependenciaColuna.storedProcedureDependenciaId = :storedProcedureDependenciaId
    `,
      { replacements: { storedProcedureDependenciaId: storedProcedureDependenciaId, casoTesteId: casoTesteId }, type: 'SELECT' });
  }


  static async ExecuteGerarCasoTeste(casoTesteId: number) {
    return await sequelize.query(`
execute aplicacao.dbo.Run_Teste_Por_CasoTeste @casoTesteId = :casoTesteId
    `,
      { replacements: { casoTesteId: casoTesteId } });
  }

  static async ExecutaMonta_parametro_critica(storedProcedureId: number) {
    return await sequelize.query(`
execute aplicacao.dbo.run_teste_por_critica @storedProcedureId = :storedProcedureId
    `,
      { replacements: { storedProcedureId: storedProcedureId } });
  }




}