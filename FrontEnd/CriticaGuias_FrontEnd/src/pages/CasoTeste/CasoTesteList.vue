 <template>
  <div class="q-pa-md">
    Casos de teste

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="positive" @click="novoCasoTeste">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>Casos de teste</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-table title="" :data="casoTestes" :columns="columns" row-key="name">
      <template v-slot:body-cell-nroCritica="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-casoTesteId="props">
        <q-td :props="props">
          <q-btn
            round
            color="primary"
            icon="edit"
            @click="editarCasoTeste(props.value)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { _modelsInput } from "./../../models/_modelsInput";
import { CasoTesteService } from "./../../services/CasoTesteService";
@Component
export default class CasoTesteList extends Vue {
  private _casoTesteService!: CasoTesteService;
  private criticaId: number = 0;
  public casoTestes: any[] = [];
  public columns: any[] = [
    {
      name: "nmeCasoTeste",
      align: "left",
      label: "Descrição",
      field: "nmeCasoTeste",
    },
    {
      name: "nmeCasoTesteSituacao",
      align: "center",
      label: "Situação",
      field: "nmeCasoTesteSituacao",
    },
    {
      name: "nmeEsperado",
      label: "Esperado",
      align: "left",

      field: "nmeEsperado",
    },
    {
      name: "nmeAtual",
      label: "Atual",
      align: "left",

      field: "nmeAtual",
    },
    { name: "casoTesteId", align: "center", label: "", field: "casoTesteId" },
  ];

  public recuperaListagem() {
    this._casoTesteService
      .listar(this.criticaId)
      .then((result: any) => {
        this.casoTestes = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._casoTesteService = new CasoTesteService();
    this.criticaId = this.$route.params.criticaId;
    this.recuperaListagem();
  }

  public editarCasoTeste(casoTesteId: number) {
    this.$router.push({
      name: `manterCasoTeste`,
      params: { casoTesteId: casoTesteId, criticaId: this.criticaId },
    });
  }

  public novoCasoTeste() {
    this.$router.push({
      path: `manterCasoTeste`,
      params: { criticaId: this.criticaId },
    });
  }
}
</script>

<style>
</style>