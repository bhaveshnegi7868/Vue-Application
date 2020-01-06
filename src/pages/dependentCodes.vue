<template>
  <div class="row codeSetPage">
  <div class="col-12">
    <div class="q-my-md q-ml-md q-mr-xs searchCodesetHeader">Descendants</div>
  </div>
    <q-card class="q-pa-md q-mx-auto">

      <div class="row justify-center">
        <q-tree
          :nodes="desendents"
          node-key="Code"
          tick-strategy="leaf"
          :ticked.sync="ticked"
        >
          <template v-slot:default-header="prop">
            <q-card class="q-pa-md unselected-card">
              {{prop.node.Code}} |
              <br>
              {{prop.node.Name}}
            </q-card>
          </template>
        </q-tree>
      </div>

    </q-card>
    <div class="footer">
        <q-btn  class="q-ma-md" color="theamBlue" label="Save" @click="sendName"></q-btn>
      </div>
  </div>
</template>

<script>
import {
  QCard,
  QTree
} from 'quasar'
export default {
  name: 'dependentsCodes',
  components: {
    QCard,
    QTree
  },
  props: {
    'desendents': Array,
    'ticked': Array
  },
  methods: {
    sendName (event) {
      var that = this
      this.$emit('updateDependents', that.ticked)
    }
  }
}
</script>
