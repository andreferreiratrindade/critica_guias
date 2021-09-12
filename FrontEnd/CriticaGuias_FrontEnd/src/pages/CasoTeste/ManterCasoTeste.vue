<template>
  <div class="q-pa-md">
    Manter caso de teste

    <build-mock />
    <caso-teste-parametro-execucao
      :criticaId="this.criticaId"
      :casoTesteId="this.casoTesteId"
    />

        <q-expansion-item
      expand-separator
      label="Resultado esperado"
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

  </div>
</template>

<script lang="ts">
import BuildMock from "../BuildMock/components/BuildMock.vue";
import { Component, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../models/_modelsInput";
import { CasoTesteService } from "../../services/CasoTesteService";
import CasoTesteParametroExecucao from "./components/CasoTesteParametroExecucao.vue";
@Component({
  components: { BuildMock, CasoTesteParametroExecucao },
})
export default class ManterCasoTeste extends Vue {
  private _casoTesteService!: CasoTesteService;
  private criticaId: number = 0;
  private casoTesteId: number = 0;
  private casoTeste: _modelsInput.CasoTeste = {
    criticaId: null,
    CasoTesteSituacaoId: null,
    NmeCasoTeste: null,
    NmeEsperado: null,
  };

  created() {
    this._casoTesteService = new CasoTesteService();
    debugger;
    this.criticaId = this.$route.params.criticaId;
    this.casoTesteId = this.$route.params.casoTesteId;
  }
}
</script>

<style>
</style>