use Aplicacao
go

EXEC tSQLt.NewTestClass 'test_critica_ans_0002';
GO

create or ALTER PROCEDURE test_critica_ans_0002 
AS
BEGIN
declare @Retorno int = 0
,   @CriticaId int = 2
,   @TesteId int = 0
,   @NmeEsperado varchar(500)
,   @CasoTesteId int 
,   @NmeStoredProcedure varchar(500)
,   @query nvarchar(max) = 'aplicacao.dbo.'
,   @atual varchar(max) = ''
    select top 1 @TesteId = Teste.TesteId
    ,  @NmeStoredProcedure =  critica.NmeStoredProcedure
    from PlanoSaude.dbo.Teste Teste
        inner join PlanoSaude.dbo.Critica critica
            on critica.CriticaId = Teste.CriticaId
    where Teste.CriticaId = @CriticaId

    set @query = @query + @NmeStoredProcedure

    select casoTeste.NmeEsperado
    ,   casoTeste.CasoTesteId
    into #CasoTeste 
    from PlanoSaude.dbo.Teste Teste
        inner join PlanoSaude.dbo.CasoTeste casoTeste   
            on casoTeste.TesteId = Teste.TesteId
        inner join PlanoSaude.dbo.Critica critica
            on critica.CriticaId = Teste.CriticaId
    where Teste.CriticaId = @CriticaId


    while(exists(select 1 from #CasoTeste))begin 

        select top 1  @NmeEsperado = NmeEsperado
        ,   @CasoTesteId = CasoTesteId
        from #CasoTeste

        delete from  #CasoTeste
        where @CasoTesteId = CasoTesteId

        begin TRY

            begin transaction

            EXEC PlanoSaude.tSQLt.FakeTable 'dbo.Beneficiario'

            exec(@query)     

            ROLLBACK
        end TRY
        begin CATCH
            ROLLBACK
        end catch 
    end 

END
GO
