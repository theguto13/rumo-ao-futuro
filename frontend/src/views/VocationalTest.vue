<template>
    <div id="VocationalTest">
        <div class="vocational-test" v-if="erro == false && error == undefined">
            <div class="title">Teste Vocacional Gratuito</div>
            <div class="ui">
                <div class="progress-bar" v-if="start == true && isLoading == false">
                    <div class="number" :class="{ 'current': (current_question + 1) === question_number, 'answered': questions[question_number - 1].answered !== -1 }" @click="go_to(question_number)" v-for="question_number in qtd_questions" :key="question_number" :style="'display: '+number_style+';'">{{ question_number }}</div>
                    <div class="number show-hidden" @click="progress_mode = !progress_mode; number_display()">
                        <span v-if="!progress_mode">Mostrar progresso</span>
                        <span v-else>Esconder</span>
                    </div>
                </div>
                <div class="loading" v-if="isLoading == true">
                    <div></div>
                    <span>Carregando perguntas...</span>
                </div>
                <div class="start" v-if="start == false && isLoading == false">
                    <b>Responda com calma, pense bem e boa sorte!</b><br>
                    <button class="btn btn-primary" @click="start = true">Começar teste</button>
                </div>
                <div class="screen col-10 mx-auto" v-else-if="start == true && isLoading == false">
                    <div class="question">
                        {{ questions[current_question].question }}
                    </div>
                    <div class="controls">
                        <div class="options">
                            <div class="option level5" :class="{ 'selected': questions[current_question].answered == 1 }">
                                <h4 @click="questions[current_question].answered = 1">Concordo plenamente</h4>
                            </div>
                            <div class="option level4" :class="{ 'selected': questions[current_question].answered == 0.78 }">
                                <h4 @click="questions[current_question].answered = 0.78">Concordo</h4>
                            </div>
                            <div class="option level3" :class="{ 'selected': questions[current_question].answered == 0.5 }">
                                <h4 @click="questions[current_question].answered = 0.5">Neutro</h4>
                            </div>
                            <div class="option level2" :class="{ 'selected': questions[current_question].answered == 0.2 }">
                                <h4 @click="questions[current_question].answered = 0.2">Discordo</h4>
                            </div>
                            <div class="option level1" :class="{ 'selected': questions[current_question].answered == 0 }">
                                <h4 @click="questions[current_question].answered = 0">Discordo plenamente</h4>
                            </div>
                        </div>
                        <div class="buttons">
                            <div class="previous">
                                <div v-if="current_question + 1 > 1">
                                    <h4 @click="previous()">Questão anterior</h4>
                                </div>
                                <div v-else>
                                    <h4 style="opacity: 0;">Questão anterior</h4>
                                </div>
                            </div>
                            <div class="next">
                                <div v-if="current_question + 1 == qtd_questions">
                                    <h4 @click="finish()">Terminar o teste</h4>
                                </div>
                                <div v-else-if="finishing == false">
                                    <h4 @click="next()">Próxima questão</h4>
                                </div>
                                <div v-else>
                                    <h4 @click="next_finishing()">Próxima questão</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'VocationalTest',
    data() {
        return {
            isLoading: true,
            questions: undefined,
            qtd_questions: undefined,
            areas: undefined,
            erro: false,
            error: undefined,
            progress_mode: true,
            number_style: 'block',
            current_question: 0,
            start: false,
            unanswered: undefined,
            finishing: false
        }
    },
    mounted() {
        axios.get('http://localhost:8080/questions').then(res => {
            this.questions = res.data.questions.map((questions) => ({
                ...questions,
                answered: -1
            }))
            console.log(this.questions.length)
            this.qtd_questions = this.questions.length
            axios.get('http://localhost:8080/questions/areas').then(res => {
                this.areas = res.data.areas.map((area) => ({
                    ...area,
                    points: 0
                }))
                this.loaded()
                console.log(this.questions)
            }).catch((error) => {
                this.error = error //'Ocorreu um erro ao carregar as questões do quiz. Entre em contato com nossa equipe e avise-nos.'
            })
        }).catch((error) => {
            this.error = error //'Ocorreu um erro ao carregar as questões do quiz. Entre em contato com nossa equipe e avise-nos.'
        })
    },
    methods: {
        loaded(){
            setTimeout(() => {
                this.isLoading = false
            }, 0 * 1000)
        },
        go_to(num){
            this.current_question = num - 1
        },
        number_display(){
            if(this.progress_mode == true){
                this.number_style = 'block'
            }else{
                this.number_style = 'none'
            }
        },
        next(){
            this.current_question += 1
        },
        previous(){
            this.current_question -= 1
        },
        finish(){
            this.finishing = true
            this.questions.forEach((question, index) => {
                if(question.answered == -1){
                    this.unanswered.push(index)
                }
            })
        }
    }
}
</script>

