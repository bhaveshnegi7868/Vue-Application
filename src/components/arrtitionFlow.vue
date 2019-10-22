<template>
  <div>
    <q-tree
          :nodes="attritionData1"
          node-key="children"
        >
          <template v-slot:default-header="prop">
            <q-card class="q-pa-md shadow-2 h40 col5 full-width">
              <div class="col float-left ellipsis W240">
                <span class="">
                  {{prop.node.Name}}
                </span>
              </div>
              <div class="float-right q-mx-xl W200 ">
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
