import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import Contacto from './Contacto.vue'
import Asesoriafinanciera from './Servicios1.vue'
import EstructuracionPatrimonial from './Servicios2.vue'
import GobiernoCorporativo from './Servicios3.vue'
import TransformacionOperacional from './Servicios4.vue'
import Nosotros from './Nosotros.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/contacto', name: 'contacto', component: Contacto },
        { path: '/Asesoriafinanciera', name: 'Asesoriafinanciera', component: Asesoriafinanciera },
        {
            path: '/estructuracion-patrimonial',
            name: 'estructuracionPatrimonial',
            component: EstructuracionPatrimonial,
        },
        {
            path: '/gobierno-corporativo',
            name: 'gobiernoCorporativo',
            component: GobiernoCorporativo,
        },
        {
            path: '/transformacion-operacional',
            name: 'transformacionOperacional',
            component: TransformacionOperacional,
        },
        { path: '/miembros', name: 'nosotros', component: Nosotros },
    ],
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 90,
            }
        }

        return { top: 0 }
    },
})

export default router
