
<template>
  <div class="">
  <div class="line">
<filtrationMini></filtrationMini>
  </div>
<div class="mainPage" v-on:mouseover="hideProfile()">
  <div class="section_1">
    <filtration></filtration>

  </div>
  <div class="section_2" v-on:mouseover="hideProfile()" >
    <pagination  v-bind:col='parseInt(this.$route.params.page)' v-bind:dot="parseInt(this.totalPages)"></pagination>
        <div class="vueloader" v-if="show">
          <VueLoader v-if="show" :type="this.cubes" :theme="this.theme"></VueLoader>
        </div>
    <br>
    <modal v-if="showModal" @close="showModal = false"></modal>
    <div class="oops"><p  :style="notification" v-if="vacanciesPerPage.length===0">{{myResolvedValue}}</p> </div>
      <div class="vacancy" v-for="(vacancy, index) in vacanciesPerPage" >
          <div class="top_cont">
            <div class="square">
              <p>{{date(vacancy.date)}}</p>
            </div>
            <div class="triangle"></div>
          </div>
          <div class="main_cont">
            <div class="vacancy_img_wrap">
              <img v-if='vacancy.logo' v-bind:src=vacancy.logo  /></img>
              <img v-else src="/img/worklogo.png" ></img>
            </div>
            <div class="vacancy_cont">
              <div class="vacancy_header">
                <div class="vacancy_name">
                  <router-link :to="{name: 'vacancy', params: {id: vacancy.id}}">{{vacancy.title }}
                  </router-link>
                </div>
                  <favorite :vacancy=vacancy></favorite>
              </div>
              <div class="discription">
                <p class="description_body" v-html=vacancy.description></p>
              </div>
              <div class="vacancy_bottom">
                <span class="ex first_ex" >
                          <i class="material-icons">work</i> <p @click.prevent="getCompany(vacancy.company)">{{vacancy.company}}</p>
                    </span>
                <span class="ex first_ex">
                        <i class="material-icons">room</i><p @click.prevent="getLocation(vacancy.location)">{{vacancy.location}}</p>
                    </span>
                <div class="ex pro">
                    <router-link :to="{name: 'vacancy', params: {id: vacancy.id}}">
                  <span class="link" >
                      <i class="material-icons">view_headline</i>Подробнее
                        </span >
                        </router-link>
                    <div class="square_button"></div>
                </div>
            </div>
            </div>
        </div>
          </div>
            <div class="up" :style="styleObject" >
            <back-top></back-top>
          </div>

    <br>
    <pagination v-if="this.$store.state.totalPages != 1" v-bind:col='parseInt(this.$route.params.page)' v-bind:dot="parseInt(this.totalPages)"></pagination>
     </div>
  </div>
    </div>

</template>

<script>
import BackTop from './BackTop.vue'
import  VueLoader from '@imarcom/vue-loader'
import pagination from './pagination.vue'
import filtrationMini from './filtrationMini.vue'
import favorite from './favorite.vue'
import filtration from './filtration.vue'
import modal from './modal.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


