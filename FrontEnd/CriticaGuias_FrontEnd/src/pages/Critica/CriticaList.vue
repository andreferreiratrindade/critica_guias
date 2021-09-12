<template>
  <div class="q-pa-md">
    Criticas
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="positive" @click="Novo">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>Criticas</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-table title="" :data="criticas" :columns="columns" row-key="name">
      <template v-slot:body-cell-nroCritica="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-criticaId="props">
        <q-td :props="props">
         <q-btn round color="primary" icon="shopping_cart" @click="visualizarCasoTeste(props.value)"/>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CriticaService } from "../../services/CriticaService";
import { _modelsInput } from "./../../models/_modelsInput";
import { CriticaTesteService } from "./../../services/CriticaTesteService";

@Component
export default class CriticaList extends Vue {
  private _criticaService!: CriticaService;
  private criticaId: number = 0;
  public criticas: any[] = [];

  public columns: any[] = [
    {
      name: "nroCritica",
      align: "center",
      label: "N° Critica",
      field: "nroCritica",
    },
    { name: "nmeCritica", align: "center", label: "Nome", field: "nmeCritica" },
    {
      name: "nmeStoredProcedure",
      align: "center",
      label: "Stored Procedure",
      field: "nmeStoredProcedure",
    },
    { name: "criticaId", align: "center", label: "", field: "criticaId" },
  ];

  public recuperaListagem() {
    this._criticaService
      .listar()
      .then((result: any) => {
        this.criticas = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._criticaService = new CriticaService();
    this.recuperaListagem();
  }

  public Novo() {
    this.$router.push({
      path: `ManterCritica`,
    });
  }

  public visualizarCasoTeste(criticaId : number){
       this.$router.push({
      path: `casoTeste/CasoTesteList/${criticaId}`,
    });
  }
}
</script>

<style>
</style>