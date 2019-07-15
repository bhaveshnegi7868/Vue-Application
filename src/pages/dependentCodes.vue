<template>
  <div>
    <q-card class="q-pa-md">
      <h6>Dependents</h6>
      <div class="row justify-center">
        <q-tree
          :nodes="simple"
          node-key="code"
          tick-strategy="leaf"
          :ticked.sync="ticked"
        >
          <template v-slot:default-header="prop">
            <q-card class="q-pa-md unselected-card">
              {{prop.node.code}} | {{prop.node.description}}
            </q-card>
          </template>
        </q-tree>
      </div>
    </q-card>
  </div>
</template>

<script>
import {
  QCard,
  QTree
  // QTr,
  // QTd
} from 'quasar'
export default {
  name: 'dependentsCodes',
  components: {
    QCard,
    QTree
    // QTr,
    // QTd
  },
  data () {
    return {
      ticked: [],
      simple: [
        {
          description: 'Satisfied customers (with avatar)',
          code: 'Code 01',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: [
            {
              description: 'Good food (with icon)',
              code: 'Code 01.01',
              icon: 'restaurant_menu',
              children: [
                {
                  description: 'Quality ingredients',
                  code: 'Code 01.01.01'
                },
                {
                  description: 'Good recipe',
                  code: 'Code 01.01.02'
                }
              ]
            },
            {
              description: 'Good food (with icon)',
              code: 'Code 01.02',
              icon: 'restaurant_menu',
              children: [
                {
                  description: 'Quality ingredients',
                  code: 'Code 01.02.01'
                },
                {
                  description: 'Good recipe',
                  code: 'Code 01.02.02'
                }
              ]
            },
            {
              description: 'Good food (with icon)',
              code: 'Code 01.03',
              icon: 'restaurant_menu',
              children: [
                {
                  description: 'Quality ingredients',
                  code: 'Code 01.03.01'
                },
                {
                  description: 'Good recipe',
                  code: 'Code 01.03.02'
                }
              ]
            }
          ]
        },
        {
          description: 'Satisfied customers (with avatar)',
          code: 'Code 02',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: [
            {
              description: 'Good food (with icon)',
              code: 'Code 02.01',
              icon: 'restaurant_menu',
              children: [
                {
                  description: 'Quality ingredients',
                  code: 'Code 02.01.01'
                },
                {
                  description: 'Good recipe',
                  code: 'Code 02.01.02'
                }
              ]
            },
            {
              description: 'Good food (with icon)',
              code: 'Code 02.02',
              icon: 'restaurant_menu',
              children: [
                {
                  description: 'Quality ingredients',
                  code: 'Code 02.02.01'
                },
                {
                  description: 'Good recipe',
                  code: 'Code 02.02.02'
                }
              ]
            },
            {
              description: 'Good food (with icon)',
              code: 'Code 02.03',
              icon: 'restaurant_menu',
              children: [
                {
                  description: 'Quality ingredients',
                  code: 'Code 02.03.01'
                },
                {
                  description: 'Good recipe',
                  code: 'Code 02.03.02'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted () {
    // debugger
    // this.$q.iconSet.tree.icon = 'fiber_manual_record'
  },
  methods: {
    sendName (event) {
      var that = this
      this.$emit('inputChange', that.event)
    }
  }
}
</script>
