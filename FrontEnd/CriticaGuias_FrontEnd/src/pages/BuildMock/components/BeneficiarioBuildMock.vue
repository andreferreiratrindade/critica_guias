
<template>
  <div class="q-pa-md">
    <q-expansion-item expand-separator label="Beneficiários" class="bg-warning"
       header-class="text-black text-h6"
    >
      <q-card bordered>
        <q-card-section>
          <q-table
            title=""
            :data="beneficiarios"
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
import { CasoTesteService } from "../../../services/CasoTesteService";
import { BuildMockService } from "../../../services/BuildMockService";
@Component
export default class BeneficiarioBuildMock extends Vue {
  private _buildMockService!: BuildMockService;
  private criticaId: number = 0;
  private casoTesteId: number = 0;
  private beneficiarios: _modelsInput.BeneficiarioBuildMock[] = [];

  public columns: any[] = [
    {
      name: "beneficiarioId",
      align: "left",
      label: "Beneficiario ID",
      field: "beneficiarioId",
    },
    {
      name: "nmeBeneficiario",
      align: "center",
      label: "Nome",
      field: "nmeBeneficiario",
    },
    {
      name: "cpf",
      label: "CPF",
      align: "center",
      field: "cpf",
    },
  ];
  created() {
    this._buildMockService = new BuildMockService();
    this.recuperaListagem();
  }

  public recuperaListagem() {
    this._buildMockService
      .listarBeneficiarios()
      .then((result: any) => {
        this.beneficiarios = result;
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