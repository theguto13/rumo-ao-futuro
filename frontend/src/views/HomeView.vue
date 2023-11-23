<template>
    <div id="home">
        <div class="vocational-test-attraction">
            <div class="slogan">
                <h3>Descubra o seu caminho,</h3>
                <h3>rumo ao seu futuro.</h3>
                <div class="buttons">
                    <router-link to="/teste-vocacional" class="test-button">Faça um teste vocacional ➞</router-link>
                </div>
            </div>
            <div class="img">
                <img src="../assets/girl.png" alt="Imagem de uma garota 2D descontraída." height="300">
            </div>
        </div>
        <!--ENEM-->
        <div class="enem">
            <div class="title">ENEM</div>
            <div class="what-is">
                <div class="title">A principal prova de acesso ao ensino superior no Brasil</div>
                <p>O Enem é a principal porta de entrada para o ensino superior. Seu objetivo é avaliar a qualidade do ensino médio no país e identificar os alunos com maior capacidade de ingressar na faculdade, além de ser utilizado por diversas universidades brasileiras como forma de seleção para seus cursos de graduação. Vale lembrar que algumas universidades possuem vestibular próprio, que é diferente do Enem, por isso, confira o método de ingresso na faculdade que você deseja ingressar.</p>
            </div>
            <div class="how-works">
                <div class="title">Como funciona o Enem?</div>
                <p>Ele é composto por quatro áreas de conhecimento: </p>
                <ul>
                    <li>Matemática e suas tecnologias</li>
                    <li>Linguagens e suas tecnologias</li>
                    <li>Ciências da Natureza</li>
                    <li>Ciências Humanas</li>
                </ul>
                <p>Além disso, também é necessário fazer uma redação dissertativa argumentativa, que é avaliada de acordo com critérios de competência e habilidade de escrita.
                <br><br>
                O Enem é uma prova aplicada no domingo, em dois finais de semana consecutivos, geralmente no mês de novembro. A divisão da prova acontece no seguinte formato: no 1º dia você terá 5 horas de prova, dentro disso é necessário responder 90 questões divididas igualmente nas áreas de Linguagens e Humanas, <span style="color: var(--quaternary-color);">e ainda fazer a redação</span>. No segundo dia são 4h e 30min de prova, nas quais você deve responder 45 questões da área de Matemática e 45 de Ciências da Natureza.</p>
            </div>
            <div class="programs">
                <div class="title">Programas de acesso a universidade</div>
                <p>Após fazer o Enem e descobrir sua nota, entram em ação os programas do Estado para usá-la de fato. O Sisu, o Prouni e o Fies são programas do governo federal que ajudam milhares de estudantes brasileiros a realizarem o sonho de ingressar no ensino superior. Confira abaixo mais detalhes sobre cada um.</p>
                <div class="programs-select">
                    <div @click="select(1)" class="program-button sisu" :class="{'selected': selected == 1}">SISU</div>
                    <div @click="select(2)" class="program-button prouni" :class="{'selected': selected == 2}">PROUNI</div>
                    <div @click="select(3)" class="program-button fies" :class="{'selected': selected == 3}">FIES</div>
                </div>
                <div class="programs-description">
                    <h3 class="title"  :style="{opacity: opacity_programs ? '1' : '0'}">{{ program_title[selected - 1] }}</h3>
                    <p  :style="{opacity: opacity_programs ? '1' : '0'}">{{ program_description[selected - 1] }}</p>
                </div>
            </div>
        </div>
        <h2 class="ways-to-enter-title">Formas de ingresso das principais universidades do país</h2>
        <div class="ways-to-enter">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">UFPR</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Universidade Federal do Paraná</h6>
                    <p class="card-text">Possui vestibular próprio, mas também possui vagas de ingresso pelo SISU.</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">USP</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Universidade de São Paulo</h6>
                    <p class="card-text">Utiliza SISU e possui um vestibular próprio, chamado Fuvest.</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">UFFS</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Universidade Federal Fronteira Sul</h6>
                    <p class="card-text">Utiliza SISU e Processo Seletivo Especial.</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">UFRGS</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Universidade Federal do Rio Grande do Sul</h6>
                    <p class="card-text">Utiliza apenas SISU e vestibular próprio.</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">UFMG</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Universidade Federal de Minas Gerais</h6>
                    <p class="card-text">Utiliza SISU e vestibular próprio.</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">UFRJ</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Universidade Federal do Rio de Janeiro</h6>
                    <p class="card-text">Utiliza SISU e, em alguns cursos, testes específicos da área.</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">PUC-SP</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Pontifícia Universidade Católica de São Paulo</h6>
                    <p class="card-text">Tem seu próprio vestibular, além de usar a nota do Enem.</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">PUC-PR</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Pontifícia Universidade Católica do Paraná</h6>
                    <p class="card-text">Tem seu próprio vestibular e pode usar a nota do Enem no processo seletivo.</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">UNICAMP</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Universidade Estadual de Campinas</h6>
                    <p class="card-text">Tem seu próprio vestibular, que cobra conhecimentos específicos de cada área, de acordo com seu curso. Também pode utilizar a nota do Enem no processo seletivo.</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">UFSC</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Universidade Federal de Santa Catarina</h6>
                    <p class="card-text">Também possui vestibular próprio, vagas pelo SISU e utiliza Sistema de Seleção por Mérito (PSM).</p>
                </div>
            </div>
        </div>
        <div class="infographic">
            <img src="../assets/important_dates.png" alt="Infográfico contendo datas importantes do Enem">
        </div>
        <div class="latest_news">
            <div class="img"><img src="../assets/dido.png" alt="Professor da rede federal de ensino Eduardo João Moro"></div>
            <div class="text">
                <div class="title">Uma conversa sobre Escolha Profissional, com Eduardo "Dido" Moro</div>
                <p>O professor e sociólogo Eduardo João Moro, popularmente conhecido como Dido, revela os fundamentos cruciais do planejamento de carreira em cinco pilares imperdíveis. Antes de decidir sua trajetória profissional, é essencial considerar: autoconhecimento, família, formação, informação e contexto social. Esses princípios, compartilhados pelo professor, são essenciais para orientar escolhas futuras, evitando frustrações e surpresas inesperadas.</p>
                <div class="buttons">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Continuar lendo</button>
                    <router-link to="/noticias">Ver todas as notícias</router-link>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Uma conversa sobre "Escolha Profissional", com Eduardo "Dido" Moro</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h3>ESCOLHA PROFISSIONAL</h3>
                <p>Segundo o professor e sociólogo Eduardo João Moro, existem 5 pilares do planejamento de carreira que você precisa saber antes de fazer sua escolha profissional:</p>
                <ol>
                    <li>
                        <strong>Autoconhecimento</strong>
                        <p>“Pense sobre o que é realmente importante para você, o que lhe interessa, o que lhe agrada, o que gosta e sabe fazer bem, assim como o que lhe desagrada e o que você não pensa em fazer na sua vida profissional.”</p>
                    </li>
                    <li>
                        <strong>Família</strong>
                        <p>“Compartilhe seus planos com as pessoas importantes da sua vida. Abra o jogo e construa um ambiente de diálogo. Esteja preparado para ouvir críticas e para lutar pelo que acredita. Se não obtiver resultado nas primeiras tentativas, insista. Valerá a pena!”</p>
                    </li>
                    <li>
                        <strong>Formação</strong>
                        <p>“Planeje cuidadosamente a sua formação acadêmica. Não adianta amontoar certificados de cursos, pois eles precisam dialogar entre si. Ainda que o mercado exija versatilidade, sua formação precisa ser coerente e ajustada à profissão que deseja desempenhar.”</p>
                    </li>
                    <li>
                        <strong>Informação</strong>
                        <p>“Busque conhecer o mercado de trabalho em que deseja atuar, incluindo informações sobre empregabilidade, remuneração e perspectivas de especialistas. Estar atento ao cenário político e econômico do país também pode ser útil no momento de planejar os próximos passos na carreira. Informe-se!”</p>
                    </li>
                    <li>
                        <strong>Contexto Social</strong>
                        <p>“O contexto social em que está inserido influencia diretamente o seu Planejamento de Carreira. Planos de curto, médio e longo prazo devem levar em consideração finanças pessoais, tempo disponível, deveres familiares etc. Organize-se, planeje-se e eleja prioridades.”</p>
                    </li>
                </ol>
                <div class="new_book">
                    <ul>
                        <li>Dido lança novo livro: "Como ajudar seu filho na escolha da profissão"</li>
                    </ul>
                    <img src="../assets/dido_book.png" alt="Livro de Eduardo João Moro: 'Como ajudar seu filho na escolha da profissão'">
                </div>
                <p>Tudo que foi elencado por Eduardo Moro pode servir de base para descobrir sua carreira futura se estiver em dúvidas daquilo que quer seguir, ou para se sentir mais confiante de sua escolha atual, assim haverá menor probabilidade de frustrações futuras ou surpresas repentinas e inesperadas. Por isso que o Projeto Voe, criado também por Eduardo João Moro no Instituto Federal de Concórdia, é tão importante para os alunos da instituição os ajudando a encontrar seu caminho futuro e alcançar suas perspectivas. Você pode saber mais informações sobre ajuda profissional em seus livros, como “Como ajudar seu filho na escolha profissional” ou “3 erros que você não pode cometer (e que eu cometi)” e acessar seu Instagram <a target="_blank" href="https://www.instagram.com/dido.voe/" style="color: var(--quaternary-color);">@dido.voe</a>.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar notícia</button>
            </div>
            </div>
        </div>
        </div>
        <div class="brazilian-methodology">
            <h2>Metodologia brasileira de ensino</h2>
            <p>A estrutura do sistema educacional brasileiro é definida por duas legislaturas principais. A <strong>Lei de Diretrizes e Bases da Educação</strong> – conhecida como LDB – e as diretrizes gerais da <strong>Constituição Federal de 1988</strong>. Tem caráter obrigatório para os pais ou responsáveis que as crianças ou adolescentes concluam a educação básica, assim como é dever do Estado oferecer essa educação. Ela é constituída com os seguintes critérios:</p>
            <ul>
                <li><strong>Educação Infantil:</strong> duração de 4 anos, com alunos de 0 a 3 anos;</li>
                <li><strong>Pré-escola:</strong> duração de 3 anos, com alunos de 4 a 6 anos;</li>
                <li><strong>Ensino Fundamental:</strong> duração de 9 anos, com alunos de 6 a 14 anos;</li>
                <li><strong>Ensino Médio:</strong> duração de 3 anos, com alunos de 15 a 17 anos;</li>
                <li><strong>Ensino Médio Técnico:</strong> escolas podem oferecer cursos técnicos em períodos contraturnos – que são os períodos extraclasse – para seus alunos. A duração é variável, podendo ser de 1 a 3 anos.</li>
            </ul>
            <p>Em última pesquisa, feita pelo <strong>Pisa</strong>, dentre os 65 países avaliados, <strong>o Brasil ocupa a vergonhosa posição de 53º</strong>, mesmo considerando que o Ministério da Educação é o segundo Ministério que mais gasta dinheiro no Brasil, atrás apenas do Ministério da Saúde. Isso inicia a questão da reforma no sistema educacional brasileiro, que é tema de uma grande discussão atualmente, pois a reforma é amplamente defendida no Ministério da Educação, principalmente pela Ministra da Educação Básica, Maria Guimarães Castro. Porém, também há uma grande massa de críticos que tomam como exemplo os Estados Unidos e Chile, onde esse modelo - muito semelhante com o que a reforma brasileira propõe - resultou em exclusão social e aumento da desigualdade, posteriormente causando a elitização do ensino- somente pessoas da elite têm acesso a educação de qualidade.</p>
            <p>Atualmente o ensino brasileiro é muito engessado, impossibilitando um aprendizado mais direcionado para a carreira que o aluno deseja seguir. Países como Finlândia, Inglaterra, França e Austrália possibilitam essa flexibilização no currículo quando o estudante atinge 15 anos de idade, tomados como exemplos para a Ministra, de um sistema que deu certo e deveria ser seguido. Como defendido pela professora da USP, Carmen Moraes, é necessário analisar diversos fatores para projetar uma reforma efetiva no ensino que não resulte nos velhos problemas conhecidos em outras experiências parecidas. Fatores sociais, segundo Moraes, são imprescindíveis na análise de um plano para implementação da reforma.</p>
            <p>Observado em países como Inglaterra, houve um processo chamado “Mercadorização” no ensino. Esse processo torna a educação mais competitiva, privatizada e com um rigoroso controle de qualidade, a partir da utilização de uma lógica empresarial no contexto educacional. Para que o governo saiba como fazer os investimentos necessários na área, são utilizados dados administrativos. Já como indicadores de sucesso dos investimentos já feitos são utilizadas metas numéricas e índices de desempenho. Porém, assim como os modelos Norte Americano e Chileno, há críticas principalmente sociais.</p>
            <p>A reforma ocorrida na Finlândia, diferente das outras já citadas focou em uma forma diferente de garantir uma reforma no sistema educacional do país. Ao invés de direcionar o corpo discente para alguma área de interesse, buscou valorizar os docentes, melhorando os salários e as condições do trabalho. Ainda, o país investiu fortemente em pesquisa e desenvolvimento.</p>
        </div>
    </div>
