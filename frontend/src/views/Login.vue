<template>
    <div id="Login">
        <div class="alert alert-warning visitor" role="Aviso" v-if="currentComponent == 'Login' && closeAlert == false">
            <div class="first">
                <div class="icon"><img src="../assets/info.svg" alt="Ícone de aviso"></div>
                <div class="text">Essa área é dedicada para a administração desse site, se você entrou aqui por engano, <router-link to="/">clique aqui</router-link> para voltar ao site.</div>
            </div>
            <a @click="close()" class="close"><img src="../assets/close.svg" alt="Ícone de fechar"></a>
        </div>
        <div>
            <Login v-if="currentComponent == 'Login'" />
            <Register v-else-if="currentComponent == 'Register'" />
            <div class="switch">
                <a class="lnk" v-if="currentComponent == 'Login'" @click="switchMode()">Cadastrar um novo administrador</a>
                <a class="lnk" v-else-if="currentComponent == 'Register'" @click="switchMode()">Fazer login</a>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

export default {
    name: 'Admin',
    data() {
        return {
            currentComponent: 'Login',
            logged: false,
            closeAlert: false
        }
    },
    created() {
        var closeAlert = localStorage.getItem('closeAlert')
        if(closeAlert == 'true'){
            this.closeAlert = true
        }else if(closeAlert == 'false'){
            this.closeAlert = false
        }
    },
    methods: {
        close(){
            localStorage.setItem('closeAlert', 'true')
            this.closeAlert = true
        },
        switchMode(){
            this.closeAlert = true
            if(this.currentComponent === 'Login'){
                this.currentComponent = 'Register'
            }else if(this.currentComponent === 'Register'){
                this.currentComponent = 'Login'
            }
        }
    },
    components: {
        Login,
        Register
    }
}
</script>

<style scoped>
    .visitor{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .alert{
        margin: 15px 4%;
    }
    .alert *{
        display: inline-block;
    }
    .alert img{
        width: 26px;
    }
    .close{
        cursor: pointer;
        padding: 10px;
        border-radius: 100%;
        transition: .1s all;
    }
    .close:hover{
        background-color: #c9b5793b;
    }
    .alert .text{
        vertical-align: middle;
        margin-left: 8px;
    }
    .switch{
        text-align: center;
        padding-bottom: 20px;
    }
    .switch > .lnk{
        text-decoration: underline;
        color: var(--primary-color);
        cursor: pointer;
    }
</style>