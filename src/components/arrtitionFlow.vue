<template>
  <div>
    <q-tree
          :nodes="attritionData1"
          node-key="children"
        >
          <template v-slot:default-header="prop">
            <q-card class="q-pa-xs shadow-2 h40 col5 full-width">
              <div class="col q-pt-sm float-left ellipsis W200">
                <span class="">
                  {{prop.node.Name}}
                </span>
              </div>
              <div class="float-right q-pt-xs q-mx-xl W200 ">
                <div class="col10 bgStatC1 q-mx-auto catColorLbl text-center ">
                  {{prop.node.count}}
                </div>
              </div>
            </q-card>
          </template>
        </q-tree>
  </div>
</template>
<script>
import { QTree } from 'quasar'
export default {
  components: {
    QTree
  },
  data () {
    return {
      base: {},
      attritionData1: []
    }
  },
  props: {
    attritionData: Object
  },
  mounted () {
    console.log(this.attritionData)
    this.attritionData1 = this.attritionData
  }
}
</script>
