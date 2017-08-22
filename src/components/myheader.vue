<template>
    <div>
        <header>
            <div class="header">
                <div class="routersLinks">
                    <div class="imageExposit">
                            <img src="/src/img/exposit3.png" @click="mainPage()">
                    </div>
                    <div class="routerLink">
                            <p @click="mainPage()">Главная</p>
                    </div>
                </div>
                <div class="search_cont">
                  <div class="search">
                    <input type="search" name="" v-model="searchQuery" placeholder="Введите текст" @keyup.enter="searchActivator()" >
                  </div>
                    <button v-show="show" type="button" name="button" @click="searchActivator()"><i class="material-icons">search</i></button>
                </div>
                <div class="greetings" v-if="this.$store.state.tokenPresence">
                  <p>Привет,</p><p><router-link to="/settings">  {{ this.$store.state.userInfo.name}}</router-link></p>
                </div>

                <div class="someBlock">
                    <dropDown v-if="this.$store.state.tokenPresence"></dropDown>
                    <div class="" v-if="this.$store.state.tokenPresence==false">
                    <router-link to="/singIn">
                        <button class="button">Войти</button>
                    </router-link>
                      </div>
                    <div class="" v-if="this.$store.state.tokenPresence==false">
                    <router-link to="/registration">
                        <button class="button">Регистрация</button>
                    </router-link>
                  </div>
                </div>
            </div>
        </header>
    </div>
</template>




<script>
import dropDown from './dropDown.vue'
export default {
  name: 'myheader',
  data() {
    return {
      show: false,
    };
  },
  components: {
    dropDown
  },
  computed: {
    searchQuery: {
      set(value) {
        this.$store.commit("searchQuery", value)
      },
      get() {
        return this.$store.getters.searchQuery
      },

    }
  },
  methods: {
    searchActivator(){
      var x = this
      this.$router.push({name: 'page', params: {page: 1}});
      this.$store.dispatch('getVacancies')
    },
    hideProfile() {
      this.$store.dispatch('hideProfile')
    },
    mainPage(){
      this.$store.commit("searchQuery", null)
      this.$store.commit("employmentCommit", null)
      this.$store.commit("cityCommit", null)
      this.$router.push({path: '/'});
      this.$store.dispatch('getVacancies', 1)
    },

  },

  watch: {
    'searchQuery'(value){
      if (value.length > 3){
        this.show = true
      }
      if (value.length < 3){
        this.show = false
      }
    }
  },
  created(){
      this.$store.dispatch('tokenChecker')
  if(this.$store.state.tokenPresence===true) {this.$store.dispatch('getUserInfo')}

  }

}
</script>

<style scoped>
    header {
        background: linear-gradient(0deg, rgba(31, 165, 208, 0.74), rgba(31, 165, 208, 0.75)), url("https://i.ytimg.com/vi/C8dtP6QwJAU/maxresdefault.jpg") no-repeat;
        font-size: 20px;
        font-weight: 300;
        padding-left: 15px;
        min-height: 90px;
        box-shadow: rgba(0, 0, 0, 0.1) 1px 0px 2px 2px;
        width: 100%!important;
    }


    .header {
        display: flex;
        flex-direction: row;
        height: 80px;
        align-items: center;
        justify-content: space-around;
    }

    header p {
        color: white;
        cursor: pointer;
    }

    .left_container {
        width: 20%;
        margin-bottom: 20px;
    }

    .left_container span {
        display: inline-block;
        margin-left: 10px;
        padding-top: 10px;
    }

    .right_container span {
        display: inline-block;
        margin-left: 10px;
        padding-top: 5px;
    }

    .reg>p {
        font-size: 20px;
        background-color: #ef7f35;
        padding: .5em 1.3em;
        border-radius: 5px;

    }


    .right_container {
        display: inline-block;
        float: right;
        margin-right: 20px;
        padding: 0px;
        width: 25%;
    }


    img {
        height: 50px;
        margin-right: 30px;
        cursor: pointer;
    }

    a:hover {
        text-decoration: none !important;
    }


    .search {
        display: block;
        box-shadow: inset rgba(166, 190, 205, .3) 2px 3px 2px;
        border-radius: 10PX;
        background-color: white;
        padding-left: 7px;
        border-bottom: none!important;
        width: 800px;
        height: 38px;
        margin-left: 100px;
    }


    input {

        font-size: 20px;
        cursor: pointer;
        float: left;
        display: inline-block;
    }

    ::-webkit-input-placeholder {
        color: gray;
    }


    input[type=search] {
        box-shadow: none;
        border-bottom: none!important;
        height: 2em;
    }
      .search:active{
        background-color: rgb(237, 241, 237);
      }


    input[type=search]:active {
        border-bottom: none!important;
        box-shadow: none;

    }

    input[type=search]:focus {
        border-bottom: none;
        box-shadow: none;
    }

    .search_cont {
      display: flex;
        width: 60%;
        align-self: center;
    }

    .search_cont > button {
        width: 5%;
        font-size: 20px;
        background-color: #ef7f35;
        padding: 4px 5px;
        border-radius: 5px;
        margin-left: 10px;
        border: none!important;
        color: snow;
    }
    .search_cont button i {
        padding: 0px 0px;
    }
    .routersLinks {
        display: flex;
    }
    .routerLink {
        margin-left: 10px;
    }
    .someBlock {
        display: flex;
    }
    .button {
        margin-left: 10px;
        line-height: 20px;
        background-color: #ef7f35;
        padding: .5em 1.3em;
        border: none!important;
        border-style: none;
        border-radius: 5px;
        color: snow;
        position: relative;

    }
    button{
      margin-right: 8px;
    }
    button:hover{
      transition: 0.2s;
      background-color: #fa995a;
    }
    button:active{
      background-color: #cb5b12;
      transform: translateY(-5px);
    }
    .imageExposit {
        height: 0;
    }
    .greetings{
      display: flex;
      flex-flow: row;
    }

    .greetings p:first-child{
      margin-right: 10px;
      cursor: default;
      margin-left: 8px;

    }

    .greetings p:nth-child(2){
      border-bottom: 1px dashed white;
      font-weight: 400;
      margin-right: 8px;


    }
    .greetings p:nth-child(2):hover{
      border-bottom: 2px dashed white;
      transition: 0.2s;
      font-weight: 400;

    }

    .greetings a{
      color: white;
    }


    @media screen and (max-width: 1000px){
    img {
  display: none;
    }

    }
</style>
