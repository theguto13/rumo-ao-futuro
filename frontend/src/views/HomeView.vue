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
    @media (max-width: 500px){
        .ways-to-enter .card{
            width: 100%;
        }
        .infographic img{
            width: 100%;
        }
    }
</style>