<template>
    <div id="VocationalTest">
        <div class="vocational-test" v-if="erro == false && error == undefined">
            <div class="title">Teste Vocacional Gratuito</div>
            <div class="ui">
                <div class="progress-bar" v-if="start == true && isLoading == false && finished == false">
                    <div 
                    class="number" 
                    :class="{ 
                        'current': (current_question + 1) === question_number, 
                        'answered': questions[question_number - 1].answered !== -1 
                    }" 
                    @click="go_to(question_number)" 
                    v-for="question_number in qtd_questions" 
                    :key="question_number" 
                    :style="'display: '+number_style+';'">
                        {{ question_number }}
                    </div>
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
                    <h3>Responda com calma, pense bem e boa sorte!</h3><br>
                    <button class="btn btn-primary" @click="start = true"><h5 style="margin-bottom: 3px;">Começar teste</h5></button>
                </div>
                <div class="screen col-10 mx-auto" v-else-if="start == true && isLoading == false && finished == false">
                    <div class="question">
                        {{ questions[current_question].question }}
                    </div>
                    <div class="controls">
                        <div class="options">
                            <div class="option level5" :class="{ 'selected': questions[current_question].answered == 1 }" @click="questions[current_question].answered = 1">
                                <h4>Concordo plenamente</h4>
                            </div>
                            <div class="option level4" :class="{ 'selected': questions[current_question].answered == 0.8 }" @click="questions[current_question].answered = 0.8">
                                <h4>Concordo</h4>
                            </div>
                            <div class="option level3" :class="{ 'selected': questions[current_question].answered == 0.5 }" @click="questions[current_question].answered = 0.5">
                                <h4>Neutro</h4>
                            </div>
                            <div class="option level2" :class="{ 'selected': questions[current_question].answered == 0.2 }" @click="questions[current_question].answered = 0.2">
                                <h4>Discordo</h4>
                            </div>
                            <div class="option level1" :class="{ 'selected': questions[current_question].answered == 0 }" @click="questions[current_question].answered = 0">
                                <h4>Discordo plenamente</h4>
                            </div>
                        </div>
                        <div class="buttons">
                            <div class="previous">
                                <div v-if="current_question + 1 > 1" @click="previous()">
                                    <h4>Questão anterior</h4>
                                </div>
                                <div v-else>
                                    <h4 style="opacity: 0;">Questão anterior</h4>
                                </div>
                            </div>
                            <div class="next">
                                <div v-if="current_question + 1 == qtd_questions" @click="finish()">
                                    <h4>Terminar o teste</h4>
                                </div>
                                <div v-else-if="finishing == false" @click="next()">
                                    <h4>Próxima questão</h4>
                                </div>
                                <div v-else @click="next_finishing()">
                                    <h4>Próxima questão</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="finalScreen" v-if="finalScreen == true && finished == false">
                    <h2>Você finalizou o teste.</h2>
                    <div class="back-button" @click="finalScreen = false">Revisar respostas</div>
                    <div class="result-button" @click="finished = true; finalScreen = false; result()">Terminar e ver resultado</div>
                </div>
                <div class="loading" v-if="finished == true">
                    <div></div>
                    <span>Carregando resultado...</span>
                </div>
                <div class="result">
                    <Radar :data="radarData" :options="radarOptions" v-if="isCalculated == true"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

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
            current_question_finishing: 0,
            start: false,
            unanswered: [],
            finishing: false,
            finished: false,
            finalScreen: false,
            isCalculating: false,
            isCalculated: false,
            radarOptions: {},
            radarData: {}
        }
    },
    mounted() {
        axios.get('http://localhost:8080/questions').then(res => {
            this.questions = res.data.questions.map((questions) => ({
                ...questions,
                answered: -1
            }))
            this.qtd_questions = this.questions.length
            axios.get('http://localhost:8080/questions/areas').then(res => {
                this.areas = res.data.areas.map((area) => ({
                    ...area,
                    points: 0
                }))
                this.loaded()
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
            }, 2.6 * 1000)
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
        next_finishing(){
            if(this.unanswered.length - 1 > this.current_question_finishing){
                this.current_question_finishing += 1
                this.current_question = this.unanswered[this.current_question_finishing]
            }else{
                this.current_question = this.questions.length - 1
            }
        },
        previous(){
            this.current_question -= 1
        },
        finish(){
            if(this.questions[this.current_question].answered >= 0){
                this.finishing = true
                this.unanswered = []
                this.current_question_finishing = 0
                this.questions.forEach((question, index) => {
                    if(question.answered == -1){
                        this.unanswered.push(index)
                    }
                })
                if(this.unanswered.length > 0){
                    this.current_question = this.unanswered[this.current_question_finishing]
                }else{
                    this.finalScreen = true
                }
            }/*else{

            }*/
        },
        result(){
            this.isCalculating = true
            this.start = false
            this.questions.forEach(question => {
                this.areas.forEach(area => {
                    if(question.area == area.id){
                        area.points += (question.answered * question.points)
                    }
                })
            })
            var labels = []
            var datasetsData = []
            this.areas.forEach(area => {
                labels.push(area.area)
                datasetsData.push(area.points)
            })
            var datasets = [{
                label: 'Sua pontuação',
                backgroundColor: '#9bbe8a',
                borderColor: '#67825a',
                pointBackgroundColor: '#67825a',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#67825a',
                data: datasetsData
            }]
            this.radarData.labels = labels
            this.radarData.datasets = datasets
            this.radarOptions = {
                responsive: true,
                maintainAspectRatio: false
            }
            this.isCalculated = true
        }
    },
    components: {
        Radar
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
        padding: 8px 14px;
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
        cursor: pointer;
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
    .finalScreen{
        display: flex;
        height: 60vh;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .finalScreen > div{
        padding: 7px 15px;
        border: none;
        border-radius: 20px;
        text-transform: uppercase;
        cursor: pointer;
    }
    .finalScreen > h2{
        margin-top: 10px;
    }
    /*@media (max-width: 809px){
        .vocational-test .progress-bar{
            width: 95%;
        }
    }*/
</style>