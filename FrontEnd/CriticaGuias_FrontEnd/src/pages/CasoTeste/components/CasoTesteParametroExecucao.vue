<template>
  <div>
    <q-input
      v-model="parametroExecucao.valorParametroExecucao"
      v-for="parametroExecucao in casoTesteParametroExecucaoList"
      v-bind:key="parametroExecucao.storedProcedureParametroId"
      type="text"
      :label="parametroExecucao.nmeParametro"
      filled
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../../models/_modelsInput";
import { CasoTesteParametroExecucaoService } from "../../../services/CasoTesteParametroExecucaoService";

@Component
export default class CasoTesteParametroExecucao extends Vue {
  @Prop()
  storedProcedureId: number;

  @Prop()
  casoTesteId: number;

  private _casoTesteParametroExecucaoService!: CasoTesteParametroExecucaoService;
  private casoTesteParametroExecucaoList: _modelsInput.CasoTesteParametroExecucao[] =
    [];

  public recuperaListagem() {
    this._casoTesteParametroExecucaoService
      .listarPorCasoTeste(this.casoTesteId)
      .then((result: any) => {
        this.casoTesteParametroExecucaoList = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._casoTesteParametroExecucaoService =
      new CasoTesteParametroExecucaoService();
    this.recuperaListagem();
  }

  salvaCasoTesteParametroExecucao() {
    this.casoTesteParametroExecucaoList.forEach((x) => {
      x.casoTesteId = this.casoTesteId
      this._casoTesteParametroExecucaoService
        .adicionar(x)
        .catch((err: any) => {
          this.$q.notify(err);
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    });
  }
}
</script>

<style>
</style>