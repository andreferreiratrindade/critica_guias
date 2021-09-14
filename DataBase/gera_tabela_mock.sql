

use PlanoSaude
go


DECLARE @CrLf NVARCHAR(2)
DECLARE @Indent NVARCHAR(2)
DECLARE @nsql NVARCHAR(MAX)
DECLARE @SimulationMode CHAR(1)
DECLARE @SourceSchemaAndTable NVARCHAR(260)
DECLARE @TargetSchemaAndTable NVARCHAR(260)
DECLARE @FkNameSuffix NVARCHAR(128)

--\
---) CONFIGURATION: set the source and target schema/tablename here, and some other settings.
--/


SELECT
    @SimulationMode = ''--'Y' -- Use Y if you only want the SQL statement in the output window without it being executed.
  , @SourceSchemaAndTable = '[dbo].[Guia]'
  , @TargetSchemaAndTable = '[dbo].[Guia_Mock2]'
  , @FkNameSuffix = '_' + REPLACE(CAST(NEWID() AS VARCHAR(40)), '-', '') -- A Guid is added to the foreign key name to make it unique.
  , @CrLf = CHAR(13) + CHAR(10)
  , @Indent = SPACE(2)


--\
---) BUILD SQL FOR CLONING TABLE
--/
SELECT @nsql
    = ISNULL(@nsql, '')
    + CASE col_sequence WHEN 1 THEN
      @CrLf + 'IF OBJECT_ID(N''' + @TargetSchemaAndTable + ''', ''U'') IS NOT NULL DROP TABLE ' + @TargetSchemaAndTable + ';'
    + @CrLf + 'CREATE TABLE ' + @TargetSchemaAndTable + @CrLf + @Indent + '( ' ELSE @CrLf + @Indent + ', ' END
    + [definition]
FROM (
      SELECT ROW_NUMBER() OVER (PARTITION BY tb.object_id ORDER BY tb.object_id, col.column_id) AS col_sequence
        , QUOTENAME(col.name) + ' '
        + COALESCE(
            'AS ' + cmp.definition + CASE ISNULL(cmp.is_persisted, 0) WHEN 1 THEN ' PERSISTED ' ELSE '' END,
            CASE
              WHEN col.system_type_id != col.user_type_id THEN QUOTENAME(usr_tp.schema_name) + '.' + QUOTENAME(usr_tp.name)
              ELSE
                QUOTENAME(sys_tp.name) +
                CASE
                  WHEN sys_tp.name IN ('char', 'varchar', 'binary', 'varbinary') THEN '(' + CONVERT(VARCHAR, CASE col.max_length WHEN -1 THEN 'max' ELSE CAST(col.max_length AS varchar(10)) END) + ')'
                  WHEN sys_tp.name IN ('nchar', 'nvarchar') THEN '(' + CONVERT(VARCHAR, CASE col.max_length WHEN -1 THEN 'max' ELSE CAST(col.max_length/2 AS varchar(10)) END) + ')'
                  WHEN sys_tp.name IN ('decimal', 'numeric') THEN '(' + CAST(col.precision AS VARCHAR) + ',' + CAST(col.scale AS VARCHAR) + ')'
                  WHEN sys_tp.name IN ('datetime2') THEN '(' + CAST(col.scale AS VARCHAR) + ')'
                  ELSE ''
                END
            END
            )
        + CASE col.is_nullable
            WHEN 0 THEN ' NOT NULL'
            ELSE CASE WHEN cmp.definition IS NULL THEN ' NULL' ELSE ' ' END
          END AS [definition]
       FROM sys.tables tb
       JOIN sys.schemas sch
         ON sch.schema_id = tb.schema_id
       JOIN sys.columns col
         ON col.object_id = tb.object_id
       JOIN sys.types sys_tp
         ON col.system_type_id = sys_tp.system_type_id
        AND col.system_type_id = sys_tp.user_type_id
       LEFT JOIN
            (
            SELECT tp.*, sch.name AS [schema_name]
            FROM sys.types tp
            JOIN sys.schemas sch
            ON tp.schema_id = sch.schema_id
            ) usr_tp
         ON col.system_type_id = usr_tp.system_type_id
        AND col.user_type_id = usr_tp.user_type_id
       LEFT JOIN sys.computed_columns cmp
         ON cmp.object_id = tb.object_id
        AND cmp.column_id = col.column_id
      WHERE tb.object_id = OBJECT_ID(@SourceSchemaAndTable, 'U')
      ) subqry
;
 
SELECT @nsql = @nsql + @CrLf + @indent + ') ' 

IF @SimulationMode = 'Y'
BEGIN
  PRINT '-- Simulation mode: script is not executed.'
END
PRINT @nsql;
IF @SimulationMode != 'Y'
BEGIN
  EXEC(@nsql);
END
 