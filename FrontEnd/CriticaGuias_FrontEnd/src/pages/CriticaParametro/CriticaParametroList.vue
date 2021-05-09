<template>
  <div class="q-pa-md">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="positive" @click="Novo">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>Adicionar</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CriticaParametroList extends Vue{
  public Novo() {
    this.$router.push({
      path: `CriticaParametroAdd/${this.$route.params.idCritica}`,
    });
  }
}
</script>

<style>
</style>