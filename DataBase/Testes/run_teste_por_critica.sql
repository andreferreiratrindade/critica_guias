use Aplicacao
go


create or ALTER PROCEDURE run_teste_por_critica
    @criticaId int
AS
BEGIN
    declare @Retorno int = 0
,   @NmeEsperado varchar(500)
,   @CasoTesteId int 
,   @NmeStoredProcedure varchar(500)
,   @query nvarchar(max) = 'aplicacao.dbo.'
,   @atual varchar(max) = ''
,   @NmeCriticaTeste varchar(500) = 'teste_'
,   @CasoTesteSituacao_Aguardando smallint = 1
,   @CasoTesteSituacao_Processando smallint = 2

    drop table if exists #CasoTeste

    select casoTeste.CasoTesteId
    , query =  'aplicacao.dbo.teste_' + critica.NmeStoredProcedure
    into #CasoTeste
    from PlanoSaude.dbo.CasoTeste casoTeste
        inner join PlanoSaude.dbo.Critica critica
        on critica.criticaId = casoTeste.criticaId
    where casoTeste.criticaId = @criticaId

    while(exists(select 1
    from #CasoTeste))begin
        select top 1
            @CasoTesteId    = CasoTesteId
    , @query = query + ' ' + cast(CasoTesteId as varchar)
        from #CasoTeste

        delete from  #CasoTeste
    where @CasoTesteId = CasoTesteId

        execute aplicacao.dbo.run_Teste_Por_CasoTeste
        @casoTesteId = @casoTesteId

    end
END
GO

