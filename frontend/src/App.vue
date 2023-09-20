<template>
    <div id="app">
        <div id="body">
            <Header />
            <router-view />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
    components: {
        Header,
        Footer
    }
}
</script>

<!--Estilos Globais-->
<style>
  *{
    box-sizing: border-box;
    font-family: 'Segoe UI', Arial, 'Times New Roman', sans-serif;
    margin: 0;
    padding: 0;
  }
  body{
    width: 100%;
    overflow-x: hidden;
  }
  #body{
    min-height: 70vh;
    width: 100%;
    overflow-x: hidden;
  }
  :root{
    --primary-color: #67825A;
    --secondary-color: #9BBE8A;
    --tertiary-color: #EA7EA9;
    --quaternary-color: #BA3653;
    --logo-color: #774BC4;
  }
  @media (max-width: 1586px){
    #body{
        min-height: 74vh;
    }
  }
</style>