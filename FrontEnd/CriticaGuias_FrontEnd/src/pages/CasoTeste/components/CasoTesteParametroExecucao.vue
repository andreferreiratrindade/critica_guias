<template>
    <q-expansion-item
      expand-separator
      label="Parametros de execução da critica - "
      class="bg-blue"
    >
      <q-card>
        <q-card-section>
          <q-input
            v-model="parametroExecucao.valorParametroExecucao"
            v-for="parametroExecucao in casoTesteParametroExecucaoList"
            v-bind:key="parametroExecucao.criticaParametroId"
            type="text"
            :label="parametroExecucao.nmeParametro"
            filled
          />

        </q-card-section>
      </q-card>
    </q-expansion-item>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../../models/_modelsInput";
import {CasoTesteParametroExecucaoService} from '../../../services/CasoTesteParametroExecucaoService'

@Component
export default class CasoTesteParametroExecucao extends Vue {
  @Prop()
  criticaId:number;

  @Prop()
  casoTesteId : number;

  private _casoTesteParametroExecucaoService !: CasoTesteParametroExecucaoService;
  private casoTesteParametroExecucaoList: _modelsInput.CasoTesteParametroExecucao[] = [];

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

    this._casoTesteParametroExecucaoService = new CasoTesteParametroExecucaoService();
  this.recuperaListagem();
  }
}
</script>

<style>
</style>