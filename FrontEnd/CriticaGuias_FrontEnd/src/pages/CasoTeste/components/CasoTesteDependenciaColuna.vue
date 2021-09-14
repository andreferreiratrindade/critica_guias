<template>
  <div class="q-pa-md">

           <q-input
      v-model="coluna.valorColunaMock"
      v-for="coluna in criticaTabelaDependenciaColunaList"
      v-bind:key="coluna.criticaTabelaDependenciaColunaId"
      type="text"
      :label="coluna.nmeColuna"
      filled
    />

       
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../../models/_modelsInput";
import { CasoTesteColunaMockService } from "../../../services/CasoTesteColunaMockService";

@Component
export default class CasoTesteDependenciaColuna extends Vue {
  @Prop()
  casoTesteId: number;

  @Prop()
  criticaTabelaDependenciaId: number;
  private _casoTesteColunaMockService!: CasoTesteColunaMockService;

  public criticaTabelaDependenciaColunaList: _modelsInput.CasoTesteDependenciaColuna[] =
    [];

  public recuperaListagem() {
    this._casoTesteColunaMockService
      .listar(this.casoTesteId, this.criticaTabelaDependenciaId)
      .then((result: any) => {
        this.criticaTabelaDependenciaColunaList = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._casoTesteColunaMockService = new CasoTesteColunaMockService();
    this.recuperaListagem();
  }

  public async  salvaValorColunaDependencia(){

    this.criticaTabelaDependenciaColunaList.forEach(x=>{

        this._casoTesteColunaMockService.adicionar(x)
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
    })
  }
}
</script>

<style>
</style>