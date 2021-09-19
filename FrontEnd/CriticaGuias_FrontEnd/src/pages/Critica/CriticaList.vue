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
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>StoredProcedures</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-table title="" :data="criticas" :columns="columns" row-key="name">
      <template v-slot:body-cell-nroStoredProcedure="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-storedProcedureId="props">
        <q-td :props="props">
         <q-btn round color="primary" icon="timeline" @click="visualizarCasoTeste(props.value)"/>
        </q-td>
      </template>
    </q-table>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoredProcedureService } from "../../services/StoredProcedureService";
import { _modelsInput } from "./../../models/_modelsInput";

@Component
export default class StoredProcedureList extends Vue {
  private _criticaService!: StoredProcedureService;
  private storedProcedureId: number = 0;
  public criticas: any[] = [];

  public columns: any[] = [
    {
      name: "nroStoredProcedure",
      align: "center",
      label: "N° StoredProcedure",
      field: "nroStoredProcedure",
    },
    { name: "nmeStoredProcedure", align: "center", label: "Nome", field: "nmeStoredProcedure" },
    {
      name: "nmeStoredProcedure",
      align: "center",
      label: "Stored Procedure",
      field: "nmeStoredProcedure",
    },
    { name: "storedProcedureId", align: "center", label: "", field: "storedProcedureId" },
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
    this._criticaService = new StoredProcedureService();
    this.recuperaListagem();
  }

  public Novo() {
    this.$router.push({
      path: `ManterStoredProcedure`,
    });
  }

  public visualizarCasoTeste(storedProcedureId : number){
       this.$router.push({
      path: `casoTeste/CasoTesteList/${storedProcedureId}`,
    });
  }
}
</script>

<style>
</style>