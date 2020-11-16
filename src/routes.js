// static
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//pages

import Home from '@/pages/Home'
import NotFound from '@/pages/404'
import Example from '@/pages/Example'


// Routering

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/example',
            name: 'Home',
            component: Example
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
})