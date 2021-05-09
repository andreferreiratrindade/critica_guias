create database CriticaGuia;

use CriticaGuia;


create table Critica(

    IdCritica int auto_increment primary key, 
    NmeCritica varchar(500) not null, 
    DesCritica text not null, 
    NroCritica int not null, 
    DtaInclusao TIMESTAMP  default current_timestamp
);


create table TipoParametro(

    IdTipoParametro tinyint primary key not null, 
    NmeTipoParametro varchar(100) not null
);




create table Parametro(
    IdParametro int auto_increment primary key,  
    NmeParametro varchar(50) not null, 
    IdTipoParametro tinyint not null, 
    DesCorParametro varchar(50) not null,
    FOREIGN KEY (IdTipoParametro)
    REFERENCES TipoParametro (IdTipoParametro)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table TipoParametroConsulta(
	IdTipoParametroConsulta tinyint not null primary key, 
    NmeTipoParametroConsulta varchar(50) not null
);




create table ParametroConsulta(
    IdParametroConsulta int auto_increment primary key, 
    IdParametro int not null, 
    IdTipoParametroConsulta tinyint not null, -- Caso parametro esteja relacionado ao beneficiário, prestador, conveniada
    TxtSelect   text not null, 
    TxtFrom     text not null, 
    TxtWhere    text null, 
    DtaInclusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdParametro)
    REFERENCES Parametro (IdParametro)
    ON UPDATE RESTRICT ON DELETE CASCADE,
    
	FOREIGN KEY (IdTipoParametroConsulta)
    REFERENCES TipoParametroConsulta (IdTipoParametroConsulta)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table ParametroGeral(
    IdParametroGeral int auto_increment primary key, 
    IdParametro int not null, 
    TxtParametroGeral varchar(500) not null,
    DtaInclusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdParametro)
    REFERENCES Parametro (IdParametro)
    ON UPDATE RESTRICT ON DELETE CASCADE
);



create table CriticaParametro(

    IdCriticaParametro int auto_increment primary key,
    IdCritica int not null, 
    IdParametro int not null, 
    SeqCriticaParametro int not null, 
    DtaInclusao TIMESTAMP  default current_timestamp,

    FOREIGN KEY (IdParametro)
    REFERENCES Parametro (IdParametro)
    ON UPDATE RESTRICT ON DELETE CASCADE,

    FOREIGN KEY (IdCritica)
    REFERENCES Critica (IdCritica)
    ON UPDATE RESTRICT ON DELETE CASCADE
);


create table Beneficiario(
    IdBeneficiario int auto_increment primary key,  
    NmeBeneficiario varchar(100) not null, 
    DtaNascimento TIMESTAMP not null,
    DtaInicioValidade TIMESTAMP not null, 
    DtaFimValidade TIMESTAMP
);

create table Prestador(
    IdPrestador int auto_increment primary key,  
    NmeRazaoSocial varchar(500) not null, 
    NroCNPJ int not null
);

create table Guia(
    IdGuia int auto_increment primary key,  
    IdBeneficiario int not null,  
    IdPrestador int not null,  

    DtaEntrada TIMESTAMP not  null, 

    FOREIGN KEY (IdPrestador)
    REFERENCES Prestador (IdPrestador)
    ON UPDATE RESTRICT ON DELETE CASCADE,

    FOREIGN KEY (IdBeneficiario)
    REFERENCES Beneficiario (IdBeneficiario)
    ON UPDATE RESTRICT ON DELETE CASCADE
);

create table Item(
    IdItem int auto_increment primary key,  
    IdGuia int not null,  
    VlrItem decimal(15,2) not null, 
    NroServico int not null,

    FOREIGN KEY (IdGuia)
    REFERENCES Guia (IdGuia)
    ON UPDATE RESTRICT ON DELETE CASCADE

);

insert into TipoParametroConsulta values(1, 'Beneficiário');
insert into TipoParametroConsulta values(2, 'Prestador');

insert into TipoParametro values(1, 'Operadores Lógicos / Recursos do sistema');
insert into TipoParametro values(2, 'Consulta');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`) VALUES ( '(', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'(');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES (')', 1, 'purple-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),')');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('e', 1, 'red-5' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'&&');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('ou', 1, 'deep-purple-5' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'||');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`) VALUES ('maior que', 1, 'indigo-5' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'>');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('maior ou igual que', 1, 'blue-5' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'>=');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`) VALUES ('menor', 1, 'light-blue-3' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'<');

INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('menor ou igual que', 1, 'cyan-5' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'<=');


INSERT INTO `criticaguia`.`parametro` (`NmeParametro`, `IdTipoParametro`, `DesCorParametro`)  VALUES ('data atual', 1, 'green-5' );
INSERT INTO `criticaguia`.`parametrogeral` (`IdParametro`, `TxtParametroGeral`) VALUES(LAST_INSERT_ID(),'now()');

