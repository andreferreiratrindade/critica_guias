 <template>
  <div class="relative-position">
    <q-item class="bg-grey-3">
      <q-btn
        flat
        round
        color="black"
        icon="arrow_back"
        @click="voltarPaginaCasoTeste()"
      />
      <q-item-section class="text-subtitle1 text-black"
        >Manter caso de teste</q-item-section
      >
    </q-item>
    <div class="q-pa-md">
      <div class="q-gutter-sx row">
        <div class="col-12">
          <q-stepper
            v-model="step"
            ref="stepper"
            animated
            done-color="deep-orange"
            active-color="purple"
            inactive-color="secondary"
            class="col-md-12"
          >
            <q-step
              :name="1"
              title="Caso de teste"
              icon="settings"
              :done="step > 1"
            >
              <q-input
                v-model="casoTeste.nmeCasoTeste"
                type="text"
                label="Descrição do caso de teste"
                filled
              />
              <div class="row justify-end">
                <div class="col-6">
                  <q-btn
                    label="Salvar e prosseguir"
                    class="q-mt-md float-right"
                    color="positive"
                    @click="salvaNomeCasoTeste"
                  />
                </div>
              </div>
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
                header-class="text-white text-h6"
              >
                <q-card bordered>
                  <q-card-section>
                    <caso-teste-dependencia
                      ref="casoTesteDependencia"
                      :storedProcedureId="casoTeste.storedProcedureId"
                      :casoTesteId="casoTeste.casoTesteId"
                    />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <div class="row justify-end">
                <div class="col-6">
                  <q-btn
                    flat
                    color="blue"
                    @click="voltar"
                    label="Voltar"
                    class="q-mt-md"
                  />
                </div>
                <div class="col-6">
                  <q-btn
                    label="Salvar e prosseguir"
                    class="q-mt-md float-right"
                    color="primary"
                    @click="salvaCasoTesteDependencia"
                  />
                </div>
              </div>
            </q-step>

            <q-step
              :name="3"
              title="Parametros de execução da crítica"
              icon="add_comment"
              :done="step > 3"
            >
              <caso-teste-parametro-execucao
                ref="casoTesteParametroExecucao"
                :storedProcedureId="casoTeste.storedProcedureId"
                :casoTesteId="casoTeste.casoTesteId"
              />
              <div class="row justify-end">
                <div class="col-6">
                  <q-btn
                    flat
                    color="blue"
                    @click="voltar"
                    label="Voltar"
                    class="q-mt-md"
                  />
                </div>
                <div class="col-6">
                  <q-btn
                    label="Salvar e prosseguir"
                    class="q-mt-md float-right"
                    color="primary"
                    @click="salvaCasoTesteParametroExecucao"
                  />
                </div>
              </div>
            </q-step>

            <q-step :name="4" title="Resultado esperado" icon="add_comment">
              <q-input
                v-model="casoTeste.nmeEsperado"
                type="text"
                label="Resultado esperado"
                filled
              />
              <div class="row justify-end">
                <div class="col-6">
                  <q-btn
                    flat
                    color="blue"
                    @click="voltar"
                    label="Voltar"
                    class="q-mt-md"
                  />
                </div>
                <div class="col-6">
                  <q-btn
                    label="Salvar e gerar caso de teste"
                    class="q-mt-md float-right"
                    color="positive"
                    @click="salvaResultadoEsperado"
                  />
                </div>
              </div>
            </q-step>
          </q-stepper>
        </div>
      </div>
    </div>
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
    storedProcedureId: null,
    casoTesteSituacaoId: null,
    nmeEsperado: null,
    nmeCasoTeste: null,
    casoTesteId: null,
  };

  async created() {
    this._casoTesteService = new CasoTesteService();
    this._testeValidacaoService = new TesteValidacaoService();
    this.casoTeste.storedProcedureId = this.$route.params.storedProcedureId;
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

    this.voltarPaginaCasoTeste();
  }

  public voltarPaginaCasoTeste() {
    this.$router.push({
      name: `casoTesteList`,
      params: { storedProcedureId: this.casoTeste.storedProcedureId },
    });
  }
}
</script>

<style>
</style>