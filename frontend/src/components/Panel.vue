<template>
    <div id="Admin">
        <Welcome />
        <div class="painel row text-center">
            <a class="col-md-6 col-12 text-decoration-none" @click="component('create-news')">
                <div class="card card1">
                    <div class="card-icon mt-1 mb-1"></div>
                    <div class="card-text">
                        <h4>Nova notícia</h4>
                    </div>
                </div>
            </a>
            <a class="col-md-6 col-12 text-decoration-none" @click="component('author-news')">
                <div class="card card2">
                    <div class="card-icon mt-1 mb-1"></div>
                    <div class="card-text">
                        <h4>Minhas notícias</h4>
                    </div>
                </div>
            </a>
        </div>
        <router-view />
    </div>
</template>

<script>
import Welcome from '../components/Welcome.vue'

export default{
    name: 'Admin',
    data() {
        return {

        }
    },
    methods: {
        component(componentName){
            this.$router.push({name: componentName})
        }
    },
    components: {
        Welcome
    }
}
</script>

<style scoped>
    .painel .card{
        border-color: #283618;
    }
    .painel > a{
        height: max-content;
        cursor: pointer;
    }
    .painel .card{
        padding: 50px 0;
    }
    .painel .card .card-text h4{
        font-size: 18px;
        text-decoration: none;
        color: black;
    }
    .painel .card .card-icon{
        width: 40px;
        height: 40px;
        margin: 0 auto;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .painel .card1 .card-icon{
        background-image: url(../assets/plus.svg);
    }
    .painel .card2 .card-icon{
        background-image: url(../assets/news.svg);
    }
    @media (max-width: 768px){
        .painel > a.col-12{
            margin: 8px auto;
        }
    }
</style>