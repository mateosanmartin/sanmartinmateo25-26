import NotFound from "../components/NotFound.vue";
import PaginaInicio from "../components/PaginaInicio.vue"
import GestionClientes from "../components/GestionClientes.vue";
import NotiCias from "../components/NotiCias.vue";
import AvisoLegal from "../components/AvisoLegal.vue";
import PoliticaPrivacidad from "../components/PoliticaPrivacidad.vue";
import ModeLos from "../components/ModeLos.vue";
import TaLler from "../components/CitasTaller.vue";
import { createRouter, createWebHistory } from "vue-router";
import { Model } from "mongoose";
import TablaLogin from "../components/TablaLogin.vue";


const routes = [
    {
        path: '/',
        name: 'Inicio',
        component : PaginaInicio
    },
    {
        path: '/clientes',
        name: 'GestionClientes',
        component: GestionClientes
    }, 
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/noticias',
        name: 'NotiCias',
        component: NotiCias
    },
    {
        path: '/modelos',
        name: 'ModeLos',
        component: ModeLos
    },
    {
        path: '/taller',
        name: 'TaLler',
        component: TaLler
    },
    {
        path: '/AvisoLegal',
        name: 'AvisoLegal',
        component: AvisoLegal
    },
    {
        path: '/PoliticaPrivacidad',
        name: 'PoliticaPrivacidad',
        component: PoliticaPrivacidad
    },
    {
        path: '/login',
        name: 'login',
        component: TablaLogin
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router