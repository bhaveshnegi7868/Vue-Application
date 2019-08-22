<template>
    <div class="q-pa-xl">
        <label class="pop-up-header">Create Cohart Group</label>
        <hr class="pop-up-header-underline"/>
        <div class="row q-pa-lg">
          <div class="col-5">
            <label>{{name}} Group Name</label>
          </div>
          <div class="col">
            <input type="text" v-model="cohartGroup.name" class="input-box">
          </div>
        </div>
        <div class="row q-pa-lg">
          <div class="col-5">
            <label>{{name}} Group Description</label>
          </div>
          <div class="col">
            <textarea v-model="cohartGroup.description" class="textarea-box"></textarea>
          </div>
        </div>
        <div class="footer">
          <q-btn class="q-ma-md" rounded color="grey-9" label="Cancel" v-close-popup/>
          <q-btn class="q-ma-md" rounded color="green-9" label="Create" @click="returnCreateGroup" />
        </div>
    </div>
</template>
<script>
import {
  ClosePopup
} from 'quasar'
export default {
  name: 'createCohartGroup',
  components: {
  },
  directives: {
    ClosePopup
  },
  data () {
    return {
      cohartGroup: {}
    }
  },
  methods: {
    returnCreateGroup () {
      var that = this
      if (that.cohartGroup.name) {
        this.$emit('addCohart', that.cohartGroup)
      } else {
        that.$q.notify({
          color: 'black',
          textColor: 'white',
          message: 'Please provide a name',
          position: 'bottom-right',
          timeout: 3000
        })
      }
    }
    /**
    * Given a generator function, this component's inputValue is set
    * to the return value of the generator.
    *
    * @param Function
    **/
  },
  props: {
    'name': String
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>
.icon-generate {
  float:right;
  width:16px;
  height:16px;
  border:1px dashed red;
}
</style>
