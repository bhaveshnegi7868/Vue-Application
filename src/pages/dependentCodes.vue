<template>
  <div class="row">
  <div class="col-12">
    <div class="q-my-md q-ml-md q-mr-xs searchCodesetHeader">Descendants</div>
  </div>
    <q-card class="q-pa-md q-mx-auto">

      <div class="row justify-center">
        <q-tree
          :nodes="desendents"
          node-key="code"
          tick-strategy="strict"
          :ticked.sync="ticked"
        >
          <template v-slot:default-header="prop">
            <q-card class="q-pa-md unselected-card">
              {{prop.node.Code}} | <label class="ellipsis" style="max-width: 200px;">{{prop.node.Name}}</label>
            </q-card>
          </template>
        </q-tree>
      </div>

    </q-card>
    <div class="footer">
        <q-btn  class="q-ma-md" color="grey-9"  label="Cancel" v-close-popup></q-btn>
        <q-btn  class="q-ma-md" color="theamGreen" v-close-popup label="Save" @click="sendName"></q-btn>
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
  data () {
    return {
      ticked: []
    }
  },
  props: {
    'desendents': Array
  },
  mounted () {
    // debugger
    // this.$q.iconSet.tree.icon = 'fiber_manual_record'
  },
  methods: {
    sendName (event) {
      var that = this
      this.$emit('updateDependents', that.ticked)
    }
  }
}
</script>
