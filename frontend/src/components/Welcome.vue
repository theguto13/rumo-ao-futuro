<template>
    <div id="Welcome">
        <div class="alert alert-success hello" role="Painel de usuário">
            <div class="first">
                <div class="icon"><img src="../assets/account.svg" alt="Ícone de conta/usuário"></div>
                <div class="text"><span>Bem vindo(a),</span> {{ you }}.</div>
            </div>
            <a class="icon" @click="logout()"><img id="logoff" src="../assets/logout.svg" alt="Ícone de logout/sair"></a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'Welcome',
    data() {
        return {
            you: '',
            id: undefined
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('token')
            this.$router.push({name: 'login'})
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
            axios.get('http://localhost:8080/auth', req).then(res => {
                if(res.data.erro != undefined || res.data.error != undefined){
                    this.$router.push({name: 'login'})
                }else{
                    this.id = res.data.id
                    this.you = res.data.you
                }
            })
        }else{
            this.$router.push({name: 'login'})
        }
    },
}
</script>

<style scoped>
    .alert.hello{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .alert *{
        display: inline-block;
    }
    .alert img{
        width: 26px;
    }
    .alert #logoff{
        cursor: pointer;
    }
    .alert.hello > .icon{
        cursor: pointer;
        padding: 10px;
        border-radius: 100%;
        transition: .1s all;
    }
    .alert.hello > .icon:hover{
        background-color: #4a7f6633;
    }
    .alert .text{
        vertical-align: middle;
        margin-left: 8px;
    }
    @media (max-width: 380px){
        .alert .text span{
            display: none;
        }
    }
</style>