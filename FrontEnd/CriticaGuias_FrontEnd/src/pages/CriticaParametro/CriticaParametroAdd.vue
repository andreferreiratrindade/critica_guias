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
import Parametro from "./components/ParametroCard.vue";
import { Component, Vue } from "vue-property-decorator";
import { ParametroService } from "./../../services/ParametroService";
import { CriticaParametroService } from "./../../services/CriticaParametroService";
import CriticaParametroCard from "./components/CriticaParametroCard.vue";

import draggable from "vuedraggable";
import { _modelsInput } from "../../models/_modelsInput";
@Component({
  components: {
    draggable,
    Parametro,
    CriticaParametroCard
  },
})
export default class CriticaParametroAdd extends Vue {
  private _parametroService!: ParametroService;
  private _criticaParametroService!: CriticaParametroService;

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
  recuperaParametros() {
    this._parametroService
      .listar()
      .then((result) => {
        this.parametros = result;
      })
      .catch()
      .finally();
  }

  recuperaCriticaParametros() {
    this._criticaParametroService
      .listar(this.idCritica)
      .then((result) => {
        this.criticaParametros = result;
      })
      .catch()
      .finally();
  }

  created() {
    this.idCritica = parseInt(this.$route.params.idCritica);
    this._parametroService = new ParametroService();
    this._criticaParametroService = new CriticaParametroService();
    this.recuperaParametros();
    this.recuperaCriticaParametros();
  }

  salvaCriticaParametro(row: any) {
    console.log(row);
    if (row.added) {
      this.criticaParametro.seqCriticaParametro = row.added.newIndex;
      this.criticaParametro.idParametro = row.added.element.idParametro;
      this.criticaParametro.idCritica = this.idCritica;
      this._criticaParametroService.adicionar(this.criticaParametro)
      .then(async x=>{

        for (let index = row.added.newIndex+1; index < this.criticaParametros.length; index++) {
          const element = this.criticaParametros[index];
          element.seqCriticaParametro++; 
          await this._criticaParametroService.atualizar(element);
        }
        this.recuperaCriticaParametros();
      });
    } else {
      let criticaParametroNovo: any = {};
      criticaParametroNovo.seqCriticaParametro = row.moved.newIndex;
      criticaParametroNovo.idCriticaParametro =
        row.moved.element.idCriticaParametro;

      this._criticaParametroService.atualizar(criticaParametroNovo);

      let criticaParametroAntigo: any = {};

      criticaParametroAntigo.seqCriticaParametro = row.moved.oldIndex;
      criticaParametroAntigo.idCriticaParametro = this.criticaParametros[
        row.moved.newIndex
      ].idCriticaParametro;
      this._criticaParametroService.atualizar(criticaParametroAntigo);
    }
  }

  deletarCriticaParametro(idCriticaParametro:number){

    this._criticaParametroService.excluir(idCriticaParametro).then(async ()=>{

        let indexCriticaParametro = this.criticaParametros
                                  .filter(x=> {
                                            return x.idCriticaParametro == idCriticaParametro
                                            })[0].seqCriticaParametro;
      
        for (let index = indexCriticaParametro+1; index < this.criticaParametros.length; index++) {
          const element = this.criticaParametros[index];
          element.seqCriticaParametro = index - 1; 
          await this._criticaParametroService.atualizar(element);
        }
        this.recuperaCriticaParametros();

    })  
  }

  testeDeCritica(){
    this.$router.push({
      path: `CriticaTesteList/${this.$route.params.idCritica}`,
    });
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