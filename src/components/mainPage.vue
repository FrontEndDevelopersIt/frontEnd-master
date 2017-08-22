<template>
<div class="mainPage" v-on:mouseover="hideProfile()">
  <div class="section_1">
    <filtration></filtration>
  </div>
  <div class="section_2" >
    <pagination v-bind:col='parseInt(this.$route.params.page)' v-bind:dot="parseInt(this.totalPages)"></pagination>
    <br>
    <modal v-if="showModal" @close="showModal = false"></modal>
    <div class="container">
      <div class="oops"><p  :style="notification" v-if="vacanciesPerPage.length===0">{{myResolvedValue}}</p> </div>
      <div class="vacancy" v-for="(vacancy, index) in vacanciesPerPage" >
        <router-link :to="{name: 'vacancy', params: {id: vacancy.id , index: index-1}}" >
          <div class="top_cont">
            <div class="square">
              <p>{{date(vacancy.date)}}</p>
            </div>
            <div class="triangle"></div>
          </div>
          <div class="main_cont">
            <div class="vacancy_img_wrap">
              <img v-if='vacancy.logo' v-bind:src=vacancy.logo  />
              <img v-else src="http://bellagambaam.weebly.com/uploads/7/2/5/0/72504765/1424977_orig.jpg" >
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
                <span class="ex first_ex">
                        <i class="material-icons">work</i> {{vacancy.company}}
                    </span>
                <span class="ex first_ex">
                        <i class="material-icons">room</i>{{vacancy.location}}
                    </span>
                <div class="ex pro">
                  <span class="link">
                            <i class="material-icons">view_headline</i>Подробнее
                        </span >
                    <div class="square_button"></div>
                </div>
            </div>
            </div>
        </div>
          </router-link>
          </div>
    </div>
    <br>
  <pagination v-bind:col='parseInt(this.$route.params.page)' v-bind:dot="parseInt(this.totalPages)"></pagination>
     </div>

    </div>
</template>

<script>
import pagination from './pagination.vue'
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
    }
  },
  components: {
    pagination,
    favorite,
    filtration,
    modal
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
    }
    },
  methods: {
    getVacancies(page, limit) {
      this.$store.dispatch('getVacancies', page, limit)

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
  },
  created() {
    this.getVacancies(this.$route.params.page, 1)
    this.$store.dispatch('tokenChecker')
  }
}
</script>




<style scoped>
.mainPage {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.container {
  margin-left: 100px;
  box-sizing: border-box;
  margin-top: 20px;
}

.vacancy {
  background-color: #FAF8FF;
  margin-bottom: 20px;
  position: relative;
  padding-left: 0px;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: rgba(166, 190, 205, .2) 0px 3px 0px;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  position: relative;

}

.vacancy_cont {

}

.main_cont {
  box-shadow: rgba(166, 190, 205, .5) 2px 3px 2px;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
}


.vacancy:hover {
  box-shadow: rgba(166, 190, 205, .4) -1px 3px 0px;
  background-color: #ffffff;
  transform: scale(1.003);
  transition: 0.1s
}


.vacancy:hover .square {
  background-color: #02aafc;
  width: 17%;
  margin-left: -7px;
  left: 2px;
  transition: 0.5s;
}



.vacancy:hover .top_cont {
  width: 100%;
  transition: 0.7s;
  border-bottom: 3px solid #02aafc;
}


.vacancy_img_wrap {
  display: flex;
  position: relative;
  margin-right: 20px;
  margin-bottom: 40px;
  min-width: 18%;
  padding-left: 5px;
  padding-top: 10px;
  background-color: #ffffff;
  height: 100%
}

img {
  box-shadow: rgba(0, 0, 0, 0.4) 5px 5px 4px;
  position: absolute;
  top: -16px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 130px;

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
  background: #F7FCFF;
  display: flex;
}


.vacancy-cont {
  background-color: #A6BECD;
  margin: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 5px;
  padding-left: 0px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
}


.vacancy_header {
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



.ex:hover {
  color: #F57921;
  transform: scale(1.02);
}

.first_ex:hover i {
  color: #F57921;
  transition: 0.2;
}

i {
  vertical-align: bottom;
}

.vacancy_bottom {
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
  background-color: #039BE5;
  border-radius: 20px;
  font-size: 1.3em;
  padding: 6px 9px 6px 9px;
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

.oops>p {
  height: 61vh;
  font-size: 14px;
  text-align: center;
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
},


i {
  display: inline-block;
}

@media screen and (max-width: 1200px){
.vacancy {
  max-width: 800px;
  mix-width: 800px;
}

}



</style>
