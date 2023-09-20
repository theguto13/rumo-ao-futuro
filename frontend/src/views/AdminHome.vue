<template>
    <div id="AdminHome">
        <div class="painel row text-center">
            <a class="col-xxl-3 col-md-6 col-12 text-decoration-none" @click="component('create-news')">
                <div class="card card1">
                    <div class="card-icon mt-1 mb-1"></div>
                    <div class="card-text">
                        <h4>Nova notícia</h4>
                    </div>
                </div>
            </a>
            <a class="col-xxl-3 col-md-6 col-12 text-decoration-none" @click="component('my-news')">
                <div class="card card2">
                    <div class="card-icon mt-1 mb-1"></div>
                    <div class="card-text">
                        <h4>Minhas notícias</h4>
                    </div>
                </div>
            </a>
            <a class="col-xxl-3 col-md-6 col-12 text-decoration-none" @click="component('areas')">
                <div class="card card3">
                    <div class="card-icon mt-1 mb-1"></div>
                    <div class="card-text">
                        <h4>Áreas de conhecimento do quiz</h4>
                    </div>
                </div>
            </a>
            <a class="col-xxl-3 col-md-6 col-12 text-decoration-none" @click="component('questions')">
                <div class="card card4">
                    <div class="card-icon mt-1 mb-1"></div>
                    <div class="card-text">
                        <h4>Questões do quiz</h4>
                    </div>
                </div>
            </a>
        </div>
        <router-view />
    </div>
</template>

<script>
export default{
    name: 'AdminHome',
    data() {
        return {

        }
    },
    methods: {
        component(componentName){
            this.$router.push({name: componentName})
        }
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
        margin-top: calc(var(--bs-gutter-x) * 0.5);
        margin-bottom: calc(var(--bs-gutter-x) * 0.5);
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
    .painel .card3 .card-icon{
        background-image: url(../assets/areas.svg);
    }
    .painel .card4 .card-icon{
        background-image: url(../assets/questions.svg);
    }
    @media (max-width: 768px){
        .painel > a.col-12{
            margin: 8px auto;
        }
    }
</style>