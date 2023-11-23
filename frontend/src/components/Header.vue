<template>
    <header :class="{ 'nav-open': isNavOpen }">
      <div class="logo" @click="Animation">
        <video ref="animation" class="animated-logo">
          <source src="../assets/logo_animation.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="menu-icon" :class="{ 'nav-open': isNavOpen }" @click="toggleNav">&#9776;</div>
      <nav v-show="isNavOpen">
        <router-link to="/" @click="closeNav">Início</router-link>
        <router-link to="/teste-vocacional" @click="closeNav">Teste vocacional</router-link>
        <router-link to="/noticias" @click="closeNav">Notícias</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isNavOpen: false,
      };
    },
    methods: {
      Animation() {
        const video = this.$refs.animation;
        if (video.currentTime === 0 || video.paused) {
          video.currentTime = 0;
          video.play();
        }
      },
      toggleNav() {
        this.isNavOpen = !this.isNavOpen;
      },
      closeNav() {
        this.isNavOpen = false;
      },
    },
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
  
  .logo {
    cursor: pointer;
  }
  
  .logo video {
    height: 100px;
  }
  
  header nav {
    display: flex;
    align-items: center;
  }
  
  .menu-icon {
    font-size: 1.5em;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .menu-icon.nav-open {
    color: var(--logo-color);
  }
  
  nav a {
    padding: 0 13px;
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2em;
  }
  
  nav a.router-link-active {
    color: var(--logo-color);
  }
  
  @media (max-width: 610px) {
    header.nav-open nav {
      display: flex;
    }
    header nav {
      flex-direction: column;
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;
      padding: 15px 0;
      background-color: white;
      border: 1px solid #ddd;
      display: none;
      z-index: 999;
    }
    nav a {
      width: 100%;
      box-sizing: border-box;
      text-align: right;
    }
  }
  </style>
  