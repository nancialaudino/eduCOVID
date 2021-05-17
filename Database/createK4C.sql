#create database know4CARE;

#use know4CARE;



create table Categoria_Utilizador (id_categoria int not null auto_increment,
									nome_categoria varchar(20),
									primary key (id_categoria));


create table Utilizador (id_user int not null auto_increment,
					 nome varchar(40) not null, data_nasc date, email varchar(30), codigo double, categoria_id int not null,
                     instituicao varchar(40),
					 primary key (id_user));


create table FormatoQuestoes (id_formato int not null auto_increment,
					 nome varchar(40), 
					 primary key (id_formato));     


create table Resposta (id_resposta int not null auto_increment, textoResposta longtext,
					 primary key (id_resposta ));
                     
                     
create table Questao (id_questao int not null auto_increment,
					 nome varchar(40) not null, estado varchar(30), resposta_id int not null,
					 primary key (id_questao));
                     

create table Quiz (id_quiz int not null auto_increment,
					 nome varchar(40) not null, estado varchar(30), formato_id int not null,
                     questao_id int not null,
					 primary key (id_quiz));  

create table Modulo (id_modulo int not null auto_increment,
					 nome varchar(40) not null, estado varchar(30), quiz_id int not null,
					 primary key (id_modulo));

create table AcaoFormativa (id_acao int not null auto_increment,
					 nome varchar(40) not null, estado varchar(30), modulo_id int not null, imagem longtext,
					 primary key (id_acao));

create table conteudo (id_conteudo int not null auto_increment, nome varchar(100), modulo_id int not null,
					 primary key (id_conteudo) );

create table ConteudoUtilizador (id int not null auto_increment, visto varchar(10), conteudo_id int not null, utilizador_id int not null,
					 primary key(id));
					
alter table Utilizador add constraint utilizador_fk_categoria
            foreign key (categoria_id) references Categoria_Utilizador(id_categoria) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;   
            
            
alter table Questao add constraint utilizador_fk_resposta
            foreign key (resposta_id) references Resposta(id_resposta) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;  
            
            
alter table Quiz add constraint utilizador_fk_formato
            foreign key (formato_id) references FormatoQuestoes(id_formato) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;  


alter table Modulo add constraint utilizador_fk_quiz
            foreign key (quiz_id) references Quiz(id_quiz) 
			ON DELETE NO ACTION ON UPDATE NO ACTION;                
            
alter table AcaoFormativa add constraint utilizador_fk_modulo
            foreign key (modulo_id) references Modulo(id_modulo) 
			ON DELETE NO ACTION ON UPDATE NO ACTION; 

alter table Conteudo add constraint conteudo_fk_modulo
			 foreign key (modulo_id) references Modulo(id_modulo) 
			 ON DELETE NO ACTION ON UPDATE NO ACTION; 

alter table ConteudoUtilizador add constraint conteudo_fk_utilizador
			 foreign key (utilizador_id) references Utilizador(id_user) 
			 ON DELETE NO ACTION ON UPDATE NO ACTION; 

alter table ConteudoUtilizador add constraint conteudo_fk_conteudo
			 foreign key (conteudo_id) references Conteudo(id_conteudo) 
			 ON DELETE NO ACTION ON UPDATE NO ACTION;        
			
            
         