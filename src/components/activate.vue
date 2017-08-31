<template>
  <div class="container">
    <h4 id="activate"></h4>
    <div class="button-container">
          <button type="button" name="button" @click="reload()">На главную </button>
    </div>

  </div>
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
              this.$store.commit('tokenPresence', true)
              let token = this.getTokenFromLink();
              let str = token.replace(/[#]/g, '/')
              const url = 'http://api.spidergrodno.tk/api/user'+ str;
              request.getData(url, null, function (msg) {
                  document.getElementById('activate').innerHTML = msg;

              })


          },
          reload(){
            location.reload()
            function link(){
                location.href="/"
            }
            setTimeout(link(), 700)
          }


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
<style scoped>
  .container {
    text-align: left;
    color: white;
    margin-top: 30px;
    padding: 20px 50px 20px 50px;
    color: white;
    width: 550px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.15);
    background-image: url(/img/blue.jpg);
    background-position: center;
    background-attachment: fixed;
    z-index: 2;
    height: 100%;
    margin-bottom: 400px;

  }
  label{
    font-size: 100px;
    text-align: center;
  }
  button{
    background-color: #ffffff;
    color: black;
    border-radius: 10px;
    border: none;
    padding: 5px 10px;
    margin: auto;
  }
  .button-container{
    width: 100%;
    display: flex;
  }
</style>







<!--if(error.response.data.errors.detail.email)-->
<!--{-->
<!--msg = error.response.data.errors.detail.email;-->
<!--}else {-->
<!--if (error.response.data.errors.detail.phone) {-->
<!--msg = error.response.data.errors.detail.phone;-->
<!--}else{if(error.response.data.errors.detail.email && error.response.data.errors.detail.phone ) {-->
<!--msg = error.response.data.errors.detail.email + error.response.data.errors.detail.phone;-->
<!--}else {-->
<!--msg = error.response.data.errors.detail;-->
<!--}}-->
<!--}-->
