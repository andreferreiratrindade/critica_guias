 <template>
  <div class="relative-position">
    <q-item class="bg-grey-3">
      <q-item-section class="text-subtitle1 text-black"
        >StoredProcedures</q-item-section
      >
    </q-item>
    <div class="q-pa-md">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="positive" @click="Novo">
          <q-tooltip
            anchor="center left"
            self="center right"
            :offset="[10, 10]"
          >
            <strong>StoredProcedures</strong>
          </q-tooltip>
        </q-btn>
      </q-page-sticky>

      <q-table
        title=""
        :data="storedProcedureList"
        :columns="columns"
        row-key="name"
      >
      
      <template v-slot:body-cell-casoTesteFalhou="props">
         <q-td :props="props">
           <q-badge color="red" v-if="props.value == 1">
      Falhou
    </q-badge>

    <q-badge color="green" v-if="props.value != 1">
      Passou
    </q-badge>
         </q-td>
      </template>
        <template v-slot:body-cell-storedProcedureId="props">
          <q-td :props="props">
            <q-btn
              round
              color="primary"
              icon="timeline"
              @click="visualizarCasoTeste(props.value)"
            />

            <q-btn
              round
              color="primary"
              icon="fact_check"
              @click="visualizarCobertura(props.value)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <visualizar-cobertura ref="visualizarCobertura"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoredProcedureService } from "../../services/StoredProcedureService";
import { _modelsInput } from "../../models/_modelsInput";
import VisualizarCobertura from "../Cobertura/VisualizarCobertura.vue";
@Component({
  components: { VisualizarCobertura },
})
export default class StoredProcedureList extends Vue {
  private _storedProcedureService!: StoredProcedureService;
  private storedProcedureId: number = 0;
  public storedProcedureList: any[] = [];

  public columns: any[] = [
    {
      name: "nmeStoredProcedure",
      align: "center",
      label: "Stored Procedure",
      field: "nmeStoredProcedure",
    },
   
    {
      name: "totalCasoTeste",
      align: "center",
      label: "Total caso de teste",
      field: "totalCasoTeste",
    },
    {
      name: "casoTesteFalhou",
      align: "center",
      label: "Situação do casos de teste",
      field: "casoTesteFalhou",
    },
    {
      name: "percentualCoberto",
      align: "center",
      label: "Cobertura %",
      field: "percentualCoberto",
    },
     {
      name: "storedProcedureId",
      align: "center",
      label: "",
      field: "storedProcedureId",
    },
  ];

  public recuperaListagem() {
    this._storedProcedureService
      .listar()
      .then((result: any) => {
        this.storedProcedureList = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._storedProcedureService = new StoredProcedureService();
    this.recuperaListagem();
  }

  public Novo() {
    this.$router.push({
      path: `ManterStoredProcedure`,
    });
  }

  public visualizarCobertura(storedProcedureId: number){
    
    (this.$refs.visualizarCobertura as Vue & { show(storedProcedureId:number):boolean}).show(storedProcedureId);
  }

  public visualizarCasoTeste(storedProcedureId: number) {
    this.$router.push({
      path: `casoTeste/CasoTesteList/${storedProcedureId}`,
    });
  }
}
</script>

<style>
</style>