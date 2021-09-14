<template>
  <div class="q-pa-md">
    <q-expansion-item
      v-for="dependencia in criticaTabelaDependenciaList"
      v-bind:key="dependencia.criticaTabelaDependenciaId"
      expand-separator
      :label="dependencia.nmeTabela"
      class="bg-warning"
    >
      <q-card>
        <q-card-section> 
            <caso-teste-dependencia-coluna 
              :ref="'casoTesteDependenciaColuna_' + dependencia.criticaTabelaDependenciaId"
              :criticaTabelaDependenciaId="dependencia.criticaTabelaDependenciaId"
              :casoTesteId="casoTesteId"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../../models/_modelsInput";
import { CriticaTabelaDependenciaService } from "../../../services/CriticaTabelaDependenciaService";
import CasoTesteDependenciaColuna from "./CasoTesteDependenciaColuna.vue"
@Component({
  components: { CasoTesteDependenciaColuna },
})
export default class CasoTesteDependencia extends Vue {
  @Prop()
  criticaId: number;

  @Prop()
  casoTesteId : number

  private _criticaTabelaDependenciaService!: CriticaTabelaDependenciaService;
  private criticaTabelaDependenciaList: _modelsInput.CriticaTabelaDependencia[] =
    [];

  public recuperaListagem() {
    this._criticaTabelaDependenciaService
      .listar(this.criticaId)
      .then((result: any) => {
        this.criticaTabelaDependenciaList = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._criticaTabelaDependenciaService =
      new CriticaTabelaDependenciaService();
    this.recuperaListagem();
  }

  public salvaValorColunaDependencia(){

     
     // this.$refs.casoTesteDependenciaColuna.salvaValorColunaDependencia()
  }
}
</script>

<style>
</style>