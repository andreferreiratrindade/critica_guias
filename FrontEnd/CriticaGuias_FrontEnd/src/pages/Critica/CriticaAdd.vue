<template>
  <div>
    <q-input
      v-model="critica.nroCritica"
      type="text"
      label="N° Critica"
      filled
      require
      autofocus
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
      autofocus
      lazy-rules
      focus
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
      autofocus
      lazy-rules
      focus
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
import { _modelsInput } from "./../../models/_modelsInput";
import { CriticaService } from "./../../services/CriticaService";

@Component
export default class Critica extends Vue {
  private _criticaService!: CriticaService;
  public critica: _modelsInput.Critica = {
    nmeCritica: null,
    desCritica: null,
    nroCritica: null,
  };

  public salvar() {
    this._criticaService
      .adicionar(this.critica)
      .then((result: any) => {

        if(result.ok){
          this.$router.push({
          path: `criticaParametro/${result.obj.idCritica}`
          })
        }
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