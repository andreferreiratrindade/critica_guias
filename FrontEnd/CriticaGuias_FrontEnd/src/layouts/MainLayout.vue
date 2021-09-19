<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          StoredProcedure guias
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
     
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        </q-item-label>
       
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

const linksData = [
  
  
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    link: '/#/'
  },
    {
    title: 'Avaliação',
    caption: '',
    icon: 'school',
    link: '/#/AvaliacaoConteudo' 
  },
  {
    title: 'Manutenção',
    caption: '',
    icon: 'settings',
    link: '/#/Conteudo'
  },{
    title: 'Minha conta',
    caption: '',
    icon: 'perm_identity',
    link: '/#/MinhaConta'
  },
];

import { Vue, Component } from 'vue-property-decorator';

@Component
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksData;
}
</script>
