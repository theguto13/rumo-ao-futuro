<template>
    <div id="AdminBack">
        <div class="back-container">
            <button class="back" @click="back()"><img src="../assets/back.svg" alt="Botão de voltar"></button>
            <h3>{{ viewName }}</h3>
        </div>
    </div>
</template>

<script>
export default{
    name: 'AdminBack',
    methods: {
        back(){
            if(this.previewsRoute == undefined || this.previewsRoute == '' || this.previewsRoute == ' '){
                this.$router.push({name: 'admin-home'})
            }else{
                this.$router.push({name: this.previewsRoute})
            }
        }
    },
    props: {
        viewName: String,
        previewsRoute: String
    }
}
</script>

<style scoped>
    .back-container{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 16px;
    }
    .back-container > h3{
        margin: -3px 7px 0 7px;
    }
    .back{
        margin: 0;
        cursor: pointer;
        padding: 10px;
        border-radius: 100%;
        width: 48px;
        height: 48px;
        border: none;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .1s all;
    }
    .back:hover{
        background-color: #bbbbbb62;
    }
</style>