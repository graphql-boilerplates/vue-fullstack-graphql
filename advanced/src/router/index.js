import Vue from 'vue'
import Router from 'vue-router'
import DetailPage from 'components/DetailPage'
import FeedPage from 'components/FeedPage'
import CreatePage from 'components/CreatePage'
import DraftsPage from 'components/DraftsPage'
import SignupPage from 'components/SignupPage'
import LoginPage from 'components/LoginPage'
import NotFoundPage from 'components/NotFoundPage'
import { checkAuth } from '../utils'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Feed',
      component: FeedPage
    },{
        path: '/detail/:id',
        name: 'Detail',
        component: DetailPage
    },{
        path: '/create',
        name: 'Create',
        secure: true,
        component: CreatePage,
    },{
        path: '/drafts',
        name: 'Drafts',
        secure: true,
        component: DraftsPage,
    },{
        path: '/login',
        name: 'Login',
        unAuth: true,
        component: LoginPage
    },{
        path: '/signup',
        name: 'Signup',
        unAuth: true,
        component: SignupPage
    },{   path: '*', 
        component: NotFoundPage 
    }
  ]
})