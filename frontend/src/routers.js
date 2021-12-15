import {createRouter, createWebHistory} from "vue-router"
import store from "./store";
import Home from "./components/Home";
import CreateArticle from "./components/CreateArticle";
import ArticleDetails from "./components/ArticleDetails";
import ArticleEdit from "./components/ArticleEdit";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import MyAccount from "./components/MyAccount";
import ChangePassword from "./components/ChangePassword";
import ProfileEdit from "@/components/ProfileEdit";



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
  },
  { path: '/log-out',
    name:  "LogOut",
    component: LogOut,
  },
  { path: '/my-account',
    name:  "MyAccount",
    component: MyAccount,
    meta: {
    requireLogin: true
    }
  },
  { path: '/change-password',
    name:  "ChangePassword",
    component: ChangePassword
  },
  { path: '/profile-edit',
    name:  "ProfileEdit",
    component: ProfileEdit,
    meta: {
    requireLogin: true
    }
  }
]

const router = createRouter({
        history: createWebHistory(),
        routes
    }
)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/log-in')
  } else {
    next()
  }
})


export default router;