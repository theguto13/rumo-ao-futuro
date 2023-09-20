<template>
    <div id="VocationalTest">
        <div class="vocational-test">
            
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
            areas: undefined,
            erro: false,
            error: undefined
        }
    },
    mounted() {
        axios.get('http://localhost:8080/questions').then(res => {
            this.questions = res.data.questions
            axios.get('http://localhost:8080/questions/areas').then(res => {
                this.areas = res.data.areas.map((area) => ({
                    ...area,
                    points: 0,
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