
<template>
  <div class="q-pa-md">
    <q-expansion-item expand-separator label="Prestadores" class="bg-blue">
      <q-card>
        <q-card-section>
          <q-table
            title=""
            :data="prestadores"
            :columns="columns"
            row-key="name"
          >
          </q-table>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../../models/_modelsInput";
import { BuildMockService } from "../../../services/BuildMockService";

@Component
export default class PrestadorBuildMock extends Vue {
  private _buildMockService!: BuildMockService;
  private prestadores: _modelsInput.PrestadorBuildMock[] = [];

  public columns: any[] = [
    {
      name: "prestadorId",
      align: "left",
      label: "Prestador ID",
      field: "prestadorId",
    },
    {
      name: "nmeRazaoSocial",
      align: "center",
      label: "Razao Social",
      field: "nmeRazaoSocial",
    },
    {
      name: "dtaValidade",
      label: "Data Validade",
      align: "center",
      field: "dtaValidade",
    },
  ];
  created() {
    this._buildMockService = new BuildMockService();
    this.recuperaListagem();
  }

  public recuperaListagem() {
    this._buildMockService
      .listarPrestadores()
      .then((result: any) => {
        this.prestadores = result;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }
}
</script>

<style>
</style>