<template>
  <header>
    <div class="logo" @click="Animation">
        <video ref="animation" class="animated-logo">
            <source src="../assets/logo_animation.mp4" type="video/mp4" />
        </video>
    </div>
    <nav>
      <router-link to="/">Início</router-link>
      <router-link to="/teste-vocacional">Teste vocacional</router-link>
      <router-link to="/noticias">Notícias</router-link>
      <router-link to="/sobre-nos">Sobre nós</router-link>
    </nav>
  </header>
</template>

<script>
export default {
    methods: {
        Animation() {
            const video = this.$refs.animation
            if(video.currentTime === 0 || video.paused){
                video.currentTime = 0;
                video.play();
            }
        }
    }
};
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        padding: 0 4%;
    }
    .logo{
        cursor: pointer;
    }
    .logo video{
        height: 100px;
    }
    header nav a{
        padding: 0 13px;
        color: black;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
    }

    header nav a.router-link-active {
        color: var(--logo-color);
    }
    @media (max-width: 740px){
        
    }
</style>