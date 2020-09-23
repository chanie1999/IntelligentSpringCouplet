import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import register from '@/components/register'
import slider from '@/components/auto-slider'
import yonghufankui from '@/components/yonghufankui'
import yonghugezi from '@/components/yonghugezi'
import yhgz from '@/components/yhgz'
import xiugaimima from '@/components/xiugaimima'
import springCouplet from '@/components/spring-couplet'
import home from '@/components/HomeContainer'
import swiper from '@/components/swiper'
import showuserinfo from '@/components/showuserinfo'
import editchunlian from '@/components/editchunlian'
import commentarea from '@/components/commentarea'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/hello', component: HelloWorld },
        { path: '/login', component: login },
        { path: '/register', component: register },
        { path: '/slider', component: slider },
        {
            path: '/home',
            component: home,
            children: [
                { path: '/yonghufankui', component: yonghufankui },
                {
                    path: '/userinfo',
                    component: yhgz,
                    children: [
                        { path: '/', redirect: '/showuserinfo' },
                        { path: '/showuserinfo', component: showuserinfo },
                        { path: '/changeuserinfo', component: yonghugezi }
                    ]
                },
                { path: '/xiugaimima', component: xiugaimima },
                { path: '/springcouplet', component: springCouplet },
                { path: '/swiper', component: swiper },
                { path: '/edit', component: editchunlian },
                { path: '/commentarea', component: commentarea }

            ]
        }
    ]
})