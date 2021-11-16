import {createRouter, createWebHistory} from "vue-router"
import Home from "./components/Home";
import CreateArticle from "./components/CreateArticle";
import ArticleDetails from "./components/ArticleDetails";
import ArticleEdit from "./components/ArticleEdit";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

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
  },
  { path: '/edit/:slug',
    name:  "articledit",
    component: ArticleEdit,
    props:true
  },
  { path: '/sign-up',
    name:  "SignUp",
    component: SignUp,
  },
  { path: '/log-in',
    name:  "LogIn",
    component: LogIn,
  }

]

const router = createRouter({
        history: createWebHistory(),
        routes,
    }
)

export default router;