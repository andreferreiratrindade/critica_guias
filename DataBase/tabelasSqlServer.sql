
use PlanoSaude
go

drop table if exists Item
drop table if exists Guia
drop table if exists Prestador
drop table if exists BeneficiarioEndereco
drop table if exists Endereco
drop table if exists Beneficiario
go

create table Beneficiario
(
    BeneficiarioId int identity(1,1) primary key ,
    NmeBeneficiario varchar(250) not null,
    CPF numeric(11,0) not null
)


create table Endereco
(
    EnderecoId int identity(1,1) primary key ,
    NmeLogradouro varchar(250) not null,
    NroCEP int not null,
    NmeCidade varchar(500) not null,
    NmeUf char(2) not null

)

create table BeneficiarioEndereco
(
    BeneficiarioEnderecoId int identity(1,1) primary key ,
    BeneficiarioId int not null,
    EnderecoId int not null,

    CONSTRAINT FK_Beneficiario_Endereco_Beneficiario FOREIGN KEY (BeneficiarioId)
    REFERENCES Beneficiario(BeneficiarioId),

    CONSTRAINT FK_Beneficiario_Endereco_Endereco FOREIGN KEY (EnderecoId)
    REFERENCES Endereco(EnderecoId)
)

create table PlanoSaude.dbo.Prestador
(
    PrestadorId int identity(1,1) primary key ,
    NmeRazaoSocial varchar(500) not null,
    EnderecoId int not null,
    DtaValidade smalldatetime not null,

    CONSTRAINT FK_Prestador_Endereco FOREIGN KEY (EnderecoId)
    REFERENCES Endereco(EnderecoId)
)


create table Guia
(
    GuiaId int identity(1,1) primary key,
    BeneficiarioId int not null,
    PrestadorId int not null,
    DtaEntrada smalldatetime not  null,

    CONSTRAINT FK_Prestador FOREIGN KEY (PrestadorId)
    REFERENCES Prestador(PrestadorId),

    CONSTRAINT FK_Beneficiario FOREIGN KEY (BeneficiarioId)
    REFERENCES Beneficiario(BeneficiarioId),

);

create table Item
(
    ItemId int identity(1,1) primary key,
    GuiaId int not null,
    VlrItem decimal(15,2) not null,
    NroServico int not null,

    CONSTRAINT FK_Guia FOREIGN KEY (GuiaId)
    REFERENCES Guia(GuiaId),
);


use Teste
go

drop table if exists TesteConfiguracaoMock
drop table if exists TesteConfiguracaoColunaMock
drop table if exists CasoTesteMock
drop table if exists CasoTesteColunaMock
drop table if exists CasoTeste
drop table if exists CasoTesteParametroExecucao
drop table if exists StoredProcedureDependenciaParametro
drop table if exists StoredProcedureDependencia
drop table if exists StoredProcedureParametro
drop table if exists StoredProcedure
drop table if exists ParametroTipo
drop table if exists StoredProcedureDependenciaTipo
drop table if exists CasoTesteSituacao
GO

create table CasoTesteSituacao
(
    CasoTesteSituacaoId smallint primary key,
    NmeCasoTesteSituacao varchar(250) not null

)


create table StoredProcedureDependenciaTipo
(

    StoredProcedureDependenciaTipoId tinyint primary key not null,
    NmeDependenciaTipo varchar(250) not null
)

create table ParametroTipo
(
    ParametroTipoId int primary key,
    NmeParametroTipo varchar(10) not null

)

create table StoredProcedure
(
    StoredProcedureId int identity(1,1) primary key,
    NmeStoredProcedure varchar(max) not null
);


create table StoredProcedureParametro
(
    StoredProcedureParametroId int identity(1,1) primary key,
    StoredProcedureId int not null,
    ParametroTipoId int not null,
    NmeParametro varchar(250) not null,

    CONSTRAINT FK_StoredProcedureParametro_Critica FOREIGN KEY (StoredProcedureId)
    REFERENCES StoredProcedure(StoredProcedureId),

    CONSTRAINT FK_StoredProcedureParametro_ParametroTipo FOREIGN KEY (ParametroTipoId)
    REFERENCES ParametroTipo(ParametroTipoId)
)

create table StoredProcedureDependencia
(
    StoredProcedureDependenciaId int identity(1,1) primary key,
    StoredProcedureId int not null,
    NmeDependencia varchar(500) not null,
    StoredProcedureDependenciaTipoId tinyint not null,
    CONSTRAINT FK_StoredProcedureDependencia_StoredProcedure FOREIGN KEY (StoredProcedureId)
    REFERENCES StoredProcedure(StoredProcedureId),

    CONSTRAINT FK_StoredProcedureDependencia_StoredProcedureDependenciaTipo FOREIGN KEY (StoredProcedureDependenciaTipoId)
    REFERENCES StoredProcedureDependenciaTipo(StoredProcedureDependenciaTipoId)
)

create table StoredProcedureDependenciaParametro
(
    StoredProcedureDependenciaParametroId int identity(1,1) primary key,
    StoredProcedureDependenciaId int not null,
    NmeDependenciaParametro varchar(500) not null,
    ParametroTipoId int not null,

    CONSTRAINT FK_StoredProcedureDependenciaParametro_StoredProcedureDependencia FOREIGN KEY (StoredProcedureDependenciaId)
    REFERENCES StoredProcedureDependencia(StoredProcedureDependenciaId)
)




