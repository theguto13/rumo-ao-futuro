<template>
    <div id="AdminNewsView">
        <Back viewName="Descrição da notícia" previewsRoute="my-news" />
        <div class="alert alert-danger d-flex align-items-center" v-if="erro == true">
            Ocorreu um erro. Tente novamente mais tarde.
        </div>
        <div class="news">
            <h1 class="title col-8 col-lg-6">{{ news.title }}</h1>
            <p class="subtitle col-8 col-lg-6">{{ news.subtitle }}</p>
            <div class="head col-8 col-lg-6">
                <div class="signature">
                    <h6 class="author">
                        por {{ news.author }}
                    </h6>
                    <div class="date">
                        <p>{{ news.publishedDate }} • <span v-if="news.updatedDate != undefined && news.updatedDate != null">Atualizado {{ news.updatedDate }}</span></p>
                    </div>
                </div>
                <div class="controls">
                    <button class="btn btn-danger delete" data-bs-toggle="modal" data-bs-target="#deleteModal"><img src="../assets/delete.svg" alt="Ícone de lixeira"></button>
                    <a :href="'/admin/edit/' + this.newsid" class="btn btn-warning edit" ><img src="../assets/edit.svg" alt="Ícone de editar" width="23" height="23"></a>
                </div>
            </div>
            <div v-html="news.content" class="content col-8 col-lg-6"></div>
        </div>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteModalLabel">Excluir notícia</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Você tem certeza que deseja excluir a notícia abaixo?</p>
                    <h4>{{ news.title }}</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="Delete()">Excluir</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Back from '../components/AdminBack.vue'
import axios from 'axios'

export default{
    name: 'AdminNewsView',
    data() {
        return {
            newsid: undefined,
            news: [],
            erro: false
        }
    },
    methods: {
        Delete(){
            const token = localStorage.getItem('token')
            if(token){
                var req = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
                axios.delete(`http://localhost:8080/news/delete/${this.newsid}`, req).then(() => {
                    this.$router.push({name: 'my-news'})
                }).catch(error => {
                    console.log(error)
                    this.erro = true
                })
            }
        }
    },
    created() {
        this.newsid = this.$route.params.id
        const token = localStorage.getItem('token')
            if(token){
                var req = {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
                if(this.newsid != undefined){
                    axios.get(`http://localhost:8080/news/byid/${this.newsid}`, req).then(res => {
                        if(res.data.news.title != undefined){
                            this.news = res.data.news
                            const dateObj = new Date(res.data.news.publishedDate);
                            const day = String(dateObj.getUTCDate()).padStart(2, '0')
                            const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
                            const year = dateObj.getUTCFullYear()
                            const hours = String(dateObj.getUTCHours()).padStart(2, '0')
                            const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
                            const formattedDate = `${day}/${month}/${year} ${hours}h${minutes}`
                            this.news.publishedDate = formattedDate

                            if(res.data.news.updatedDate != undefined && res.data.news.updatedDate != null){
                                const dateObj = new Date(res.data.news.updatedDate);
                                const day = String(dateObj.getUTCDate()).padStart(2, '0')
                                const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
                                const year = dateObj.getUTCFullYear()
                                const hours = String(dateObj.getUTCHours()).padStart(2, '0')
                                const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
                                const formattedDate = `${day}/${month}/${year} ${hours}h${minutes}`
                                this.news.updatedDate = formattedDate
                            }else{
                                this.news.updatedDate = undefined
                            }
                        }else{
                            this.$router.push({name: 'my-news'})
                        }
                    }).catch(() => {
                        this.$router.push({name: 'my-news'})
                    })
                }else{
                    this.$route.push({name: 'my-news'})
                }
            }
    },
    components: {
        Back
    }
}
</script>

<style scoped>
    .news > *{
        margin: 0 auto;
    }
    .news .subtitle{
        color: #555;
    }
    .news .head{
        margin: 10px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .news .head h5{
        margin: 0;
    }
    .news .head .date > p{
        margin: 0;
        font-size: .85rem;
        color: #555;
    }
    .delete{
        padding: 6.75px 12.5px;
    }
    .edit{
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        padding: 6px 8px;
        margin-left: 5px;
    }
</style>