<template>
    <div id="CreateNews">
        <Back viewName="Cadastrar nova notícia" previewsRoute="admin-home" />
        <div class="alert alert-danger not_fail" role="alert" v-if="this.res == true && this.noticiaid == undefined">
            <p>Ocorreu um erro ao cadastrar a notícia.</p>
        </div>
        <div class="row">
            <form @submit.prevent="Send()" class="col-12 col-sm-10 col-lg-8 col-xl-6">
                <h4>Título da notícia</h4>
                <input type="text" v-model="title" class="form-control" placeholder="Insira o título aqui">
                <h4>Subtítulo da notícia</h4>
                <input type="text" v-model="subtitle" class="form-control" placeholder="Insira o subtítulo aqui">
                <h4>Autor da notícia</h4>
                <input type="text" v-model="author" class="form-control" disabled>
                <h4>Notícia</h4>
                <ckeditor class="custom-ckeditor" :editor="editor" v-model="content" :config="editorConfig"></ckeditor>
                <button class="btn btn-success cad_not">Cadastrar notícia</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Back from '../components/AdminBack.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    name: 'CreateNews',
    data() {
        return {
            id: undefined,
            you: '',
            title: '',
            subtitle: '',
            content: '',
            author: '',
            editor: ClassicEditor,
            editorConfig: {
                toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
            },
            res: false,
            success: false,
            erro: undefined,
            newsid: undefined
        }
    },
    methods: {
        Send(){
            const token = localStorage.getItem('token')
            if(token){
                var req = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
                axios.post('http://localhost:8080/news/create', {
                    title: this.title,
                    subtitle: this.subtitle,
                    content: this.content,
                    author: this.id
                }, req).then(res => {
                    if(res.data.erro != undefined || res.data.error != undefined){
                        if(res.data.erro != undefined){
                            this.erro = res.data.erro
                        }else{
                            this.erro = 'Ocorreu um erro.'
                        }
                    }else{
                        this.success = true
                        this.newsid = res.data.id
                        this.$router.push({
                            name: 'newsview',
                            params: {
                                id: this.newsid
                            }
                        })
                    }
                    this.res = true
                }).catch(error => {
                    console.log(error)
                    this.$router.push({name: 'login'})
                })
            }
        }
    },
    components: {
        Back
    },
    created() {
        const token = localStorage.getItem('token')
        if(token){
            var req = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            axios.get('http://localhost:8080/auth', req).then(res => {
                if(res.data.erro == undefined){
                    this.you = res.data.you
                    this.id = res.data.id
                    this.author = this.you + ' - ID: ' + this.id
                }else{
                    this.$router.push({name: 'login'})
                }
            }).catch(error => {
                console.log(error)
                this.$router.push({name: 'login'})
            })
        }
    }
}
</script>

<style scoped>
    #CreateNews {
        padding: 15px 0;
    }
    .ck-content {
        width: 75% !important;
        margin: 15px auto !important;
    }
    form{
        margin: 15px auto;
    }
    form h4{
        margin: 20px auto 8px auto;
    }
    form button{
        margin-top: 25px;
    }
    .alert > p{
        margin: 0;
    }
    .cad_not{
        width: 100%;
    }
</style>
