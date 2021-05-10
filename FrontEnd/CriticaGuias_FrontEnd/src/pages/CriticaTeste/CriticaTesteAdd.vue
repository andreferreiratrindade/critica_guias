<template>
  <div class="q-pa-md row">
    <div class="col-3">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        Parametros
      </p>

      <draggable
        :list="parametros"
        :animation="200"
        ghost-class="ghost-card"
        :group="{ name: 'parametros', pull: 'clone', put: false }"
      >
        <parametro
          v-for="parametro in parametros"
          :key="parametro.idParametro"
          :parametro="parametro"
          class="mt-3 cursor-move"
        >
        </parametro>
      </draggable>
    </div>
    <div class="col-8">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        Regras da crítica
      </p>

      <draggable
        :list="criticaParametros"
        :animation="200"
       
        group="parametros"
        class="col-10 row"
        @change="salvaCriticaParametro"
      >
        <critica-parametro-card
          v-for="criticaParametro in criticaParametros"
          :key="criticaParametro.idCriticaParametro"
          :parametro="criticaParametro"
          :deletar="deletarCriticaParametro"
          class="mt-3 cursor-move"
        >
        </critica-parametro-card>
      </draggable>
    </div>

  <div class="col-12">
    <div align="right" class="bg-white text-teal">
          <q-btn color="primary" label="Validar parametros" @click="salvar"/>
          <q-btn color="primary" label="Testar crítica" @click="testeDeCritica"/>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ParametroService } from "../../services/ParametroService";
import { CriticaParametroService } from "../../services/CriticaParametroService";

import { _modelsInput } from "../../models/_modelsInput";
import { CriticaTesteService } from "../../services/CriticaTesteService";
@Component
export default class CriticaTesteAdd extends Vue {
    private _criticaTesteService!: CriticaTesteService;


  private idCritica: number = 0;
  parametros: any[] = [];
  // Recupera parametros

  criticaParametros: any[] = [];
  criticaParametro: _modelsInput.CrticaParametro = {
    idParametro: null,
    seqCriticaParametro: null,
    idCritica: null,
    idCriticaParametro: null,
  };
  

  created() {
    this._criticaTesteService = new CriticaTesteService();
    this.idCritica = this.$route.params.idCritica;
  }
}
</script>

<style>
.column-width {
  min-width: 320px;
  width: 320px;
}

.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>