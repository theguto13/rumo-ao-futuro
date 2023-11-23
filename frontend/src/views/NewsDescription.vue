<template>
    <div id="NewsDescription">
        <div class="news" v-if="loaded">
            <h1 class="title col-8 col-lg-7">{{ news.title }}</h1>
            <p class="subtitle col-8 col-lg-7">{{ news.subtitle }}</p>
            <div class="head col-8 col-lg-7">
                <div class="signature">
                    <h6 class="author">
                        por {{ news.author }}
                    </h6>
                    <div class="date">
                        <p>{{ news.publishedDate }} • <span v-if="news.updatedDate != undefined && news.updatedDate != null">Atualizado {{ news.updatedDate }}</span></p>
                    </div>
                </div>
                <div class="social-media">
                    <img src="../assets/socialmedia_whatsapp.svg" class="whatsapp" alt="Compartilhar no WhatsApp">
                    <img src="../assets/socialmedia_facebook.svg" class="facebook" alt="Compartilhar no Facebook">
                    <img src="../assets/socialmedia_share.svg" class="share" alt="Compartilhar a notícia">
                </div>
            </div>
            <div v-html="news.content" class="content col-8 col-lg-6"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'NewsDescription',
    data() {
        return {
            newsSlug: undefined,
            news: undefined,
            loaded: false
        }
    },
    created() {
        this.newsSlug = this.$route.params.slug
        if(this.newsSlug != undefined && this.newsSlug != '' && this.newsSlug != null){
            axios.get(`http://localhost:8080/news/byslug/${this.newsSlug}`).then(res => {
                if(res.data.news.title != undefined){
                    this.news = res.data.news
                    const dateObj = new Date(res.data.news.publishedDate);
                    const day = String(dateObj.getUTCDate()).padStart(2, '0')
                    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
                    const year = dateObj.getUTCFullYear()
                    const hours = String(dateObj.getUTCHours()).padStart(2, '0')
                    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
                    const formattedDate = `${day}/${month}/${year} ${hours}h${minutes}`
                    this.news.publishedDate = formattedDate

                    if(res.data.news.updatedDate != undefined && res.data.news.updatedDate != null){
                        const dateObj = new Date(res.data.news.updatedDate);
                        const day = String(dateObj.getUTCDate()).padStart(2, '0')
                        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
                        const year = dateObj.getUTCFullYear()
                        const hours = String(dateObj.getUTCHours()).padStart(2, '0')
                        const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
                        const formattedDate = `${day}/${month}/${year} ${hours}h${minutes}`
                        this.news.updatedDate = formattedDate
                    }else{
                        this.news.updatedDate = formattedDate
                    }

                    this.loaded = true
                }else{
                    this.$router.push({name: 'news-home'})
                }
            }).catch(() => {
                this.$router.push({name: 'news-home'})
            })
        }
    }
}
</script>

<style scoped>
    .news > *{
        margin: 0 auto;
    }
    .news .subtitle{
        color: #555;
    }
    .news .head{
        margin: 10px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .news .head h5{
        margin: 0;
    }
    .news .head .date > p{
        margin: 0;
        font-size: .85rem;
        color: #555;
    }
    .news .head .social-media img{
        width: 34px;
        height: 34px;
        margin: 0 3px;
        cursor: pointer;
    }
    .news .head .social-media img.share{
        width: 28px;
        height: 28px;
    }
</style>