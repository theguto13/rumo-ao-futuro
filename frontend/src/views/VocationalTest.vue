<template>
    <div id="VocationalTest">
        <div class="vocational-test" v-if="erro == false && error == undefined">
            <div class="title">Teste Vocacional Gratuito</div>
            <div class="progress"></div>
            <div class="ui">
                <div class="question">
                    
                </div>
                <div class="controls">
                    <div class="options">

                    </div>
                    <div class="buttons">

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
            questions: undefined,
            qtd_questions: undefined,
            areas: undefined,
            erro: false,
            error: undefined
        }
    },
    mounted() {
        axios.get('http://localhost:8080/questions').then(res => {
            this.questions = res.data.questions
            console.log(this.questions.length)
            this.qtd_questions = this.questions.length
            axios.get('http://localhost:8080/questions/areas').then(res => {
                this.areas = res.data.areas.map((area) => ({
                    ...area,
                    points: 0
                }))
            }).catch((error) => {
                this.error = error //'Ocorreu um erro ao carregar as questões do quiz. Entre em contato com nossa equipe e avise-nos.'
            })
        }).catch((error) => {
            this.error = error //'Ocorreu um erro ao carregar as questões do quiz. Entre em contato com nossa equipe e avise-nos.'
        })
    }
}
</script>

<style scoped>
    
</style>