 <template>
 <div class="relative-position">
    <q-item class="bg-grey-3">
      <q-btn flat round color="black" icon="arrow_back" @click="voltar()" />
      <q-item-section class="text-subtitle1 text-black"
        >Casos de teste</q-item-section
      >
    </q-item>
  <div class="q-pa-md">
    

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="playlist_play" color="blue" @click="executarTestesPorStoredProcedure">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>Testar todos os casos</strong>
        </q-tooltip>
      </q-btn>
      <q-btn fab icon="add" color="positive" @click="novoCasoTeste">
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>Casos de teste</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>

    <q-table title="" :data="casoTestes" :columns="columns" row-key="name">
      <template v-slot:body-cell-nroStoredProcedure="props">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TesteValidacaoService } from "../../services/TesteValidacaoService";
import { _modelsInput } from "./../../models/_modelsInput";
import { CasoTesteService } from "./../../services/CasoTesteService";
@Component
export default class CasoTesteList extends Vue {
  private _casoTesteService!: CasoTesteService;
  private _testeValidacaoService !: TesteValidacaoService;
  private storedProcedureId: number = 0;
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
      .listar(this.storedProcedureId)
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
    this._testeValidacaoService = new TesteValidacaoService();
    this.storedProcedureId = this.$route.params.storedProcedureId;
    this.recuperaListagem();
  }

  public editarCasoTeste(casoTesteId: number) {
    this.$router.push({
      name: `atualizarCasoTeste`,
      params: { casoTesteId: casoTesteId, storedProcedureId: this.storedProcedureId },
    });
  }

  public novoCasoTeste() {
    this.$router.push({
      name: `novoCasoTeste`,
      params: { storedProcedureId: this.storedProcedureId },
    });
  }

  public executarTestesPorStoredProcedure(){
    this._testeValidacaoService
      .executarTestePorStoredProcedure({storedProcedureId:this.storedProcedureId})
      .then((result: any) => {
        this.recuperaListagem();
        this.$q.notify(result);
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  public voltar() {
    this.$router.push({
      name: `criticaList`
    });
  }
}
</script>

<style>
</style>