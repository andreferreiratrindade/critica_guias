import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Critica/CriticaList.vue') },
      { path: 'criticaAdd', name: "criticaAdd", component: () => import('pages/Critica/CriticaAdd.vue') },
      { path: 'criticaParametroList/:idCritica', name: "criticaParametroList", component: () => import('pages/CriticaParametro/criticaParametroList.vue') },
      { path: 'criticaParametroAdd/:idCritica', name: "criticaParametroAdd", component: () => import('pages/CriticaParametro/criticaParametroAdd.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
