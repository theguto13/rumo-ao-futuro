import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import HomeView from '../views/HomeView.vue'
import VocationalTest from '../views/VocationalTest.vue'
import News from '../views/News.vue'
import NewsScreen from '../views/NewsScreen.vue'
import NewsDescription from '../views/NewsDescription.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import AdminHome from '../views/AdminHome.vue'
import CreateNews from '../views/CreateNews.vue'
import AuthorNews from '../views/AuthorNews.vue'
import AdminNewsView from '../views/AdminNewsView.vue'
import AdminNewsEdit from '../views/AdminNewsEdit.vue'
import AdminAreas from '../views/AdminAreas.vue'
import AdminQuestions from '../views/AdminQuestions.vue'

function adminAuth(to, from, next){
    if(localStorage.getItem('token') != undefined){
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:8080/auth", req).then(() => {
            next()
        }).catch(() => {
            next("/login")
        })
    }else{
        next("/login");
    }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/teste-vocacional',
    name: 'vocational-test',
    component: VocationalTest
  },
  {
    path: '/noticias',
    name: 'news',
    component: News,
    children: [
        {
            path: '',
            name: 'news-home',
            component: NewsScreen
        },
        {
            path: '/:slug',
            name: 'news-description',
            component: NewsDescription
        }
    ]
  },
  {
    path: '/sobre-nos',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: adminAuth,
    children: [
        {
            path: '',
            name: 'admin-home',
            component: AdminHome
        },
        {
            path: 'create-news',
            name: 'create-news',
            component: CreateNews
        },
        {
            path: 'my-news',
            name: 'my-news',
            component: AuthorNews
        },
        {
            path: 'news/:id',
            name: 'newsview',
            component: AdminNewsView,
            props: true
        },
        {
            path: 'edit/:id',
            name: 'newsedit',
            component: AdminNewsEdit,
            props: true
        },
        {
            path: '/areas',
            name: 'areas',
            component: AdminAreas
        },
        {
            path: '/questions',
            name: 'questions',
            component: AdminQuestions
        }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
