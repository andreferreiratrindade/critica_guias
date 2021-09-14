<template>
 <div class="q-pa-md">
    Manter Criticas
    <q-input
      v-model="critica.nroCritica"
      class="col-2"
      type="text"
      label="N° Critica"
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
      v-model="critica.nmeCritica"
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
      v-model="critica.desCritica"
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
          <q-btn color="primary" label="Adicionar" @click="salvar"/>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../models/_modelsInput";
import { CriticaService } from "../../services/CriticaService";

@Component
export default class Critica extends Vue {
  private _criticaService!: CriticaService;
  public critica: _modelsInput.Critica = {
    nmeCritica: null,
    desCritica: null,
    nroCritica: null,
    nmeStoredProcedure : null,
    criticaId : null
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
    this._criticaService = new CriticaService();
  }
}
</script>

<style>
</style>