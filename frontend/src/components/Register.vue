<template>
    <div id="Register">
        <div v-if="(erro == undefined) && response" class="alert alert-success" role="Alerta de sucesso">
            Usuário cadastrado com sucesso!
        </div>
        <div v-else-if="(erro != undefined) && response" class="alert alert-danger">
            {{ erro }}
        </div>
        <form>
            <h2>Registro de administrador</h2>
            <span>Usuário</span>
            <input type="text" class="form-control" placeholder="username" v-model="username">
            <span>Primeiro e último nome</span>
            <input type="text" class="form-control" placeholder="username" v-model="name">
            <span>Senha</span>
            <input type="password" class="form-control" placeholder="********" v-model="password">
            <span>Repita a senha</span>
            <input type="password" class="form-control" placeholder="********" v-model="passwordRepeat">
            <span>Senha mestra</span>
            <input type="password" class="form-control" placeholder="********" v-model="master">
            <a class="btn btn-success" @click="Register()">Registrar</a>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    data() {
        return {
            username: '',
            name: '',
            password: '',
            passwordRepeat: '',
            master: '',
            erro: undefined,
            response: false
        }
    },
    methods: {
        Register(){
            axios.post('http://localhost:8080/register', {
                username: this.username,
                name: this.name,
                password: this.password,
                passwordRepeat: this.passwordRepeat,
                master: this.master
            }).then(res => {
                if(res.data.erro != undefined){
                    this.erro = res.data.erro
                }else{
                    this.$emit('logged-in', true);
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