create table CasoTeste
(
    CasoTesteId int identity(1,1) primary key,
    StoredProcedureId int not null,
    CasoTesteSituacaoId smallint not null,
    NmeCasoTeste varchar(250) not null,
    NmeEsperado varchar(500),
    NmeAtual varchar(500),

    CONSTRAINT FK_CasoTeste_StoredProcedure FOREIGN KEY (StoredProcedureId)
    REFERENCES StoredProcedure(StoredProcedureId),

    CONSTRAINT FK_CasoTeste_CasoTesteSituacao FOREIGN KEY (CasoTesteSituacaoId)
    REFERENCES CasoTesteSituacao(CasoTesteSituacaoId),


)

create table CasoTesteColunaMock
(
    CasoTesteColunaMockId int identity(1,1) primary key,
    CasoTesteId int not null,
    StoredProcedureDependenciaParametroId int not null,
    ValorColunaMock varchar(500),

    CONSTRAINT FK_CasoTesteColunaMock_StoredProcedureDependenciaParametro FOREIGN KEY (StoredProcedureDependenciaParametroId)
    REFERENCES StoredProcedureDependenciaParametro(StoredProcedureDependenciaParametroId),

    CONSTRAINT FK_CasoTesteColunaMock_CasoTeste FOREIGN KEY (CasoTesteId)
    REFERENCES CasoTeste(CasoTesteId)
)

create table CasoTesteParametroExecucao
(

    CasoTesteParametroExecucaoId int identity(1,1) primary key,
    CasoTesteId int not null,
    StoredProcedureParametroId int not null,
    ValorParametroExecucao varchar(500),

    CONSTRAINT FK_CasoTesteParametroExecucao_CasoTeste FOREIGN KEY (CasoTesteId)
    REFERENCES CasoTeste(CasoTesteId),

    CONSTRAINT FK_CasoTeste_StoredProcedureParametro FOREIGN KEY (StoredProcedureParametroId)
    REFERENCES StoredProcedureParametro(StoredProcedureParametroId)

)


insert into ParametroTipo values(1, 'int')
insert into ParametroTipo values(2, 'varchar')
insert into ParametroTipo values(3, 'char')
insert into ParametroTipo values(4, 'decimal')

insert into StoredProcedureDependenciaTipo values(1, 'Stored Procedure')
insert into StoredProcedureDependenciaTipo values(2, 'Tabela')



insert  into CasoTesteSituacao values(1, 'Aguardando processamento')
insert  into CasoTesteSituacao values(2, 'Processando')
insert  into CasoTesteSituacao values(3, 'Passou')
insert  into CasoTesteSituacao values(4, 'Falhou')
insert  into CasoTesteSituacao values(5, 'Erro')
insert  into CasoTesteSituacao values(6, 'Em edição')


delete from PlanoSaude.dbo.Beneficiario_Mock
insert into PlanoSaude.dbo.Beneficiario_Mock values(100,'André', 09891023605)
insert into PlanoSaude.dbo.Beneficiario_Mock values(102,'Gustavo', 09891023605)
insert into PlanoSaude.dbo.Beneficiario_Mock values(103,'Taís', 09891023605)

delete from PlanoSaude.dbo.Prestador_Mock
insert into PlanoSaude.dbo.Prestador_Mock values(1, 'Prestador 1', 1, '20210909')
insert into PlanoSaude.dbo.Prestador_Mock values(2, 'Prestador 2', 2, '20210909')



-- Criando primeiro teste

declare  @StoredProcedureId int = 0
,   @CasoTesteId int = 0
,   @StoredProcedureDependenciaParametroId int = 0
insert into teste.dbo.StoredProcedure values('critica_ans_0001')

set @StoredProcedureId = @@IDENTITY

execute aplicacao.dbo.monta_parametro_stored_procedure @StoredProcedureId = @StoredProcedureId


insert into CasoTeste values(@StoredProcedureId, 1, 'Valida prestador', '', null)
set @CasoTesteId = @@IDENTITY



select top 1 @StoredProcedureDependenciaParametroId =  StoredProcedureDependenciaParametro.StoredProcedureDependenciaParametroId
from Teste.dbo.StoredProcedureDependenciaParametro StoredProcedureDependenciaParametro
    inner join Teste.dbo.StoredProcedureDependencia StoredProcedureDependencia 
        on StoredProcedureDependencia.StoredProcedureDependenciaId    = StoredProcedureDependenciaParametro.StoredProcedureDependenciaId
where 'PrestadorId' = StoredProcedureDependenciaParametro.NmeDependenciaParametro
and StoredProcedureDependencia.NmeDependencia = 'planosaude.dbo.prestador'

insert into CasoTesteColunaMock values(@CasoTesteId, @StoredProcedureDependenciaParametroId,'123')


insert into CasoTesteParametroExecucao values(@CasoTesteId,1, '1')


insert into teste.dbo.StoredProcedure values('critica_ans_0002')

set @StoredProcedureId = @@IDENTITY

execute aplicacao.dbo.monta_parametro_stored_procedure @StoredProcedureId = @StoredProcedureId