use bd_livrariaonline;

DESCRIBE compras;
SHOW CREATE TABLE compras;

ALTER TABLE compras
DROP FOREIGN KEY compras_ibfk_1;

ALTER TABLE compras
DROP FOREIGN KEY compras_ibfk_2;

ALTER TABLE livros 
ADD CONSTRAINT livros_ibfk_1
FOREIGN KEY (id_editora)
REFERENCES editoras(id_editora)
ON DELETE CASCADE
ON UPDATE CASCADE; 

ALTER TABLE livros 
ADD CONSTRAINT livros_ibfk_2
FOREIGN KEY (id_categoria)
REFERENCES editoras(id_categoria)
ON DELETE CASCADE
ON UPDATE CASCADE; 