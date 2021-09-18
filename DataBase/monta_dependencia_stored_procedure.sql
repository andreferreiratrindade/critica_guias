use Aplicacao
go

create or ALTER PROCEDURE monta_dependencia_stored_procedure
  @StoredProcedureId int

AS
BEGIN
  declare @Retorno int = 0
,   @nmeStoredProcedure varchar(500)
,   @StoredProcedureDependenciaTipoId_TABELA tinyint = 2
,   @StoredProcedureDependenciaTipoId_PROCEDURE tinyint = 1
,    @ParametroTipo_VARCHAR TINYINT = 2
  insert into Teste.dbo.StoredProcedureDependencia
  SELECT
    StoredProcedureId = StoredProcedureId,
    NmeDependencia = 
      COALESCE(d.referenced_server_name   + N'.', N'')
    + COALESCE(d.referenced_database_name + N'.', N'')
    + d.referenced_schema_name + N'.'
    + d.referenced_entity_name,
    StoredProcedureDependenciaTipoId = iif(d.referenced_database_name = 'aplicacao', 1, 2)
  FROM sys.sql_expression_dependencies AS d
    inner join Teste.dbo.StoredProcedure storedProcedure
    on  OBJECT_ID(storedProcedure.NmeStoredProcedure) = d.referencing_id
  where storedProcedure.StoredProcedureId = @StoredProcedureId

  select @nmeStoredProcedure = NmeStoredProcedure
  from Teste.dbo.StoredProcedure storedProcedure
  where StoredProcedureId = @StoredProcedureId



  insert into Teste.dbo.StoredProcedureDependenciaParametro
  SELECT
    StoredProcedureDependenciaId = StoredProcedureDependencia.StoredProcedureDependenciaId ,
    NmeDependenciaParametro = referencedEntities.referenced_minor_name,
    ParametroTipoId = @ParametroTipo_VARCHAR
  FROM sys.dm_sql_referenced_entities ('dbo.' + @nmeStoredProcedure, 'OBJECT') referencedEntities
    inner join Teste.dbo.StoredProcedureDependencia StoredProcedureDependencia
    on StoredProcedureDependencia.NmeDependencia  =  referencedEntities.referenced_database_name + '.' + referencedEntities.referenced_schema_name + '.' + referencedEntities.referenced_entity_name


  where StoredProcedureDependencia.StoredProcedureId = @StoredProcedureId
    and referencedEntities.referenced_minor_name is not null
    and StoredProcedureDependencia.StoredProcedureDependenciaTipoId = @StoredProcedureDependenciaTipoId_TABELA


  insert into Teste.dbo.StoredProcedureDependenciaParametro
  select StoredProcedureDependenciaId = StoredProcedureDependencia.StoredProcedureDependenciaId
    , NmeDependencia = parametro.name
    , ParametroTipoId = parametroTipo.ParametroTipoId
  from teste.dbo.StoredProcedureDependencia StoredProcedureDependencia
    inner join sys.parameters parametro
    on  object_id = object_id( PARSENAME(StoredProcedureDependencia.NmeDependencia,1))
    inner join Teste.dbo.ParametroTipo parametroTipo
    on ParametroTipo.NmeParametroTipo = type_name(parametro.user_type_id)

  where parametro.is_output = 0
    and @storedProcedureId = StoredProcedureDependencia.storedProcedureId

  return @Retorno

END
GO

