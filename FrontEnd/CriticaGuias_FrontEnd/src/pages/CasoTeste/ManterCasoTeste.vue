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

        <q-expansion-item
          expand-separator
          label="Dados falsos preenchidos manualmente"
          class="bg-blue"
        >
          <q-card>
            <q-card-section>
              <caso-teste-dependencia
                ref="casoTesteDependencia"
                :criticaId="casoTeste.criticaId"
                :casoTesteId="casoTeste.casoTesteId"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-btn
          color="primary"
          label="Salvar e prosseguir"
          @click="salvaCasoTesteDependencia"
        />
      </q-step>

      <q-step
        :name="3"
        title="Parametros de execução da crítica"
        icon="add_comment"
        :done="step > 3"
      >
        <caso-teste-parametro-execucao
          ref="casoTesteParametroExecucao"
          :criticaId="casoTeste.criticaId"
          :casoTesteId="casoTeste.casoTesteId"
        />
        <q-btn
          color="primary"
          label="Salvar e prosseguir"
          @click="salvaCasoTesteParametroExecucao"
        />
      </q-step>

      <q-step :name="4" title="Resultado esperado" icon="add_comment">
        <q-input
          v-model="casoTeste.nmeEsperado"
          type="text"
          label="Resultado esperado"
          filled
        />

        <q-btn
          color="green"
          label="Salvar e gerar caso de teste"
          @click="salvaResultadoEsperado"
        />
      </q-step>
    </q-stepper>
  </div>
</template>


<script lang="ts">
import BuildMock from "../BuildMock/components/BuildMock.vue";
import { Component, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../models/_modelsInput";
import { TesteValidacaoService } from "../../services/TesteValidacaoService";
import { CasoTesteService } from "../../services/CasoTesteService";
import CasoTesteParametroExecucao from "./components/CasoTesteParametroExecucao.vue";
import CasoTesteDependencia from "./components/CasoTesteDependencia.vue";
@Component({
  components: { BuildMock, CasoTesteParametroExecucao, CasoTesteDependencia },
})
export default class ManterCasoTeste extends Vue {
  private _casoTesteService!: CasoTesteService;
  private _testeValidacaoService!: TesteValidacaoService;

  step: number = 1;
  public casoTeste: _modelsInput.CasoTeste = {
    criticaId: null,
    casoTesteSituacaoId: null,
    nmeEsperado: null,
    nmeCasoTeste: null,
    casoTesteId: null,
  };

  async created() {
    this._casoTesteService = new CasoTesteService();
    this._testeValidacaoService = new TesteValidacaoService();
    this.casoTeste.criticaId = this.$route.params.criticaId;
    if (this.$route.params.casoTesteId) {
      this.casoTeste = await this._casoTesteService.recuperaPorId(
        this.$route.params.casoTesteId
      );
    }
  }

  public prosseguir() {
    this.$refs.stepper.next();
  }

  public voltar() {
    this.$refs.stepper.previous();
  }

  public salvaCasoTesteParametroExecucao() {
    this.$refs.casoTesteParametroExecucao.salvaCasoTesteParametroExecucao();
    this.prosseguir();
  }

  public salvaCasoTesteDependencia() {
    this.$refs.casoTesteDependencia.salvaValorColunaDependencia();
    this.prosseguir();
  }
  public salvaNomeCasoTeste() {
    if (this.casoTeste.casoTesteId > 0) {
      this.atualizaNomeCasoTeste();
    } else {
      this.adicionaNovoCasoTeste();
    }
  }

  public adicionaNovoCasoTeste() {
    this._casoTesteService
      .adicionar(this.casoTeste)
      .then((result: any) => {
        debugger

        this.$q.notify(result);

        if (result.progress) {
          this.casoTeste.casoTesteId = result.objResult.casoTesteId;

          this.prosseguir();
        }
      })
      .catch((err: any) => {
        console.log("catch");

        console.log(err);
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
        debugger
        this.$q.notify(result);

        if (result.progress) {
          this.prosseguir();
        }
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  public async salvaResultadoEsperado() {
    let atualizaResultadoEsperado =
      await this._casoTesteService.atulaizaNmeEsperado(this.casoTeste);

    let geraCasoTeste =
      await this._testeValidacaoService.executarTestePorCasoTeste(
        this.casoTeste
      );

    this.$router.push({
      name: `casoTesteList`,
      params: { criticaId: this.casoTeste.criticaId },
    });
  }
}
</script>

<style>
</style>