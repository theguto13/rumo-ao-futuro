<template>
    <div id="Login">
        <div v-if="(erro != undefined) && response" class="alert alert-danger">
            {{ erro }}
        </div>
        <form @submit.prevent="Login()">
            <h2>Login</h2>
            <span>Usuário</span>
            <input type="text" class="form-control" placeholder="username" v-model="username">
            <span>Senha</span>
            <input type="password" class="form-control" placeholder="********" v-model="password">
            <button type="submit" class="btn btn-success">Entrar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            erro: undefined,
            response: false
        }
    },
    methods: {
        Login(){
            axios.post('http://localhost:8080/login', {
                username: this.username,
                password: this.password
            }).then(res => {
                if(res.data.erro != undefined){
                    this.erro = res.data.erro
                }else{
                    localStorage.removeItem('token')
                    localStorage.setItem('token', res.data.token)
                    this.erro = undefined
                    this.$router.push({name: 'admin-home'})
                }
                this.response = true
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
    form{
        margin: 15px 0;
        padding: 0 4%;
        text-align: center;
    }
    form span{
        display: block;
        margin: 0 auto;
        text-align: left;
        width: 35%;
        font-weight: bold;
    }
    form input{
        margin: 4px auto 12px auto;
        width: 35%;
    }
    .alert{
        margin: 15px 4%;
    }
</style>