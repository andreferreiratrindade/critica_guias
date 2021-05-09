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

  static async RecuperaListagemParametroCritica(idCritica : number) {
    return await sequelize.query(
      `SELECT parametro.idParametro
      , parametro.nmeParametro
      ,  tipoParametro.nmeTipoParametro
      , criticaParametro.idCriticaParametro
      , criticaParametro.seqCriticaParametro
      , parametro.desCorParametro
      FROM parametro parametro
      inner join tipoParametro tipoParametro
        on tipoParametro.IdTipoParametro = parametro.IdTipoParametro
      inner join CriticaParametro criticaParametro
		on criticaParametro.IdParametro = parametro.IdParametro
	where criticaParametro.idCritica = :idCritica
  order by criticaParametro.seqCriticaParametro`,
        { replacements: { idCritica: idCritica }, type: 'SELECT' });

  }
}