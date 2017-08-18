//Libraries
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
//Libraries activation
Vue.use(Vuex)
Vue.use(VueAxios, axios)
var token = localStorage.getItem('JWT')
axios.defaults.headers.common['Authorization'] = "Bearer " + token
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'
//Import modules
import {apiDomain, filtration, allVacancy, search, favorite} from './config.js'
const store = new Vuex.Store({
//Data container
state: {
      //vacancyDetails component start
        vacancyDetails: [],
        vacanciesPerPage: [],
        pageRange: 2,
        totalPages: null,
        perPage: 10,
        totalVacancies: null,
        //for map in vacancyDetails start
        vacancyCoordinates: null,
        //for map in vacancyDetails end
        //filtration component start
        city: null,
        employment: null,
        filtratedMassive: [],
        filterIndicator: false,
        //filtration component end
        //myheader component start
        searchQuery: null,
        show: false,
        tokenPresence: false,
        //myheader component end
        //favorite start
        isFavorited: false


  },
     mutations: {
         vacanciesPerPage(state, {item}) {
             state.vacanciesPerPage = item
         },
         totalPages(state, {item}) {
             state.totalPages = item
         },
         vacancyDetails(state, {item}){
           state.vacancyDetails = item
         },
      //filtration component start
         cityCommit( state, item ){   //Value of city select
           state.city = item
         },
         employmentCommit( state, item){ //Value of city emplyment
           state.employment = item
         },
         totalVacancies(state, {item}){ //For statistics
           state.totalVacancies = item
         },
         filterIndicator(state, item){
           state.filterIndicator = item
         },
      //filtration component end
      //myheader component start
         searchQuery(state, item) {
          state.searchQuery = item
        },
      //myheader component end
        show(state, {item}){
          state.show = item
        },
        perPage(state, item){
          state.perPage = parseInt(item)
        },
        perPageFunction(state, {item}){
          state.perPage = item
        },
        vacancyCoordinates(state, {item}){
          state.vacancyCoordinates = item
        },
        //token
        tokenPresence(state, {item}){
          state.tokenPresence = item
        },
        //favotite
        isFavorited(state, {item}){
          state.isFavorited = item
        }
     },
     getters: {
         city (state) {
               return state.city
             },
         employment (state) {
               return state.employment
        },
         searchQuery(state) {
               return state.searchQuery
        }
       },
    actions: {
        getVacancies: function ({ commit }, page) {
              var options = {
                  params: {
                      city: store.state.city,
                      employment: store.state.employment,
                      page: page,
                      limit: 10,
                      search: store.state.searchQuery
                    }
                  }
              if(store.state.searchQuery == null) {
                axios.get(allVacancy, options).then((response) => {
                    commit('vacanciesPerPage', { item: response.data.data})
                    commit('totalPages', { item: response.data.last_page })
                    commit('totalVacancies', { item: response.data.total})
                    commit('perPageFunction',{ item: parseInt(response.data.data.length)})
                    commit('vacancyCoordinates', { item: null })
                    console.log(response)
                    }, (err) => {
                    console.log(err)
                })
              }
              if(store.state.searchQuery) {
                axios.get(search, options).then((response) => {
                    commit('vacanciesPerPage', { item: response.data.data})
                    commit('totalPages', { item: response.data.last_page })
                    commit('totalVacancies', { item: response.data.total})
                    commit('perPageFunction',{ item: parseInt(response.data.data.length)})
                    commit('vacancyCoordinates', { item: null })
                    console.log(response)
                    }, (err) => {
                    console.log(err)
                })
              }
          },

        vacancyDetails: function ({ commit }, id ) {
              var options = {
                  params: {
                      id: id
                    }
                }
                axios.get(allVacancy + id).then((response) => {
                    commit('vacancyCoordinates', { item: response.data.address })
                    commit('vacancyDetails', { item: response.data })
                    }, (err) => {
                    console.log(err)
                })
              },
        //poopup profile
        hideProfile({commit}){
          commit('show', {item: false})
        },
        showProfile({commit}){
          commit('show', {item: true})
        },
        //token check
        tokenChecker({commit}){
          if(localStorage.getItem('JWT')) {
            commit('tokenPresence', { item: true })
        }
          else if(localStorage.getItem('JWT') == false) {
            commit('tokenPresence', { item: false })
        }
      },
      //favorite
      favorite({commit}, id) {
        var options = {
                id: id
            }
      axios.post(favorite, options).then((response) => {
        commit('isFavorited', { item: true })
                  }, (err) => {
                  console.log(err)
              })

      },
      //unfavorite
      unFavorite({commit}, id) {
        var options = {
          params: {
            id: id
          }
            }
      axios.delete(favorite + id).then((response) => {
        commit('isFavorited', { item: false })
                  }, (err) => {
                  console.log(err)
              })

      },
    getFavoriteVacancies({commit}) {
        var options = {
            }
      axios.get(favorite).then((response) => {
        console.log(response)
        commit('vacanciesPerPage', { item: response.data.data})
        commit('totalPages', { item: response.data.last_page })
        commit('totalVacancies', { item: response.data.total})
        commit('perPageFunction',{ item: parseInt(response.data.data.length)})
        commit('vacancyCoordinates', { item: null })
                  }, (err) => {
                  console.log(err)
              })

      },




    }
})
 export default store



 // //Libraries
 // import Vue from 'vue'
 // import Vuex from 'vuex'
 // import axios from 'axios'
 // import VueAxios from 'vue-axios'
 // //Libraries activation
 // Vue.use(Vuex)
 // Vue.use(VueAxios, axios)
 // //Import modules
 // import {apiDomain, filtration, allVacancy, search} from './config.js'
 // const store = new Vuex.Store({
 // //Data container
 // state: {
 //       //vacancyDetails component start
 //         vacancyDetails: [],
 //         vacanciesPerPage: [],
 //         pageRange: 2,
 //         totalPages: null,
 //         perPage: 10,
 //         totalVacancies: null,
 //         //for map in vacancyDetails start
 //         vacancyCoordinates: null,
 //         //for map in vacancyDetails end
 //         //filtration component start
 //         city: null,
 //         employment: null,
 //         filtratedMassive: [],
 //         filterIndicator: false,
 //         //filtration component end
 //         //myheader component start
 //         searchQuery: null,
 //         show: false,
 //         url: allVacancy
 //         //myheader component end
 //
 //   },
 //      mutations: {
 //          vacanciesPerPage(state, {item}) {
 //              state.vacanciesPerPage = item
 //          },
 //          totalPages(state, {item}) {
 //              state.totalPages = item
 //          },
 //          vacancyDetails(state, {item}){
 //            state.vacancyDetails = item
 //          },
 //       //filtration component start
 //          cityCommit( state, item ){   //Value of city select
 //            state.city = item
 //          },
 //          employmentCommit( state, item){ //Value of city emplyment
 //            state.employment = item
 //          },
 //          totalVacancies(state, {item}){ //For statistics
 //            state.totalVacancies = item
 //          },
 //          filterIndicator(state, item){
 //            state.filterIndicator = item
 //          },
 //       //filtration component end
 //       //myheader component start
 //          searchQuery(state, item) {
 //           state.searchQuery = item
 //         },
 //       //myheader component end
 //         show(state, {item}){
 //           state.show = item
 //         },
 //         perPage(state, item){
 //           state.perPage = parseInt(item)
 //         },
 //         perPageFunction(state, {item}){
 //           state.perPage = item
 //         },
 //         vacancyCoordinates(state, item){
 //           state.vacancyCoordinates = item
 //         },
 //
 //      },
 //      getters: {
 //          city (state) {
 //                return state.city
 //              },
 //          employment (state) {
 //                return state.employment
 //         },
 //          searchQuery(state) {store.state.url
 //                return state.searchQuery
 //         }store.state.url
 //        },
 //     actions: {
 //         getVacancies: function ({ commit }, page, val) {
 //               var options = {
 //                   params: {
 //                       page: page,
 //                       limit: 10,
 //                       city: store.state.city,
 //                       employment: store.state.employment,
 //                       page: page,
 //
 //                     }
 //                   }
 //                 axios.get(allVacancy, options).then((response) => {
 //                     commit('vacanciesPerPage', { item: response.data.data})
 //                     commit('totalPages', { item: response.data.last_page })
 //                     commit('totalVacancies', { item: response.data.total})
 //                     commit('perPageFunction',{ item: parseInt(response.data.data.length)})
 //                     commit('vacancyCoordinates', { item: null })
 //                     console.log(response)
 //                     }, (err) => {
 //                     console.log(err)
 //                 })
 //           },
 //
 //           search({commit}, searchQuery){
 //               var options = {
 //                 params: {
 //                   search: searchQuery,
 //                   limit: 10,
 //                   page: 1,
 //                 }
 //               }
 //             axios.get(search, options).then((response) => {
 //                 commit('vacanciesPerPage', { item: response.data.data})
 //                 commit('totalPages', { item: response.data.last_page })
 //                 commit('totalVacancies', { item: response.data.total})
 //                 commit('perPageFunction',{ item: parseInt(response.data.data.length)})
 //                 commit('vacancyCoordinates', { item: null })
 //                 },(err) => {
 //                 console.log(err)
 //             })
 //
 //           },
 //

 //
 //     })
 //  export default store
