<template>
    <div id="Footer">
        <footer>
            <div class="logo" @click="Animation">
                <video ref="animation" class="animated-logo">
                    <source src="../assets/logo_white_animation.mp4" type="video/mp4" />
                </video>
            </div>
            <div class="footer-navbar">
                <div class="title">Navegação</div>
                <nav>
                    <router-link to="/">Início</router-link>
                    <router-link to="/teste-vocacional">Teste vocacional</router-link>
                    <router-link to="/noticias">Notícias</router-link>
                    <router-link to="/sobre-nos">Sobre nós</router-link>
                    <router-link to="/admin">Administração do site</router-link>
                </nav>
            </div>
            <div class="contact">
                <div class="title">Contato</div>
                <div class="local">
                    <img src="../assets/local.svg" alt="Ícone de ponteiro de mapa, navegação">
                    <div class="text">Rodovia SC 283, s/n Fragosos <br> Concórdia, SC, 89703-720</div>
                </div>
                <div class="mail">
                    <img src="../assets/mail.svg" alt="Ícone de e-mail">
                    <a href="mailto:contato@rumoaofuturo.com">contato@rumoaofuturo.com</a>
                </div>
            </div>
        </footer>
        <div class="copyright">Rumo ao Futuro 2023 © Todos os direitos reservados. Instituto Federal de Educação, Ciência e Tecnologia Catarinense</div>
    </div>
</template>

<script>
export default{
    methods: {
        Animation() {
            const video = this.$refs.animation
            if(video.currentTime === 0 || video.paused){
                video.currentTime = 0;
                video.play();
            }
        }
    }
}
</script>

<style scoped>
    #Footer{
        background-color: black;
    }
    footer nav a.router-link-active{
        color: var(--logo-color);
    }
    footer{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 20px 4%;
    }
    footer .title{
        color: white;
        font-weight: bold;
        font-size: 2rem;
    }
    footer .text{
        color: white;
    }
    footer .logo{
        width: 25%;
        min-width: 300px;
        cursor: pointer;
    }
    footer .logo video{
        width: 100%;
    }
    footer .footer-navbar nav{
        padding-left: 15px;
    }
    footer .footer-navbar a{
        color: white;
        text-decoration: none;
        display: block;
        font-size: 1.17em;
    }
    footer .contact img{
        height: 24px;
        display: inline-block;
        margin: 8px 5px;
    }
    footer .contact .local, footer .contact .mail{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 15px;
    }
    footer .contact .mail a{
        color: white;
        text-decoration: none;
    }
    .copyright{
        text-align: center;
        color: white;
        border-top: 1px solid rgb(200, 200, 200);
        padding: 8px 4%;
    }
    @media (max-width: 1080px){
        footer{
            flex-direction: column;
            align-items: start;
            width: max-content;
            margin: 0 auto;
        }
        footer .logo{
            margin: 0 auto;
        }
    }
    @media (max-width: 945px){
        footer .logo{
            width: 250px;
            min-width: none;
        }
        footer .contact .local .text{
            text-wrap: wrap;
        }
    }
</style>