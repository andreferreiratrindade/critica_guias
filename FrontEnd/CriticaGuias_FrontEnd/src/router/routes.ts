import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/StoredProcedure/StoredProcedureList.vue'), name:"criticaList" },
      { path: 'ManterStoredProcedure', name: "ManterStoredProcedure", component: () => import('pages/StoredProcedure/ManterStoredProcedure.vue') },
      { path: 'casoTeste/casoTesteList/:storedProcedureId', name: "casoTesteList", component: () => import('pages/CasoTeste/casoTesteList.vue') },
      { path: 'casoTeste/casoTesteList/:storedProcedureId/manterCasoTeste/:casoTesteId', name: "atualizarCasoTeste", component: () => import('pages/CasoTeste/manterCasoTeste.vue') },
      { path: 'casoTeste/casoTesteList/:storedProcedureId/manterCasoTeste', name: "novoCasoTeste", component: () => import('pages/CasoTeste/manterCasoTeste.vue') },
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