export default {
  name: "mainPage",
  asyncComputed: {
  myResolvedValue() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Ooops, вакансии по данным критериям отсуствуют...'), 2000)
    })
  }
},
  data(){
    return {
      notification:{
        fontSize: "17px",
        height: "40px",
        padding: "10px",
        color: "black",

      },
      show: null,
      cubes: "bounces",
      theme: "dark",
      scrolled: false,
      styleObject: {
          display: "none",
          position: "fixed"
      }
    }
  },
  components: {
    pagination,
    favorite,
    filtration,
    filtrationMini,
    modal,
     VueLoader,
     BackTop
  },

  beforeRouteUpdate(to, from, next) {
    next(), next(false),
    this.getVacancies(this.$route.params.page)
  },
  computed: {
    totalPages() {
      return this.$store.state.totalPages
    },
    tokenPresence(){
      return this.$store.state.tokenPresence
    },
    vacanciesPerPage() {
      return this.$store.state.vacanciesPerPage
    },
    showModal: {
      set() {
              this.$store.commit('showModal', false)
          },
          get() {
              return this.$store.state.showModal
          }
    },
    showModalSubscription(){
      return this.$store.state.showModalSubscription
    }
    },
  methods: {
    getVacancies(page, limit) {
      if(page === 'null'){
        this.$store.commit("perPage", 10)
        this.$store.dispatch('getVacancies', 1)
        this.$router.push({path: '/1'})
      }
      if( page > this.$store.state.totalPages || page.length >= 3){
          location.href = '/error';
      }
      else {
      this.$store.dispatch('getVacancies', page, limit)
    }
    },
    getLocation(city){
      this.$store.commit("filterIndicator", true)
      this.$store.commit("searchQuery", null)
      this.$store.commit("cityCommit", city)
      this.$store.dispatch('getVacancies')


    },
    getCompany(company){
      this.$store.commit("searchQuery", company)
      this.$router.push({name: 'page', params: {page: 1}});
      this.$store.dispatch('getVacancies')
    },
    handleScroll() {
  if(this.scrolled = window.scrollY > 300){
    this.styleObject.display = 'block'
  }
  if(this.scrolled = window.scrollY < 300){
    this.styleObject.display = 'none'
  }

},

    hideProfile() {
      this.$store.dispatch('hideProfile')
    },
    date(n) {
      var x = parseInt(n);
      var d = new Date(x);
      var month = d.getUTCMonth() + 1;
      var day = d.getUTCDate();
      var year = d.getUTCFullYear();
      var newdate = day + "/" + month + "/" + year;
      return newdate
    },
    tokenRefresh(){
      this.$store.dispatch('refreshToken')
    },

  },
  created() {
    this.getVacancies(this.$route.params.page, 1)
    this.$store.dispatch('tokenChecker')
    this.show = true
    if(this.$store.state.statisticSwitcher === true) {this.$store.dispatch('getStatistic')}
     window.addEventListener('scroll', this.handleScroll);


  },
  destroyed () {
  window.removeEventListener('scroll', this.handleScroll);
},
  updated(){
this.show = false
  }
}
</script>




<style scoped>
.mainPage {
  display: flex;
  flex-direction: row;
  height: 100%;

  background-color: #f5f0f0;
  margin-bottom: -100px;

}


.vacancy {
  background-color: rgba(252, 252, 252, 0.9);
  margin-bottom: 20px;
  position: relative;
  padding-left: 0px;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: rgba(166, 190, 205, .2) 0px 3px 0px;
  position: relative;
  margin-left: 70px;
  margin-top: 20px;
  width: 90%;
  height: 237px;

}



.main_cont {
  width: 100%;
  box-shadow: rgba(166, 190, 205, .5) 2px 3px 2px;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
}


.vacancy:hover {
  box-shadow: rgba(166, 190, 205, .4) -1px 3px 0px;
  background-color: #ffffff;

  transition: 0.1s
}


.vacancy .square {
  background-color: #02aafc;
  width: 20%;
  margin-left: -7px;
  left: 2px;
  transition: 0.5s;
}



.vacancy:hover .top_cont {
  background-color:
}


.vacancy_img_wrap {
  display: flex;
  position: relative;
  margin-right: 20px;
  margin-bottom: 40px;
  background-color: #ffffff;
  height: 100%;
  max-width: 18%;
    min-width: 18%;
    padding: 0px 15px;
}

img {

 max-width: 70%;
 margin: auto;
 margin-bottom: 100px;
 padding-top: 10px;
 box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 4px;




}

.vacancy:hover img {
  transition: 0.2s;
}


.discription>p {
  font-weight: 300;
}


.top_cont {
  border-bottom: 3px solid #028cd1;
  width: 100%;
  height: 20px;
  background: #F5F0F0;
  display: flex;
}


.vacancy_cont {
  margin: 5px;
  height: 100%;
  padding: 5px;
  padding-left: 0px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
}


.vacancy_header {
  width: 100%;
  margin-top: 15px;
  height: 22px;
  font-weight: bold;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  font-size: 13px;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  font-size: 20px;
  display: flex;
  flex-flow: row nowrap;
}

.vacancy_name {
  width: 95%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  font-size: 20px;
}


.icon_star {
  width: 5%;
  float: right;
  color: #d18e12;
}

.icon_star>i:hover {
  color: #FFDF00;
}



.vacancy_name>a:-webkit-any-link {

  text-decoration: none;
  color: black;
  font-weight: 300;
  white-space: nowrap;
  padding-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
}

.vacancy_name:hover {
  transition: all .2s ease;
  cursor: pointer;
}

