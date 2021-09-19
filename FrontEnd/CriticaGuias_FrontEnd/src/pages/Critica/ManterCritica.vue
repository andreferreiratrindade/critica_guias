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
        v-model="critica.nroStoredProcedure"
        class="col-2"
        type="text"
        label="N° StoredProcedure"
        filled
        require
        lazy-rules
        focus
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Campo de preenchimento obrigatório',
        ]"
      />

      <q-input
        v-model="critica.nmeStoredProcedure"
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

      <q-input
        v-model="critica.desStoredProcedure"
        type="text"
        label="Descrição"
        filled
        require
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Campo de preenchimento obrigatório',
        ]"
      />

      <q-input
        v-model="critica.nmeStoredProcedure"
        type="text"
        label="Stored Procedure"
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
  private _criticaService!: StoredProcedureService;
  public critica: _modelsInput.StoredProcedure = {
    nmeStoredProcedure: null,
    desStoredProcedure: null,
    nroStoredProcedure: null,
    nmeStoredProcedure: null,
    storedProcedureId: null,
  };

  public salvar() {
    this._criticaService
      .adicionar(this.critica)
      .then((result: any) => {
        this.$router.push({
          name: `criticaList`,
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
    this._criticaService = new StoredProcedureService();
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