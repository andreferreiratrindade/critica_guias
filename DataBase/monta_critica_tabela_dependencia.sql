use Aplicacao
go

create or ALTER PROCEDURE monta_critica_tabela_dependencia

AS
BEGIN
  declare @Retorno int = 0
, @nmeStoredProcedure varchar(500) = null
, @CriticaId int = 0

  select critica.criticaId,
    critica.NmeStoredProcedure
  into #tmpCriticas

  from PlanoSaude.dbo.Critica critica
    left join PlanoSaude.dbo.CriticaTabelaDependencia criticaTabelaDependencia
    on critica.criticaId = criticaTabelaDependencia.criticaId
  where criticaTabelaDependencia.criticaId is null

  while(exists(select 1
  from #tmpCriticas))begin

    select top 1
      @nmeStoredProcedure =  NmeStoredProcedure
    , @CriticaId = CriticaId
    from #tmpCriticas

    delete from #tmpCriticas
  where  @CriticaId = criticaId

    DECLARE @procid int = OBJECT_ID(@nmeStoredProcedure);


    insert into PlanoSaude.dbo.CriticaTabelaDependencia
    SELECT
      criticaId = @CriticaId,
      NmeTabela = 
      COALESCE(d.referenced_server_name   + N'.', N'')
    + COALESCE(d.referenced_database_name + N'.', N'')
    + d.referenced_schema_name + N'.'
    + d.referenced_entity_name
    FROM sys.sql_expression_dependencies AS d
    WHERE d.referencing_id = @procid

    insert into PlanoSaude.dbo.CriticaTabelaDependenciaColuna

    SELECT
      criticaTabelaDependenciaId = criticaTabelaDependencia.criticaTabelaDependenciaId ,
      NmeColuna = referencedEntities.referenced_minor_name
    FROM sys.dm_sql_referenced_entities ('dbo.' + @nmeStoredProcedure, 'OBJECT') referencedEntities
      inner join PlanoSaude.dbo.CriticaTabelaDependencia criticaTabelaDependencia
      on criticaTabelaDependencia.NmeTabela =  referencedEntities.referenced_database_name + '.' + referencedEntities.referenced_schema_name + '.' + referencedEntities.referenced_entity_name
    where criticaTabelaDependencia.criticaId = @CriticaId
      and referencedEntities.referenced_minor_name is not null
  END

  return @Retorno

END
GO



