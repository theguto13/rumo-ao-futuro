<template>
    <div id="AuthorNews">
        <Back viewName="Minhas notícias" previewsRoute="admin-home" />
        <div class="news-container">
            <div class="card" style="width: 18rem;" v-for="noticia in news" :key="noticia.id">
                <!--<img src="" class="card-img-top" alt="Vai ter uma imagem aqui!">-->
                <div class="img" :style="randomColor()"></div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{{ noticia.title }}</h5>
                    <p class="card-text">{{ you }}</p>
                    <a :href="'/admin/news/' + noticia.id" class="btn btn-primary mt-auto">Ver notícia</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Back from '../components/AdminBack.vue'
import axios from 'axios'

export default{
    name: 'AuthorNews',
    data() {
        return {
            news: []
        }
    },
    created() {
        const token = localStorage.getItem('token')
        if(token){
            var req = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            axios.get('http://localhost:8080/news/my-news', req).then(res => {
                this.news = res.data.news
                this.you = res.data.you
            }).catch(error => {
                console.log(error)
            })
        }
    },
    methods: {
        randomColor(){
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return `background-color: ${color};`;
        }
    },
    components: {
        Back
    }
}
</script>

<style scoped>
    .news-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
        padding: 0 4%;
        margin: 15px 0;
    }
    .card {
        margin: 15px;
        flex: 0 0 calc(33.3333% - 30px);
        min-width: 330px;
    }
    .img {
        height: 25vh;
    }
</style>