.discription {
    width: 100%;
  margin-right: 60px;
  overflow: hidden;
  padding-right: 40px;
  display: flex;
  max-height: 120px;
}




.ex {
  font-size: 1.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #a4a7a8;
  height: 100%;

  width: 40%;
}



.ex:hover i{
  color: #F57921;
  transition: 0.3s;
  cursor: pointer;

}
.ex:active i{
  transition: none;
  color: #F57921;
  line-height: 15px;
}

.pro:hover i{
  color: white;
}

.first_ex{
  font-size: 1.1em;
}
.first_ex p{
  display: inline;
  cursor: pointer;
}
.first_ex:hover  {
  color: #F57921;
  transition: 0.2;

}

i {
  vertical-align: bottom;
}

.vacancy_bottom {
    width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row nowrap;
  padding-top: 12px;

}



.a {
  display: inline-block;
  line-height: 23px;
}


.pro {

  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
}

.ex>i {
  color: #4677af
}


.link {
  float: right;
  color: white;
  opacity: 0.8;
  vertical-align: middle;
  font-weight: 300;
  margin-bottom: 5px;
  background-color: #058fd2;
  border-radius: 20px;
  font-size: 1.3em;
  padding: 6px 9px 6px 9px;
  letter-spacing: -0.7px;
}



.link>i {
  color: white;
  font-size: 1.3em;
  margin-top: 0px;
  vertical-align: bottom;
  line-height: 20px;

}

.pagination {
  margin-bottom: 100px;
  white-space: nowrap;
  display: flex;
}


.pag_button {
  background-color: antiquewhite;
  width: 120px;
  border-radius: 13px;
  padding: 15px;
  margin: auto;
}




.square {
  background: #039BE5;
  width: 18%;
  height: 20px;
}

.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 20px 20px 20px;
  border-color: transparent transparent #039BE5;
  margin-left: -20px;
}

discription>p {
  color: black;
  text-decoration: none !important;
  border-bottom: none;
}

discription>p:hover {
  text-decoration: none !important;
  border-bottom: none;
}

span {
  color: black;
}



a:-webkit-any-link {
  color: black;
  cursor: auto;
  text-decoration: none !important;
  text-decoration-line: none;
  text-decoration-style: initial;
  text-decoration-color: initial;
}


.link:active {
  padding: 6px 11px;
  transition: 0.06;
}

.vacancy_cont:active {
  <pagination v-bind: col='parseInt(this.$route.params.page)';
  transition: 0.05;
}

.square p {
  margin: 0;
  padding-left: 10px;
  color: white;
}


.section_1 {
  width: 20%;
}

.section_2 {
  float: left;
  width: 80%;

}
.description_body>>>i{
  font-weight: 300!important;
}
.description_body>>>strong {
  font-style: normal;
  font-weight: normal;
}

.description_body>>>li:after {
  content: "; "!important;
}

.description_body>>>li {
  display: inline;
}

.description_body>>>ul {
  margin: 0;
}

.description_body>>>ul li {
  display: inline;
  margin-right: 5px;
}

.description_body>>>p {
  margin: 5px;
}

.description_body>>>b{
  font-weight: 300!important;
}

.description_body>>>strong {
  font-weight: 300!important;
}
.oops {
  margin: auto;
  display: block;
  text-align: center;
}
.oops>p {
  height: 61vh;
  font-size: 14px;
  margin-top: 70px;

}

.icon_star i{
  color: black
}
.icon_star {
  position: relative;
      display: inline-block;

}


  .icon_star:hover .tooltiptext{
    display: block;
    transition: 3s;
}


.link:hover i {
  color: white;
}


@media screen and (max-width: 1200px){
.vacancy {
  max-width: 800px;
  mix-width: 800px;
}

}
.line{
  min-width: 100%;
  display: none;
}


@media screen and (max-width: 1000px){

  .line{
    display: block!important;
  }

.section_1{
display: none;
}

.section_1{
  min-width: 100%;
}
.vacancy{
  min-width: 125%;
  margin-left: 0px;

}



}

@media screen and (max-width: 1300px){
  .description_body {
    height: 45px;
  }
  .vacancy {
    height: 190px;
  }
}

.vueloader{
  height: 100vh;
}



.line{
  min-width: 100%;
  display: none;
}

.top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}
.up {
  position: absolute;
  top: 83%;
  right: 3%;
}
</style>
