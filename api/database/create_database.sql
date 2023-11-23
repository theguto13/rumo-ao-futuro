CREATE DATABASE IF NOT EXISTS rumoaofuturo;

USE rumoaofuturo;

CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(15) NOT NULL,
    password CHAR(60) NOT NULL,

    UNIQUE(id),
    UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS news (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    subtitle VARCHAR(300),
    content TEXT NOT NULL,
    author INT NOT NULL,
    publishedDate DATETIME NOT NULL,
    updatedDate DATETIME,

    UNIQUE(id),
    UNIQUE(title),
    UNIQUE(slug),
    CONSTRAINT fk_author_news FOREIGN KEY (author) REFERENCES admins(id)
);

CREATE TABLE IF NOT EXISTS areas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    area VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(250) NOT NULL,
    area INT NOT NULL,
    points INT NOT NULL,

    UNIQUE(id),
    UNIQUE(question),
    CONSTRAINT fk_area_question FOREIGN KEY (area) REFERENCES areas(id)
);

DELIMITER //
CREATE TRIGGER delete_questions
BEFORE DELETE ON areas
FOR EACH ROW 
BEGIN
    DELETE FROM questions WHERE area = OLD.id;
END;
//
DELIMITER ;

INSERT INTO admins(username, name, password) VALUES
('guto', 'Augusto Júnior', '$2a$07$AtPSJdSmm24NmFv1Gmi7peVySp/7QfFSAE9KAcrq6kbKSAZMa1uTy');

INSERT INTO news(title, slug, subtitle, content, author, publishedDate, updatedDate) 
VALUES (
    'Descoberta Arqueológica Revela Antiga Cidade Submersa: Ruínas Surpreendentes Emergem nas Profundezas do Oceano',
    'descoberta-arqueologica-antiga-cidade-submersa',
    'Exploradores subaquáticos encontram vestígios incríveis de uma civilização perdida há séculos.',
    '<p>Em uma expedição subaquática emocionante, exploradores descobriram as impressionantes ruínas de uma antiga cidade submersa, revelando uma visão fascinante do passado perdido.</p>

    <p>As descobertas arqueológicas incluem templos majestosos, praças movimentadas e estruturas intricadamente esculpidas, todas submersas nas profundezas do oceano. Os pesquisadores acreditam que essas ruínas podem ser os restos de uma civilização avançada que desapareceu misteriosamente há séculos.</p>

    <p>O líder da expedição, Dr. Alexandra Mendes, comentou: "Estamos diante de uma descoberta sem precedentes. Essas ruínas podem reescrever completamente a história de uma sociedade antiga até então desconhecida. A arquitetura e os artefatos encontrados sugerem uma cultura sofisticada e avançada para sua época."</p>

    <p>Os exploradores também recuperaram artefatos intrigantes, como arte cerâmica finamente decorada, instrumentos musicais elaborados e até mesmo fragmentos de manuscritos preservados. Esses itens fornecem insights valiosos sobre a vida cotidiana, crenças religiosas e realizações científicas dessa antiga civilização.</p>

    <p>O conteúdo descoberto está sendo cuidadosamente documentado e preservado para análises futuras. Os especialistas planejam utilizar tecnologias avançadas, incluindo datação por radiocarbono, para determinar a idade exata dessas ruínas misteriosas.</p>

    <p>O autor deste relato, Dr. Mendes, é um renomado arqueólogo especializado em descobertas subaquáticas. Sua paixão por desvendar os segredos escondidos nas profundezas do oceano o levou a diversas expedições bem-sucedidas ao redor do mundo.</p>

    <p>Até a data de publicação desta notícia (<strong>2023-11-23</strong>), não houveram mais atualizações. A notícia será atualizada conforme mais informações forem reveladas durante as análises em andamento.</p>',
    1,
    '2023-11-23 09:00:00',
    NULL
);

INSERT INTO areas(area) VALUES
('Ciências Naturais e Matemática'),
('Tecnologia e Computação'),
('Ciências Sociais e Humanas'),
('Saúde e Bem-Estar'),
('Negócios e Gestão'),
('Engenharia e Design'),
('Artes e Entretenimento'),
('Agricultura e Pecuária');

