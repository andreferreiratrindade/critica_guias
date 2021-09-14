use Aplicacao
go

create or ALTER PROCEDURE critica_ans_0002 
    @BeneficiarioId int,
    @MsgRetorno varchar(max) = '' output
AS
BEGIN
declare @Retorno int = 0
    if(not exists(select 1 
                 from PlanoSaude.dbo.Beneficiario 
                 where BeneficiarioId = @BeneficiarioId))begin 

        set @MsgRetorno = 'Beneficiario não encontrado'
        set @Retorno = 1

    end 

    return @Retorno

END
GO
