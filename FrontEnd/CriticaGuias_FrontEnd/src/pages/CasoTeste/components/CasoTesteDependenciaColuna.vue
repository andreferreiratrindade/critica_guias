<template>
  <div class="q-pa-md">

           <q-input
      v-model="coluna.valorColunaMock"
      v-for="coluna in storedProcedureDependenciaColunaList"
      v-bind:key="coluna.storedProcedureDependenciaColunaId"
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
  storedProcedureDependenciaId: number;
  private _casoTesteColunaMockService!: CasoTesteColunaMockService;

  public storedProcedureDependenciaColunaList: _modelsInput.CasoTesteDependenciaColuna[] =
    [];

  public recuperaListagem() {
    this._casoTesteColunaMockService
      .listar(this.casoTesteId, this.storedProcedureDependenciaId)
      .then((result: any) => {
        this.storedProcedureDependenciaColunaList = result;
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

    this.storedProcedureDependenciaColunaList.forEach(x=>{

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