<template lang="html">
  <div class="">
    <div class="container">
      <div class="oops" v-if='vacanciesPerPage.length == 0'><p>Ooops, вакансии по данным критериям отсуствуют</p> </div>
      <div class="vacancy" v-for="(vacancy, index) in favoriteVacanciesPerPage">
        <router-link :to="{name: 'vacancy', params: {id: vacancy.id , index: index-1}}">
          <div class="top_cont">
            <div class="square">
              <p>{{date(vacancy.date)}}</p>
            </div>
            <div class="triangle"></div>
          </div>
          <div class="main_cont">
            <div class="vacancy_img_wrap">
              <img src="http://bellagambaam.weebly.com/uploads/7/2/5/0/72504765/1424977_orig.jpg">
            </div>
            <div class="vacancy_cont">
              <div class="vacancy_header">
                <div class="vacancy_name">
                  <router-link :to="{name: 'vacancy', params: {id: vacancy.id}}">{{vacancy.title }}
                  </router-link>
                </div>
                <div class="icon_star">
                  <favorite v-bind:favPost='parseInt(vacancy.id)'></favorite>
                </div>
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
  </div>
</template>

<script>

export default {
  name: 'favoriteVacancies',
  computed: {
    totalPages() {
      return this.$store.state.totalPages
    },
    vacanciesPerPage() {
      return this.$store.state.vacanciesPerPage
    },
  },
 methods: {
   created() {
     this.$store.dispatch('getFavoriteVacancies')
   }
 }
 }
</script>

<style lang="css">
</style>
