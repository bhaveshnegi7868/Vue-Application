<template>
 <q-layout>
   <div class="register-page regist_s">
     <div class="window-width row justify-center items-center">
       <div class="col-md-12  items-center justify-center">
         <div class="row window-height items-center justify-center">
           <q-card dark bordered class="my-card q-pa-xl">
               <q-input type="text" v-on:keyup="ezoIdEvent()" v-model="username" label="User Name"/>
               <q-input type="password" v-on:keyup="pwdEvent()" v-model="password" label="Password" />
               <q-card-actions>
                  <q-btn class="full-width otp_send" :disabled="btnLoading" @click="submitOtp()">
                   <q-spinner-hourglass v-if="btnLoading" class="on-left" />
                   <span class="otp_fs">SUBMIT</span>
                 </q-btn>
                </q-card-actions>
           </q-card>
         </div>
       </div>
     </div>
   </div>
 </q-layout>
</template>

<script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase-database.js"></script>
<script>
import axios from 'axios'
import { Notify } from 'quasar'
import {
  QSelect,
  QField,
  QBtn,
  QInput,
  QCard,
  QCardActions,
  QLayout,
  QCheckbox,
  QSpinnerHourglass
} from 'quasar'

export default {
  components: {
    QSelect,
    QField,
    QBtn,
    QInput,
    QCard,
    QCardActions,
    QLayout,
    QCheckbox,
    QSpinnerHourglass
  },
  data () {
    return {
      userId: '',
      password: '',
      username: '',
      pwd:'',
      otp: '',
      btnLoading: false,
      userDetails: '',
      staySignIn: true,
      exoIdErrorMsg: false,
      otpErrorMsg: false,
      submitOtpDiv: false,
      sendOtpDiv: true,
      LDBbind: {},
      country: '',
      verificationId: '',
      trailMobileNo: '',
      loggedUser: '',
      errorCode: '',
      totalGrpId: '',
      userIsActive: '',
      flag: true,
      url: '/admin/primarySort'
    }
  },
  mounted () {
    let that = this
    // that.$store.dispatch('example/fetchMasterUrl', userDetails.val().db.url)
  },
  methods: {
    submitOtp: function () {
      let that = this
      that.btnLoading = true
      if (that.username !== '' || that.password !== '') {
        var datadict = {
          'username': that.username,
          'password': that.password
        }
        console.log(process.env.API_URL2)
        axios.post(process.env.API_URL+'accounts/login/', datadict).then(function(response) {
          axios.defaults.headers.common = {
            key: response.data.api_key,
            User: that.username
          }
          that.$q.sessionStorage.set('username', that.username)
          that.$router.push('/list')
          that.btnLoading = false
        }).catch(function(err) {
          that.showNotify('Please enter your valid credentials')
          that.btnLoading = false
        })
      } else {
        that.showNotify('Please enter your valid credentials')
        that.btnLoading = false
      }
    },
    signUpUser(email, password){
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
      }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
      });
    },
    logout (pageName) {
      var that = this
      if (pageName === 'logout') {
        firebase.auth().signOut().then(function() {
          that.$router.push('/')
        }).catch(function(error) {
          // console.log(error)
        })
      } else {
        that.collapseNav()
        this.$router.push(pageName)
      }
    },
    ezoIdEvent () {
      var that = this
      if (that.ezoId !== '') {
        that.exoIdErrorMsg = false
      }
      if(event.key == "Enter") {
        that.submitOtp()
      }
    },
    pwdEvent () {
      var that = this
      if (that.otp !== '') {
        that.otpErrorMsg = false
      }
      if(event.key == "Enter") {
        that.submitOtp()
      }
    },
    showNotify (msg) {
      let that = this
      that.$q.notify({
        color: 'black',
        textColor: 'white',
        message: msg,
        position: 'bottom-left',
        timeout: 1700
      })
    }
  }
}
</script>

<style>
</style>
