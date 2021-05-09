
<template>
  <div>
    <q-chip
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
export default class ParametroCard extends Vue {

    @Prop()
     parametro !: _modelsOutput.Parametro 




}
</script>
        
        <style>
</style>