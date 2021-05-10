<template>
  <div class="q-pa-md">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="positive" @click="Novo">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>Novo teste</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { _modelsInput } from "./../../models/_modelsInput";
import { CriticaTesteService } from "./../../services/CriticaTesteService";

@Component
export default class CriticaTesteList extends Vue {
  private _criticaTesteService!: CriticaTesteService;
  private idCritica: number = 0;
  public testes: any[];

  public criticaTeste: _modelsInput.CriticaTeste = {
    nmeCritica: null,
    desCritica: null,
    nroCritica: null,
  };

  public recuperaListagem() {
    this._criticaTesteService
      .listar(this.idCritica)
      .then((result: any) => {
        this.testes = result;
        this.$q.notify(result);
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._criticaTesteService = new CriticaTesteService();
    this.idCritica = this.$route.params.idCritica;
    this.recuperaListagem();
  }

  public Novo() {
    this.$router.push({
      path: `CriticaTesteAdd/${this.$route.params.idCritica}`,
    });
  }
}
</script>

<style>
</style>