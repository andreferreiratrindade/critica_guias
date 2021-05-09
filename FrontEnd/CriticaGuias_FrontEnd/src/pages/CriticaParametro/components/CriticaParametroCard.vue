
<template>
  <div>
    <q-chip
      removable
      @remove="deletaCriticaParametro"
      :color="parametro.desCorParametro"
    >
      {{ parametro.nmeParametro }}
    </q-chip>
  </div>
</template>
        
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { _modelsOutput } from "../../../models/_modelsOutput";

@Component
export default class CriticaParametroCard extends Vue {

  @Prop({ default: () => false })
  parametro!: _modelsOutput.CriticaParametro;

  @Prop({ type: Function})
	readonly deletar!: Function;

  deletaCriticaParametro(row: any) {
    console.log(this.parametro.idCriticaParametro);
    this.deletar(this.parametro.idCriticaParametro);
  }
}
</script>
        
        <style>
</style>