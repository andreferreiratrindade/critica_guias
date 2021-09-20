<template>
  <q-dialog ref="dialog" v-model="showModal" cancel full-height full-width>
    <q-card class="q-gutter-md">
      <q-card-section>
        <div class="q-gutter-md row">
          <q-input
            v-model="cobertura.totalEtapa"
            type="text"
            label="Total de etapas"
            class="col-3"
            filled
          />

          <q-input
            v-model="cobertura.totalCoberto"
            type="text"
            label="Total coberto"
            class="col-3"
            filled
          />

          <q-input
            v-model="percentualCoberto"
            type="text"
            label="Total coberto (%)"
            class="col-3"
            filled
          />

          <div v-html="cobertura.coberturaHtml" class="col-12"></div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancelar" @click="$emit('close')" value v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { _modelsInput } from "../../models/_modelsInput";
import { StoredProcedureCoberturaService } from "../../services/StoredProcedureCoberturaService";

@Component
export default class VisualizarCobertura extends Vue {
  private _storedProcedureCoberturaService!: StoredProcedureCoberturaService;
  public percentualCoberto = 0;
  public showModal: boolean = false;
  public cobertura: _modelsInput.StoredProcedureCobertura = {
    storedProcedureId: null,
    storedProcedureCoberturaId: null,
    totalCoberto: null,
    totalEtapa: null,
    coberturaHtml: null,
  };

  show(storedProcedureId: number) {
    this.showModal = true;
    this.recupera(storedProcedureId);
  }

  public recupera(storedProcedureId: number) {
    this._storedProcedureCoberturaService
      .listar(storedProcedureId)
      .then((result: any) => {
        this.cobertura = result;

        this.percentualCoberto =
          (this.cobertura.totalCoberto / this.cobertura.totalEtapa) * 100;
      })
      .catch((err: any) => {
        this.$q.notify(err);
      })
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  created() {
    this._storedProcedureCoberturaService =
      new StoredProcedureCoberturaService();
  }
}
</script>