

-- create database PlanoSaude
-- go 
drop table if exists TesteConfiguracaoMock
drop table if exists TesteConfiguracaoColunaMock
drop table if exists CasoTesteMock
drop table if exists CasoTesteColunaMock
drop table if exists CasoTeste
drop table if exists CasoTesteParametroExecucao
drop table if exists Teste

drop table if exists CriticaParametro
drop table if exists Critica
drop table if exists ParametroTipo
drop table if exists Item
drop table if exists Guia
drop table if exists Prestador
drop table if exists BeneficiarioEndereco
drop table if exists Endereco
drop table if exists Beneficiario




use PlanoSaude
go

create table Beneficiario(
    BeneficiarioId int identity(1,1) primary key ,
    NmeBeneficiario varchar(250) not null, 
    CPF numeric(11,0) not null
)


create table Endereco(
    EnderecoId int  identity(1,1) primary key ,
    NmeLogradouro varchar(250) not null, 
    NroCEP int not null, 
    NmeCidade varchar(500) not null, 
    NmeUf char(2) not null

)

create table BeneficiarioEndereco(
    BeneficiarioEnderecoId int identity(1,1) primary key ,
    BeneficiarioId int not null, 
    EnderecoId int   not null,

    CONSTRAINT FK_Beneficiario_Endereco_Beneficiario FOREIGN KEY (BeneficiarioId)
    REFERENCES Beneficiario(BeneficiarioId),

    CONSTRAINT FK_Beneficiario_Endereco_Endereco FOREIGN KEY (EnderecoId)
    REFERENCES Endereco(EnderecoId)
)

create table PlanoSaude.dbo.Prestador(
    PrestadorId  int identity(1,1) primary key ,
    NmeRazaoSocial varchar(500) not null, 
    EnderecoId int not null,
    DtaValidade smalldatetime not null,

    CONSTRAINT FK_Prestador_Endereco FOREIGN KEY (EnderecoId)
    REFERENCES Endereco(EnderecoId)
)


create table Guia(
    GuiaId int identity(1,1) primary key,  
    BeneficiarioId int not null,  
    PrestadorId int not null,  
    DtaEntrada smalldatetime not  null, 

    CONSTRAINT FK_Prestador FOREIGN KEY (PrestadorId)
    REFERENCES Prestador(PrestadorId),

    CONSTRAINT FK_Beneficiario FOREIGN KEY (BeneficiarioId)
    REFERENCES Beneficiario(BeneficiarioId),

);

create table Item(
    ItemId int identity(1,1) primary key,  
    GuiaId int not null,  
    VlrItem decimal(15,2) not null, 
    NroServico int not null,

    CONSTRAINT FK_Guia FOREIGN KEY (GuiaId)
    REFERENCES Guia(GuiaId),
);


create table ParametroTipo(
    ParametroTipoId  int  primary key, 
    NmeParametroTipo varchar(10) not null

)

create table Critica(
    CriticaId int identity(1,1) primary key, 
    NmeCritica varchar(500) not null, 
    DesCritica text not null, 
    NroCritica int not null, 
    NmeStoredProcedure varchar(max) not null
);


create table CriticaParametro(
    CriticaParametroId int identity(1,1) primary key, 
    CriticaId int not null,
    ParametroTipoId int not null,
    NmeParametro varchar(250) not null, 
    
    CONSTRAINT FK_Critica FOREIGN KEY (CriticaId)
    REFERENCES Critica(CriticaId),

    CONSTRAINT FK_ParametroTipo FOREIGN KEY (ParametroTipoId)
    REFERENCES ParametroTipo(ParametroTipoId)
)

create table Teste(
    TesteId int identity(1,1) primary key, 
    CriticaId int not null,
    CONSTRAINT FK_Teste_Critica FOREIGN KEY (CriticaId)
    REFERENCES Critica(CriticaId),

)

create table TesteConfiguracaoMock(
    TesteConfiguracaoMockId int identity(1,1) primary key,  
    TesteId int not null,
    NmeTabela varchar(500) not null,

    CONSTRAINT FK_Teste_TesteConfiguracaoMock FOREIGN KEY (TesteId)
    REFERENCES Teste(TesteId),

)

create table TesteConfiguracaoColunaMock(
    TesteConfiguracaoColunaMockId int identity(1,1) primary key, 
    TesteConfiguracaoMockId  int not null,
    NmeColuna varchar(500) not null,
    ParametroTipo int not null,

    CONSTRAINT FK_TesteConfiguracaoMock_TesteConfiguracaoColunaMock FOREIGN KEY (TesteConfiguracaoMockId)
    REFERENCES TesteConfiguracaoMock(TesteConfiguracaoMockId),

)

create table CasoTesteMock(
    CasoTesteMockId int identity(1,1) primary key, 
    TesteConfiguracaoMockId int not null,

    CONSTRAINT FK_TesteConfiguracaoMock_CasoTesteMock FOREIGN KEY (TesteConfiguracaoMockId)
    REFERENCES TesteConfiguracaoMock(TesteConfiguracaoMockId)
)

create table CasoTesteColunaMock(
    CasoTesteColunaMockId int identity(1,1) primary key, 

    CasoTesteMockId int not null, 
    TesteConfiguracaoColunaMockId int not null,

  CONSTRAINT FK_TesteConfiguracaoColunaMock_CasoTesteColunaMock FOREIGN KEY (TesteConfiguracaoColunaMockId)
    REFERENCES TesteConfiguracaoColunaMock(TesteConfiguracaoColunaMockId)
)

create table CasoTeste(
    CasoTesteId int identity(1,1) primary key, 
    TesteId int not null,
    NmeCasoTeste varchar(250) not null, 
    NmeEsperado varchar(500), 
   
    CONSTRAINT FK_Teste_CasoTeste FOREIGN KEY (TesteId)
    REFERENCES Teste(TesteId)
)

create table CasoTesteParametroExecucao(

    CasoTesteParametroExecucaoId int identity(1,1) primary key, 
    CasoTesteId int not null, 
    CriticaParametroId int not null,
    ValorParametroExecucao varchar(500),

        CONSTRAINT FK_CasoTeste FOREIGN KEY (CasoTesteId)
    REFERENCES CasoTeste(CasoTesteId)
)


insert into Beneficiario_Mock values(1,'André', 09891023605)
insert into Beneficiario_Mock values(2,'Gustavo', 09891023605)
insert into Beneficiario_Mock values(3,'Taís', 09891023605)


insert into Prestador_Mock values(1, 'Prestador 1', 1, '20210909')
insert into Prestador_Mock values(2, 'Prestador 2', 2, '20210909')


insert into Critica values('0001 - Prestador não encontrado', 'Valida se contem prestador na base de dados', 1,'critica_ans_0001')
insert into Critica values('0002 - Beneficiario não encontrado', 'Valida se contem beneficiário na base de dados', 2,'critica_ans_0002')

insert into ParametroTipo values(1, 'int')
insert into ParametroTipo values(2, 'varchar')
insert into ParametroTipo values(3, 'char')
insert into ParametroTipo values(4, 'decimal')