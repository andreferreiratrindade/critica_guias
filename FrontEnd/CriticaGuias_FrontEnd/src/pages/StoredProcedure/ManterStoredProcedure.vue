 <template>
  <div class="relative-position">
    <q-item class="bg-grey-3">
          <q-btn
        flat
        round
        color="black"
        icon="arrow_back"
        @click="voltar()"
      />
      <q-item-section class="text-subtitle1 text-black"
        >Manter StoredProcedure</q-item-section
      >
    </q-item>
    <div class="q-pa-md">
      <q-input
        v-model="storedProcedureParametro.nmeStoredProcedure"
        type="text"
        label="Nome Crítica"
        filled
        require
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Campo de preenchimento obrigatório',
        ]"
      />

      <q-btn color="primary" label="Adicionar" @click="salvar" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../models/_modelsInput";
import { StoredProcedureService } from "../../services/StoredProcedureService";

@Component
export default class StoredProcedure extends Vue {
  private _storedProcedureParametroService!: StoredProcedureService;
  public storedProcedureParametro: _modelsInput.StoredProcedure = {
    nmeStoredProcedure: null,
    storedProcedureId : null
  };

  public salvar() {
    this._storedProcedureParametroService
      .adicionar(this.storedProcedureParametro)
      .then((result: any) => {
        this.$router.push({
          name: `storedProcedureParametroList`,
        });

        this.$q.notify(result);
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._storedProcedureParametroService = new StoredProcedureService();
  }

  public voltar() {
    this.$router.push({
      name: `storedProcedureParametroList`
    });
  }
}
</script>

<style>
</style>