</template>

<script>
export default{
    name: 'HomeView',
    data() {
        return {
            opacity_programs: true,
            selected: 1,
            program_title: [
                'A loteria do ensino superior',
                'Estude em particulares sem gastar muito',
                'Financie seu futuro acadêmico',
            ],
            program_description: [
                'O Sisu é um sistema criado pelo governo para ajudar estudantes a ingressarem em universidades públicas e institutos federais, usando a nota do Enem como critério para selecionar os candidatos para as vagas disponíveis.\
                Ele funciona de forma simples: após realizar o Enem, o estudante pode se inscrever no sistema e escolher até duas opções de curso. Durante o período de inscrições, ele pode mudar suas opções quantas vezes quiser, mas só a última escolha será considerada na seleção.\
                Ao contrário do Enem, o processo seletivo do Sisu acontece duas vezes por ano, no primeiro e segundo semestre. Após o período de inscrições, o sistema faz uma seleção automática dos candidatos mais bem classificados para cada curso e os selecionados são convocados para a matrícula. Caso haja vagas não ocupadas, é possível ainda participar de uma lista de espera.\
                Para participar desse processo seletivo, é necessário ter feito o Enem mais recente e não ter zerado a redação. Além disso, é preciso ficar atento aos prazos de inscrição e matrícula de cada processo seletivo, para isso, clique aqui e confira nosso calendário!',

                'O Prouni é um programa federal que oferece bolsas de estudo integrais e parciais em instituições privadas de ensino superior. Para poder participar, você precisa ter feito a última edição do Enem, ter alcançado média superior a 450 pontos e não ter zerado a redação. E ainda, é necessário atender aos critérios socioeconômicos estabelecidos, como renda familiar per capita inferior a três salários mínimos.\
	            O Prouni funciona da mesma maneira que o Sisu: após a divulgação das notas do Enem, o candidato pode se inscrever no programa e escolher até duas opções de curso, podendo mudá-las até o fim do prazo, mas sendo considerada somente a última escolha.',

                'O Fies é outro caminho para ingressar na faculdade. Ele oferece financiamento estudantil para alunos matriculados em instituições privadas de ensino superior, voltado para estudantes de renda per capita de até cinco salários mínimos.\
	            Diferente dos programas já citados anteriormente, no Fies é possível usar a nota do Enem para se inscrever em apenas um curso e a instituição que deseja estudar. Além disso, o estudante que for selecionado precisa pagar uma taxa administrativa trimestral e começar a pagar o financiamento depois de se formar.\
	            O Fies oferece duas modalidades de financiamento: Fies e P-Fies, sendo que o primeiro tem juros zero e o segundo tem juros variáveis, de acordo com o agente financeiro. Ainda que o Fies seja direcionado para quem não tem condições de pagar uma universidade privada, é importante lembrar que o financiamento precisa ser pago depois de formado, então é necessário se planejar para não ter problemas financeiros no futuro.',
            ]
        }
    },
    methods: {
        select(num){
            this.opacity_programs = false
            setTimeout(() => {
                this.opacity_programs = true
                this.selected = num
            }, 0.55 * 1000)
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=PT+Sans+Narrow:wght@400;700&family=Poppins&family=Vina+Sans&display=swap');
    .vocational-test-attraction{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px 4% 50px 4%;
    }
    .vocational-test-attraction .text, .vocational-test-attraction .slogan h3, .vocational-test-attraction .img{
        width: max-content;
        box-sizing: border-box;
    }
    .vocational-test-attraction .slogan h3{
        color: var(--logo-color);
        font-size: 3em;
        transition: .2s all;
    }
    .vocational-test-attraction .slogan .buttons{
        margin: 21px 12px;
    }
    .vocational-test-attraction .slogan .test-button{
        text-decoration: none;
        padding: 15px 25px;
        border: none;
        border-radius: 20px;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        color: #fff;
        background-size: 200%;
        transition: 0.6s;
        background-image: linear-gradient(to left, var(--quaternary-color), var(--tertiary-color), var(--quaternary-color));
    }
    .vocational-test-attraction .slogan .test-button:hover{
        background-position: right;
    }
    .enem{
        background-color: #181818;
        color: #e7e7e7;
        padding: 15px 4% 40px 4%;
    }
    .enem .title{
        text-align: center;
        font-family: 'Vina Sans';
        font-size: 5em;
    }
    .enem .what-is .title{
        text-align: left;
        font-size: 3em;
    }
    .enem .what-is p{
        font-size: 1.25em;
    }
    .enem .how-works .title{
        text-align: left;
        font-size: 3em;
    }
    .enem .how-works p, .how-works ul{
        font-size: 1.25em;
    }
    .enem .programs .title{
        text-align: left;
        font-size: 3em;
    }
    .enem .programs p{
        font-size: 1.25em;
    }
    .programs .programs-select{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin: 30px 0;
    }
    .programs .programs-select .program-button{
        padding: 8px 20px;
        text-transform: uppercase;
        font-family: 'PT Sans Narrow';
        border-radius: 30px;
        font-weight: bold;
        font-size: 2em;
        cursor: pointer;
        user-select: none;
    }
    .programs .programs-select .program-button.selected{
        background-image: linear-gradient(to left, var(--logo-color), var(--quinquinary-color));
    }
    .enem .programs-description .title{
        font-family: 'PT Sans Narrow';
        text-align: center;
        font-size: 2.5em;
        transition: .5s all;
    }
    .enem .programs-description p{
        font-size: 1.25em;
        transition: .5s all;
    }
    .ways-to-enter-title{
        text-align: center;
        margin: 40px 0 25px 0;
    }
    .ways-to-enter {
        display: flex;
        align-items: stretch; /* Add this line to make all cards have the same height */
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .ways-to-enter .card {
        width: 19%; /* Adjust the width as needed */
        margin: 10px; /* Add margin for spacing between cards */
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    .ways-to-enter .card-body {
        flex: 1; /* This will make the card body take the available space */
        display: flex;
        flex-direction: column;
    }
    .infographic{
        background: rgb(119,75,196);
        background: linear-gradient(90deg, rgba(119,75,196,1) 25%, rgba(255,145,77,1) 75%);
        text-align: center;
        margin-top: 35px;
    }
    .infographic img{
        width: 50%;
        transition: .2s all;
    }
    .latest_news{
        margin: 40px 4%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .latest_news > *{
        display: inline-block;

    }
    .latest_news .buttons{
        text-align: center;
        display: flex;
        flex-direction: column;

    }
    .latest_news .buttons *{
        margin: 3px 0;
    }
    .latest_news .text{
        width: 50%;
    }
    .latest_news .text .title{
        font-weight: bold;
        font-size: 2rem;
    }
    .new_book{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        margin: 15px 0;
    }
    .brazilian-methodology{
        margin: 30px 4%;
    }
    @media (min-width: 576px){
        .modal-dialog{
            max-width: 70%;
        }
    }
    @media (max-width: 1300px){
        .latest_news{
            flex-direction: column;
        }
        .latest_news > *{
            width: 70%;
        }
        .latest_news .text{
            width: 70%;
        }
        .latest_news .img{
            text-align: center;
        }
        .latest_news .img img{
            width: 100%;
        }
    }
    @media (max-width: 1240px){
        .ways-to-enter .card{
            width: 35%;
        }
    }
    @media (max-width: 1011px){
        .vocational-test-attraction{
            justify-content: center;
        }
        .vocational-test-attraction .slogan{
            margin: 25px 0 37px 0;
        }
        .vocational-test-attraction .slogan > *, .vocational-test-attraction .test-button{
            margin: 0 auto;
            text-align: center;
        }
        .infographic img{
            width: 70%;
        }
    }
    @media (max-width: 610px){
        .vocational-test-attraction .slogan h3{
            font-size: 2em;
        }
        .vocational-test-attraction .slogan .test-button{
            padding: 10px 18px;
        }
        .vocational-test-attraction .img img{
            height: 250px;
        }
        .infographic img{
            width: 85%;
        }
    }
    @media (max-width: 550px){
        .latest_news > *{
            width: 100%;
        }
        .latest_news .text{
            width: 100%;
        }
    }
    @media (max-width: 500px){
        .ways-to-enter .card{
            width: 100%;
        }
        .infographic img{
            width: 100%;
        }
    }
</style>