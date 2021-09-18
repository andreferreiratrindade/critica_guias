use Aplicacao
go

create or ALTER PROCEDURE teste_monta_dependencia_mock
AS
BEGIN
    declare @Retorno int = 0

    -- Prestador
    EXEC PlanoSaude.tSQLt.FakeTable 'dbo.Prestador';

    -- Adiciona registros na tabela fake
    insert into PlanoSaude.dbo.Prestador
        (PrestadorId,NmeRazaoSocial,EnderecoId,DtaValidade)
    select PrestadorId, NmeRazaoSocial, EnderecoId, DtaValidade
    from PlanoSaude.dbo.Prestador_Mock mock

    -- Beneficiario
    EXEC PlanoSaude.tSQLt.FakeTable 'dbo.Beneficiario';

    -- Adiciona registros na tabela fake
    insert into PlanoSaude.dbo.Beneficiario
        (BeneficiarioId, CPF, NmeBeneficiario)
    select BeneficiarioId, CPF, NmeBeneficiario
    from PlanoSaude.dbo.Beneficiario_Mock mock

    return @Retorno
END
go


