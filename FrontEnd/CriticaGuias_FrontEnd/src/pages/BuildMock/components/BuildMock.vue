<template>
    <q-expansion-item
      expand-separator
      label="Dados falsos preenchidos automaticamente"
      class="bg-blue"
       header-class="text-white text-h6"

    >
      <q-card bordered>
        <q-card-section>
          <prestador-build-mock />
          <beneficiario-build-mock />
        </q-card-section>
      </q-card>
    </q-expansion-item>
</template>
<script lang="ts">
import PrestadorBuildMock from "./PrestadorBuildMock.vue";
import BeneficiarioBuildMock from "./BeneficiarioBuildMock.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { PrestadorBuildMock, BeneficiarioBuildMock },
})
export default class BuildMock extends Vue {
}
</script>

<style>
</style>