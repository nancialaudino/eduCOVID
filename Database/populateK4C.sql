insert into Categoria_Utilizador (nome_categoria) values('Admnistrador');
insert into Categoria_Utilizador (nome_categoria) values('AAD');
insert into Categoria_Utilizador (nome_categoria) values('Gestor de Conteúdos');
insert into Categoria_Utilizador (nome_categoria) values('Enfermeiro');




insert into Utilizador (nome, data_nasc, email, codigo, categoria_id, instituicao) values ('Joaquim Pires Lopes',str_to_date('1995.01.01','%Y.%m.%d'),'jpl@gmail.com',2128233,1,'');  
insert into Utilizador (nome, data_nasc, email, codigo, categoria_id, instituicao) values ('Ana Maria Fonseca',str_to_date('1997.03.03','%Y.%m.%d'),'ana@sapo.pt',147585,2,'ERPI Santa Maria');  
insert into Utilizador (nome, data_nasc, email, codigo, categoria_id, instituicao) values ('Paula Antunes',str_to_date('1996.07.06','%Y.%m.%d'),'ana@sapo.pt',27458364564,3,'');  
insert into Utilizador (nome, data_nasc, email, codigo, categoria_id, instituicao) values ('Joana Ramalho Silva',str_to_date('1984.09.23','%Y.%m.%d'),'joana@mac.com',38746576,4,''); 


insert into FormatoQuestoes (nome) values ( 'Escolha Multipla' );
insert into FormatoQuestoes (nome) values ( 'Perguntas Abertas' );


insert into Resposta (textoResposta) values ('A');
insert into Resposta (textoResposta) values ('B');
insert into Resposta (textoResposta) values ('C');
insert into Resposta (textoResposta) values ('D');
insert into Resposta (textoResposta) values ('E');


insert into Questao (nome, estado, resposta_id) values ('Qual é a opção correta 1 ?', 'Respondida',1);
insert into Questao (nome, estado, resposta_id) values ('Qual é a opção correta 2 ?', 'Não Respondida',2);
insert into Questao (nome, estado, resposta_id) values ('Qual é a opção correta 3 ?', 'Respondida',3);



insert into Quiz (nome, estado, formato_id,questao_id) values ('Quiz 1','Concluido',1,1);
insert into Quiz (nome, estado, formato_id,questao_id) values ('Quiz 2','Não iniciado',1,2);
insert into Quiz (nome, estado, formato_id,questao_id) values ('Quiz 3','Concluido',1,3);

insert into Modulo (nome, estado, quiz_id) values ('Higiene e segurança','Iniciado',1);
insert into Modulo (nome, estado, quiz_id) values ('Covid 19','Concluido',2);
insert into Modulo (nome, estado, quiz_id) values ('Cuidados especiais','Não iniciado',3);

insert into AcaoFormativa (nome,estado, modulo_id, imagem) values ('Gestão do Covid19 nas ERPI','Inciada',2,'https://www.google.com/search?q=higiene+e+seguran%C3%A7a+no+trabalho+hospital&rlz=1C5CHFA_enPT935PT935&sxsrf=ALeKk01JeenCAMu9SsZ2BRnjfk0Lkh0nDg:1620229526154&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjLnPGq8bLwAhXVQhUIHb7aC-QQ_AUoAXoECAoQAw#imgrc=QmqYrEeXqGw0PM') ;
insert into AcaoFormativa (nome,estado, modulo_id, imagem) values ('Higiene e Segurança no Trabalho','Iniciada',1,'https://www.google.com/search?q=covid+19&rlz=1C5CHFA_enPT935PT935&sxsrf=ALeKk02cJDf1HF6nmSLD5-xQW0YX0o5FJw:1620229589400&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjftYXJ8bLwAhUB0BoKHbmAAe0Q_AUoAnoECEkQBA&biw=1440&bih=661&dpr=2#imgrc=iw5lRga7HKv1WM') ;
insert into AcaoFormativa (nome,estado, modulo_id,imagem) values ('Gestão do Tempo e do Stress','Concluida',3,'https://www.google.com/search?q=erpi&rlz=1C5CHFA_enPT935PT935&sxsrf=ALeKk014NSMAHx9IlUI4vnWkeujo0VUFJg:1620229462108&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjXnqyM8bLwAhVKThUIHQIVDlgQ_AUoAXoECAoQAw&cshid=1620229633683924&biw=1440&bih=661#imgrc=o7TonrOGOurDRM') ;


commit;
