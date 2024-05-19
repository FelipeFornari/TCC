INSERT INTO tb_user(display_name, username, password) VALUES ('Admin', 'admin', '$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_user(display_name, username, password) VALUES ('Test', 'test', '$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');

INSERT INTO tb_cities(city, uF) VALUES ('Pato Branco', 'PR');
INSERT INTO tb_entrusteds(name, phoneNumber) VALUES ('Felipe', '9999999999');
INSERT INTO tb_entrusteds(name) VALUES ('Zé');
INSERT INTO tb_convenience(description) VALUES ('Arquibancada');
INSERT INTO tb_convenience(description) VALUES ('Banheiros');
INSERT INTO tb_convenience(description) VALUES ('Bebedouros');
INSERT INTO tb_convenience(description) VALUES ('Vestiários');
INSERT INTO tb_convenience(description) VALUES ('Pontos de apoio');
INSERT INTO tb_accessibilities(type) VALUES ('Piso tátil');
INSERT INTO tb_accessibilities(type) VALUES ('Banheiro adaptado');
INSERT INTO tb_accessibilities(type) VALUES ('Rampa de acesso');
INSERT INTO tb_funcionalities(description) VALUES ('Quadra futsal');
INSERT INTO tb_funcionalities(description) VALUES ('Quadra volei');
INSERT INTO tb_funcionalities(description) VALUES ('Campo sintético');
INSERT INTO tb_funcionalities(description) VALUES ('Campo Futebol');
INSERT INTO tb_funcionalities(description) VALUES ('Pista de caminhada');
-- INSERT INTO tb_locals(name, street, number, CEP, district, city_id, coordinate, description)
-- VALUES ('Praça', 'avenida teste', '123', '12345678', 'centro teste', 1, (-52.67178758502034, -26.227308751472556), 'descrição teste');