<style scoped>
    .loading{
        display: flex;
        height: 60vh;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .loading > div{
        border: 7px solid var(--logo-color);
        border-top: 7px solid transparent;
        border-radius: 100%;
        animation: loading 2s infinite linear;
        padding: 30px;
    }
    .loading > span{
        margin-top: 10px;
    }
    @keyframes loading{
        0%{
            transform: rotate(0deg);
        }
        50%{
            transform: rotate(180deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .vocational-test {
        margin: 20px auto;
    }
    .vocational-test .title {
        font-weight: bold;
        font-size: 2rem;
        text-align: center;
    }
    .vocational-test .progress-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 13px auto 0 auto;
    }
    .vocational-test .progress-bar .number {
        user-select: none;
        width: 28px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 5px;
        margin: 2px;
        background-color: var(--logo-color);
        border-radius: 3px;
        color: white;
        cursor: pointer;
    }
    .vocational-test .progress-bar .number.answered{
        color: #fff;
        font-weight: bold;
        background-color: var(--primary-color);
        border: 2px solid var(--primary-color);
        padding: 2px;
    }
    .vocational-test .progress-bar .number.current{
        color: var(--logo-color);
        font-weight: bold;
        background-color: #fff;
        border: 2px solid var(--logo-color);
        padding: 2px;
    }
    .vocational-test .progress-bar .number.show-hidden{
        width: max-content;
        display: block;
        color: var(--logo-color);
        font-weight: bold;
        background-color: #fff;
        border: 2px solid var(--logo-color);
    }
    .vocational-test .start{
        display: flex;
        height: 60vh;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .vocational-test .start button{
        background-color: var(--logo-color);
        border: none;
        border-radius: 30px;
    }
    .vocational-test .ui{
        border-radius: 13px;
        border: 2px solid #646464;
        min-height: 60vh;
        margin: 15px 4%;
    }
    .vocational-test .ui .question{
        margin-top: 20px;
        font-size: 1.6em;
        font-weight: bold;
        text-align: center;
    }
    .vocational-test .controls *{
        user-select: none;
    }
    .vocational-test .options{
        margin: 50px 0;
    }
    .vocational-test .options .option{
        font-size: 1.4em;
        margin: 8px 0;
        padding: 12px;
        border: 2px solid #646464;
        border-radius: 6px;
    }
    .vocational-test .options .option h4{
        margin: 0;
    }
    .vocational-test .options .option.selected{
        color: white;
    }
    .vocational-test .options .option.level5.selected{
        background-color: var(--primary-color);
        border-color: var(--primary-color);
    }
    .vocational-test .options .option.level4.selected{
        background-color: var(--secondary-color);
        border-color: var(--secondary-color);
    }
    .vocational-test .options .option.level3.selected{
        background-color: rgb(207, 204, 0);
        border-color: rgb(207, 204, 0);
    }
    .vocational-test .options .option.level2.selected{
        background-color: var(--tertiary-color);
        border-color: var(--tertiary-color);
    }
    .vocational-test .options .option.level1.selected{
        background-color: var(--quaternary-color);
        border-color: var(--quaternary-color);
    }
    .vocational-test .buttons{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .vocational-test .buttons > div{
        border-radius: 20px;
        padding: 10px 14px;
    }
    /*@media (max-width: 809px){
        .vocational-test .progress-bar{
            width: 95%;
        }
    }*/
</style>