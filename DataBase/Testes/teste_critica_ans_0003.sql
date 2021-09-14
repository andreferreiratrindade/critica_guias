use Aplicacao
go

create or ALTER PROCEDURE teste_critica_ans_0003
    @CasoTesteId int
AS
BEGIN
    declare @Retorno int = 0
, @PrestadorId int = NULL
, @Atual varchar(500) = NULL
, @Parametros nvarchar(max)

    begin try

    begin transaction

    EXEC PlanoSaude.tSQLt.FakeTable 'dbo.Beneficiario';

    -- Adiciona registros na tabela fake
    insert into PlanoSaude.dbo.Beneficiario
        (BeneficiarioId, CPF, NmeBeneficiario)
    select BeneficiarioId, CPF, NmeBeneficiario
    from PlanoSaude.dbo.Beneficiario_Mock mock


    EXEC PlanoSaude.tSQLt.FakeTable 'dbo.Prestador';

    -- Adiciona registros na tabela fake
    insert into PlanoSaude.dbo.Prestador
        (PrestadorId,NmeRazaoSocial,EnderecoId,DtaValidade)
    select PrestadorId, NmeRazaoSocial, EnderecoId, DtaValidade
    from PlanoSaude.dbo.Prestador_Mock mock

    -- Executa critica
    execute aplicacao.dbo.teste_critica
    @CasoTesteId  = @CasoTesteId,
    @Atual = @Atual output

end try 

begin CATCH
    set @Atual = @Atual + '-- Erro -- ' + ERROR_MESSAGE()
end catch

    ROLLBACK

    -- 
    execute aplicacao.dbo.Gera_Resultado_CasoTeste 
    @CasoTesteId = @CasoTesteId,
    @NmeAtual = @Atual

    return @Retorno
END
go


