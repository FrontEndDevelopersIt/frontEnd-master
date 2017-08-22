<template>
<span id="activate"></span>
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
              return this.$route.params;
          },

          activateUser: function () {
              let token = this.getTokenFromLink();
              const url = 'http://178.124.206.45:443/api/user/';
              request.getData(url + token, null, null, function (msg) {
                  document.getElementById('activate').innerHTML = msg;
              })
          },
          beforeMount() {
              this.activateUser()
          },
      }

  }

</script>