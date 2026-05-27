import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue'
import Contacto from './components/Contacto.vue'
import Asesoriafinanciera from './components/Servicios1.vue'
import EstructuracionPatrimonial from './components/Servicios2.vue'
import GobiernoCorporativo from './components/Servicios3.vue'
import TransformacionOperacional from './components/Servicios4.vue'
import Nosotros from './components/Nosotros.vue'
import AvisoLegal from './components/AvisoLegal.vue'
import PoliticaPrivacidad from './components/PoliticaPrivacidad.vue'
import TerminosServicio from './components/TerminosServicio.vue'

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
        { path: '/aviso-legal', name: 'avisoLegal', component: AvisoLegal },
        { path: '/politica-de-privacidad', name: 'politicaPrivacidad', component: PoliticaPrivacidad },
        { path: '/terminos-de-servicio', name: 'terminosServicio', component: TerminosServicio },
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