/*INSERT INTO questions(question, area, points) VALUES
-- Perguntas para Ciências Naturais e Matemática (Área 1)
('Você se interessa por observar a natureza e entender como ela funciona?', 1, 5),
('Gosta de estudar plantas, animais e ecossistemas?', 1, 4),
('Você sente curiosidade sobre a preservação do meio ambiente e a conservação da biodiversidade?', 1, 3),
('Você se interessa por astronomia e o universo?', 1, 4),
('Gosta de resolver problemas matemáticos complexos?', 1, 5),
('Acha fascinante a química e a estrutura molecular?', 1, 4),
-- Perguntas para Tecnologia e Computação (Área 2)
('Você se sente à vontade trabalhando com números e resolvendo problemas matemáticos?', 2, 5),
('Acha fascinante explorar fórmulas e equações para encontrar soluções?', 2, 4),
('Você gosta de quebra-cabeças e desafios que envolvem lógica e cálculos?', 2, 3),
('Você se sente à vontade trabalhando com gadgets e dispositivos eletrônicos?', 2, 4),
('Acha empolgante a ideia de programar robôs e sistemas autônomos?', 2, 5),
('Você gosta de criar e editar vídeos ou imagens digitalmente?', 2, 3),
-- Perguntas para Ciências Sociais e Humanidades (Área 3)
('Você se interessa por entender a sociedade, suas dinâmicas e culturas?', 3, 5),
('Gosta de analisar o comportamento humano e as relações interpessoais?', 3, 4),
('Você gosta de discutir questões sociais e políticas?', 3, 3),
('Você se interessa por história antiga e civilizações perdidas?', 3, 4),
('Acha interessante explorar a psicologia das pessoas e seu comportamento?', 3, 5),
('Gosta de analisar obras literárias e interpretar textos?', 3, 3),
-- Perguntas para Saúde e Bem-Estar (Área 4)
('Você se preocupa com o bem-estar das pessoas e deseja ajudar a curar doenças?', 4, 5),
('Acha interessante estudar o funcionamento do corpo humano?', 4, 4),
('Você se sente à vontade lidando com situações de emergência e cuidados de saúde?', 4, 3),
('Você se preocupa com a saúde mental e o bem-estar emocional das pessoas?', 4, 5),
('Acha fascinante o estudo de doenças raras e desconhecidas?', 4, 4),
('Você se imagina trabalhando em pesquisa médica e desenvolvimento de tratamentos?', 4, 3),
-- Perguntas para Negócios e Gestão (Área 5)
('Você se sente à vontade liderando projetos e tomando decisões estratégicas?', 5, 5),
('Gosta de resolver desafios de logística e cadeia de suprimentos?', 5, 4),
('Você se vê gerenciando equipes e liderando iniciativas empresariais?', 5, 3),
('Acha interessante analisar mercados financeiros e investimentos?', 5, 4),
('Você se sente à vontade liderando reuniões e apresentando ideias de negócios?', 5, 5),
('Gosta de estratégia empresarial e desenvolvimento de planos de negócios?', 5, 3),
-- Perguntas para Engenharia e Design (Área 6)
('Você gosta de projetar e construir coisas?', 6, 5),
('Tem curiosidade sobre como funcionam máquinas e estruturas?', 6, 4),
('Você se considera um solucionador de problemas e inovador?', 6, 3),
('Você se interessa por construção e infraestrutura urbana?', 6, 5),
('Gosta de projetar produtos inovadores e soluções técnicas?', 6, 4),
('Acha empolgante trabalhar com tecnologias de energia renovável?', 6, 3),
-- Perguntas para Artes e Entretenimento (Área 7)
('Você aprecia o teatro e a atuação?', 7, 5),
('Gosta de criar ilustrações e artes visuais?', 7, 4),
('Acha inspirador o mundo da moda e das tendências?', 7, 3),
('Se sente envolvido pelo mundo da música e composição?', 7, 5),
('Acredita que o entretenimento é uma forma poderosa de comunicação?', 7, 4),
('Você se interessa por eventos culturais e produção artística?', 7, 3),
-- Perguntas para Agricultura e Pecuária (Área 8)
('Você se interessa por agricultura, cultivo de alimentos ou criação de animais?', 8, 5),
('Gosta de trabalhar ao ar livre e com a natureza?', 8, 4),
('Acha interessante a agricultura sustentável e orgânica?', 8, 3),
('Se imagina gerenciando uma vinícola ou produzindo vinhos?', 8, 4),
('Acredita que a produção de alimentos é uma necessidade vital?', 8, 5);*/

INSERT INTO questions(question, area, points) VALUES
('Gosta de resolver problemas matemáticos complexos?', 1, 5),
('Acha fascinante a química e a estrutura molecular?', 1, 4),

('Acha empolgante a ideia de programar robôs e sistemas autônomos?', 2, 5),
('Você gosta de criar e editar vídeos ou imagens digitalmente?', 2, 3),

('Você se interessa por entender a sociedade, suas dinâmicas e culturas?', 3, 5),
('Acha interessante explorar a psicologia das pessoas e seu comportamento?', 3, 5),

('Você se preocupa com o bem-estar das pessoas e deseja ajudar a curar doenças?', 4, 5),
('Você se preocupa com a saúde mental e o bem-estar emocional das pessoas?', 4, 5),

('Você se sente à vontade liderando projetos e tomando decisões estratégicas?', 5, 5),
('Você se sente à vontade liderando reuniões e apresentando ideias de negócios?', 5, 5),

('Você gosta de projetar e construir coisas?', 6, 5),
('Você se interessa por construção e infraestrutura urbana?', 6, 5),

('Você aprecia o teatro e a atuação?', 7, 5),
('Se sente envolvido pelo mundo da música e composição?', 7, 5),

('Você se interessa por agricultura, cultivo de alimentos ou criação de animais?', 8, 5),
('Acredita que a produção de alimentos é uma necessidade vital?', 8, 5);