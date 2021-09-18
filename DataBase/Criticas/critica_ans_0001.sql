use Aplicacao
go

create or ALTER PROCEDURE critica_ans_0001 
    @PrestadorId int,
    @MsgRetorno varchar(max) = '' output
AS
BEGIN
declare @Retorno int = 0
,   @msg varchar(max) = ''
   

    if(not exists(select 1 from PlanoSaude.dbo.Prestador where PrestadorId = @PrestadorId))begin 

        set @msg = 'Prestador não encontrado'
        set @Retorno = 1

    end 

    set @MsgRetorno = @msg

    return @Retorno

END
GO

