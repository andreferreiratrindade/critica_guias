DECLARE @procid int = OBJECT_ID(N'dbo.critica_ans_0001');

;WITH src AS 
(
  SELECT name = 
      COALESCE(d.referenced_server_name   + N'.', N'')
    + COALESCE(d.referenced_database_name + N'.', N'')
    + d.referenced_schema_name + N'.'
    + d.referenced_entity_name
  FROM sys.sql_expression_dependencies AS d
  WHERE d.referencing_id = @procid
)
SELECT name FROM src GROUP BY name;