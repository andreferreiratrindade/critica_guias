<template>
  <div class="q-pa-md">
    Manter caso de teste
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      done-color="deep-orange"
      active-color="purple"
      inactive-color="secondary"
    >
      <q-step :name="1" title="Caso de teste" icon="settings" :done="step > 1">
        <q-input
          v-model="casoTeste.nmeCasoTeste"
          type="text"
          label="Descrição do caso de teste"
          filled
        />

        <q-btn
          color="primary"
          label="Salvar e prosseguir"
          @click="salvaNomeCasoTeste"
        />
      </q-step>

      <q-step
        :name="2"
        title="Dados para testes"
        icon="create_new_folder"
        :done="step > 2"
      >
        <build-mock />
      </q-step>

      <q-step
        :name="3"
        title="Parametros de execução da crítica"
        icon="add_comment"
        :done="step > 3"
      >
        <caso-teste-parametro-execucao
          :criticaId="this.criticaId"
          :casoTesteId="this.casoTesteId"
        />
      </q-step>

      <q-step :name="4" title="Resultado esperado" icon="add_comment">
        <q-input
          v-model="casoTeste.nmeEsperado"
          type="text"
          label="Resultado esperado"
          filled
        />
      </q-step>
    </q-stepper>
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


  step: number = 1;
  private casoTeste: _modelsInput.CasoTeste = {
    criticaId: null,
    casoTesteSituacaoId: null,
    nmeEsperado: null,
    nmeCasoTeste: null,
    casoTesteId :null
  };

  async created() {
    this._casoTesteService = new CasoTesteService();
    this.criticaId = this.$route.params.criticaId;
    this.casoTesteId = this.$route.params.casoTesteId;

    if (this.$route.params.casoTesteId) {
      this.casoTeste = await this._casoTesteService.recuperaPorId(
        this.$route.params.casoTesteId
      );
    }
  }

  public prosseguir() {
    debugger
    this.$refs.stepper.next();
  }

  public voltar() {
    this.$refs.stepper.previous();
  }

public salvaNomeCasoTeste(){
  if(this.casoTeste.casoTesteId > 0 ){

      this.atualizaNomeCasoTeste();
  }else{
      this.adicionaNovoCasoTeste();
  }
}
  

  public adicionaNovoCasoTeste(){
 this._casoTesteService
      .adicionar (this.casoTeste)
      .then((result: any) => {
        this.prosseguir()
        this.$q.notify(result);
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  public atualizaNomeCasoTeste() {
    this._casoTesteService
      .atualizaNmeCasoTeste(this.casoTeste)
      .then((result: any) => {
        this.prosseguir()
        this.$q.notify(result);
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }
}
</script>

<style>
</style>