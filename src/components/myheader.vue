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

                <div class="someBlock">
                    <dropDown></dropDown>
                    <router-link to="/singIn">
                        <button class="button">Войти</button>
                    </router-link>
                    <router-link to="/registration">
                        <button class="button">Регистрация</button>
                    </router-link>
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
      }
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
  }

}
</script>

<style scoped>

    header {
        background-color: #039BE5 !important;
        font-size: 20px;
        font-weight: 300;
        padding-left: 15px;
        max-height: 80px;
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
        display: inline-block;
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
        line-height: 3;
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
        border: none;
        border-radius: 5px;
        color: snow;
        position: relative;
    }
    .imageExposit {
        height: 0;
    }

</style>
