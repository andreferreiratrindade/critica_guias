import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Critica/CriticaList.vue'), name:"criticaList" },
      { path: 'ManterCritica', name: "ManterCritica", component: () => import('pages/Critica/ManterCritica.vue') },
      { path: 'casoTeste/casoTesteList/:criticaId', name: "casoTesteList", component: () => import('pages/CasoTeste/casoTesteList.vue') },
      { path: 'casoTeste/casoTesteList/:criticaId/manterCasoTeste/:casoTesteId', name: "atualizarCasoTeste", component: () => import('pages/CasoTeste/manterCasoTeste.vue') },
      { path: 'casoTeste/casoTesteList/:criticaId/manterCasoTeste', name: "novoCasoTeste", component: () => import('pages/CasoTeste/manterCasoTeste.vue') },
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
