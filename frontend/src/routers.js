import {createRouter, createWebHistory} from "vue-router"
import Home from "./components/Home";
import CreateArticle from "./components/CreateArticle";
import ArticleDetails from "./components/ArticleDetails";


const routes = [
  { path: '/',
    name: "home",
    component: Home,
  },
  { path: '/create',
    name:  "create",
    component: CreateArticle,
  },
  { path: '/details/:slug',
    name:  "details",
    component: ArticleDetails,
    props:true
  }

]

const router = createRouter({
        history: createWebHistory(),
        routes,
    }
)

export default router;