<template>
  <div class="q-pa-md">
    <q-expansion-item
      v-for="dependencia in storedProcedureDependenciaList"
      v-bind:key="dependencia.storedProcedureDependenciaId"
      expand-separator
      :label="dependencia.nmeDependencia"
      class="bg-warning"
       header-class="text-black text-h6"
    >
      <q-card bordered>
        <q-card-section> 
            <caso-teste-dependencia-coluna 
              :ref="'casoTesteDependenciaColuna_' + dependencia.storedProcedureDependenciaId"
              :storedProcedureDependenciaId="dependencia.storedProcedureDependenciaId"
              :casoTesteId="casoTesteId"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../../models/_modelsInput";
import { StoredProcedureDependenciaService } from "../../../services/StoredProcedureDependenciaService";
import CasoTesteDependenciaColuna from "./CasoTesteDependenciaColuna.vue"
@Component({
  components: { CasoTesteDependenciaColuna },
})
export default class CasoTesteDependencia extends Vue {
  @Prop()
  storedProcedureId: number;

  @Prop()
  casoTesteId : number

  private _storedProcedureDependenciaService!: StoredProcedureDependenciaService;
  private storedProcedureDependenciaList: _modelsInput.StoredProcedureDependencia[] =
    [];

  public recuperaListagem() {
    this._storedProcedureDependenciaService
      .listar(this.storedProcedureId)
      .then((result: any) => {
        this.storedProcedureDependenciaList = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._storedProcedureDependenciaService =
      new StoredProcedureDependenciaService();
    this.recuperaListagem();
  }

  public salvaValorColunaDependencia(){

     
     // this.$refs.casoTesteDependenciaColuna.salvaValorColunaDependencia()
  }
}
</script>

<style>
</style>