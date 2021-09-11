use Aplicacao
go

create or ALTER PROCEDURE teste_critica_ans_0002
    @CasoTesteId int 
AS
BEGIN
declare @Retorno int = 0

    print 'teste'
    print 'CasoTesteId = ' + cast(@CasoTesteId as varchar)

return @Retorno 

END
go

