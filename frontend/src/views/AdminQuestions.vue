<template>
    <div id="AdminQuestions">
        <AdminBack viewName="Questões do teste vocacional" previewsRoute="admin-home" />
        <ul class="list-group list-group-horizontal">
            <li class="list-group-item col-5"><b>Questão</b></li>
            <li class="list-group-item col-4"><b>Área</b></li>
            <li class="list-group-item col-2"><b>Pontos</b></li>
            <li class="list-group-item col-1"><b>Excluir</b></li>
        </ul>
        <div class="questions-container" v-if="loaded == true">
            <div class="question" v-for="question in questions" :key="question.id">
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item col-5 d-flex align-items-center">
                        {{ question.question }}
                    </li>
                    <li class="list-group-item col-4 d-flex align-items-center">
                        {{ getAreaNameById(question.area) }}
                    </li>
                    <li class="list-group-item col-2 d-flex align-items-center">
                        {{ question.points }}
                    </li>
                    <li class="list-group-item col-1 d-flex align-items-center justify-content-center">
                        <a class="btn btn-danger delete" data-bs-toggle="modal" :data-bs-target="'#modal'+question.id"><img src="../assets/delete.svg" alt="Ícone de excluir" width="15"></a>
                    </li>
                </ul>
                <div class="modal fade" :id="'modal'+question.id" tabindex="-1" aria-labelledby="ModalDeleteQuestion" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="ModalDeleteQuestion">Excluir questão</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Você tem certeza que deseja excluir essa questão?
                                <div class="container">
                                    <ul class="list-group list-group-horizontal">
                                        <li class="list-group-item col-8 d-flex align-items-center">
                                            {{ question.question }}
                                        </li>
                                        <li class="list-group-item col-4 d-flex align-items-center">
                                            {{ getAreaNameById(question.area) }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <a @click="Delete(question.id)" data-bs-dismiss="modal" type="button" class="btn btn-danger">Excluir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="mt-5 mb-3">Cadastrar nova questão</h3>
            <form @submit.prevent="Create()">
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item col-5">Questão</li>
                    <li class="list-group-item col-4">Área</li>
                    <li class="list-group-item col-2">Pontos</li>
                    <li class="list-group-item col-1">Criar</li>
                </ul>
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item col-5 d-flex align-items-center">
                        <input type="text" class="form-control" placeholder="Questão" v-model="form_question">
                    </li>
                    <li class="list-group-item col-4 d-flex align-items-center">
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ form_area }}
                            </button>
                            <ul class="dropdown-menu areas_dropdown">
                                <li v-for="area in areas" :key="area.id"><a class="dropdown-item" @click="form_area = area.area; form_areaid = area.id">{{ area.area }}</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="list-group-item col-2 d-flex align-items-center">
                        <input type="number" class="form-control" v-model="form_points">
                    </li>
                    <li class="list-group-item col-1 d-flex align-items-center justify-content-center">
                        <button type="submit" class="btn btn-success">Criar</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<script>
import AdminBack from '@/components/AdminBack.vue';
import axios from 'axios'

export default{
    name: 'AdminQuestions',
    data() {
        return {
            questions: [],
            areas: [],
            form_question: '',
            form_area: 'Área da questão',
            form_areaid: undefined,
            form_points: 0,
            loaded: false
        }
    },
    methods: {
        getAreaNameById(areaId) {
            const area = this.areas.find((a) => a.id === areaId)
            return area ? area.area : 'Área não encontrada'
        },
        Create(){
            const token = localStorage.getItem('token');
            if (token) {
                var req = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
                if(this.form_question != undefined && this.form_question != '' && this.form_question != ' ' && this.form_area != 'Área da questão' && this.form_areaid != undefined && this.form_points > 0){
                    axios.post('http://localhost:8080/questions/new', {
                        question: this.form_question,
                        area: this.form_areaid,
                        points: this.form_points
                    }, req).then(() => {
                        axios.get('http://localhost:8080/questions', req).then(res => {
                            this.questions = res.data.questions
                        })
                    })
                }
            }
        },
        Delete(id){
            const token = localStorage.getItem('token');
            if (token) {
                var req = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
                axios.delete(`http://localhost:8080/questions/delete/${id}`, req).then(() => {
                    axios.get('http://localhost:8080/questions', req).then(res => {
                        this.questions = res.data.questions
                    })
                })
            }
        }
    },
    created(){
        const token = localStorage.getItem('token');
        if (token) {
            var req = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            axios.get('http://localhost:8080/questions', req).then(res => {
                this.questions = res.data.questions
                axios.get('http://localhost:8080/questions/areas', req).then(res => {
                    this.areas = res.data.areas
                    this.loaded = true
                })
            })
        }
    },
    components: {
        AdminBack
    }
}
</script>

<style scoped>
    .areas_dropdown{
        cursor: pointer;
    }
</style>