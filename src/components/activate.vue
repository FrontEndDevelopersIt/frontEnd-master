<template>
<span id="activate">Activated!</span>
  <!--<input type="button" @click.prevent="activateUser()"/>-->
</template>
<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Regostration from './registration.vue'
    import validationService from '../../src/validation'
    import request from '../../src/api'

  export default{
      name: 'activate',
      methods: {
          getTokenFromLink: function () {
              return this.$route.hash;
          },

          activateUser: function () {
              let token = this.getTokenFromLink();
              let str = token.replace(/[#]/g, '/')
              const url = 'http://api.spidergrodno.tk/api/user'+ str;
              console.log(this.$route.hash.replace(/[#]/g, '/'));
              request.getData(url, null,null, function (msg) {
                  document.getElementById('activate').innerHTML = msg;
                  console.log(url);
              })
          },

      },
      beforeMount()
      {
          this.activateUser();
      },

//      mounted(){
//          this.activateUser();
//      }
//      mounted: function () {
//          this.activateUser();
//      }

  }

</script>