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

//Import modules
import {apiDomain, filtration, allVacancy, search, favorite, logout, user, login} from './config.js'
export const store = new Vuex.Store({
//Data container
state: {
      //vacancyDetails component start
        vacancyDetails: [],
        vacanciesPerPage: [],
        pageRange: 2,
        totalPages: null,
        perPage: 10,
        totalVacancies: "10",
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
        favoriteVacanciesPerPage: [],
        userInfo: [],
        isFavorited: false,
        showModal: false
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
         showModal(state, item){
           state.showModal = item
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
        favoriteVacanciesPerPage(state, {item}){
          state.favoriteVacanciesPerPage = item
        },
        isFavorited(state, item){
          state.isFavorited = item
        },
        favoriteVacanciesAdd(state, item){
          state.favoriteVacanciesPerPage.push(item)
        },
        favoriteVacanciesDelete(state, item){
          state.favoriteVacanciesPerPage.push(item)
        },
        //user Info
        userInfo(state, {item}){
          state.userInfo = item
        },
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
                      search: store.state.searchQuery,
                    }
                  }
              if(store.state.searchQuery === null) {
                if(store.state.tokenPresence){
                axios.get(favorite).then((response) => {
                  commit('favoriteVacanciesPerPage', { item: response.data})
                            }, (err) => {
                            console.log(err)
                        })
                }
                axios.get(allVacancy, options).then((response) => {
                    commit('vacanciesPerPage', { item: response.data.data})
                    commit('totalPages', { item: response.data.last_page })
                    commit('totalVacancies', { item: response.data.total})
                    commit('perPageFunction',{ item: parseInt(response.data.data.length)})
                    commit('vacancyCoordinates', { item: null })
                    var result1 = store.state.vacanciesPerPage;
                    var result2 = store.state.favoriteVacanciesPerPage;
                    var result = result1.filter(function(o1){
                        return result2.some(function(o2){
                          if(o1.id === o2.id){
                            return  o1.ip = true
                        }
                  });
              });
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
                    var result1 = store.state.vacanciesPerPage;
                    var result2 = store.state.favoriteVacanciesPerPage;
                    var result = result1.filter(function(o1){
                        return result2.some(function(o2){
                          if(o1.id === o2.id){
                            return  o1.ip = true
                          }
                  });
              });
                    console.log(response)
                    }, (err) => {
                    console.log(err)
                })
              }
          },
     //details of vacancy
        vacancyDetails: function ({ commit }, id ) {
              var options = {
                  params: {
                      id: id
                    }
                }
                axios.get(allVacancy + id).then((response) => {
                    commit('vacancyCoordinates', { item: response.data.address })

                    var result2 = response.data;
                    var result1 = store.state.favoriteVacanciesPerPage;

                    result1.forEach( function (arrayItem){
                                var x = arrayItem.id
                                if (x === result2.id) { result2.ip = true }
                                if (x != result2.id) { result2.ip = false }
                            });
                  commit('vacancyDetails', { item: result2 })

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
         tokenRemove({commit}){
           localStorage.removeItem('JWT')
           commit('tokenPresence', { item: false })
           axios.get(logout).then((response) => {
             console.log(response)
                       }, (err) => {
                       console.log(err)
                   })

         },
         getToken: function(){
             let options = {
                 params:{
                     'JWT': token
                 }
             };
             let url = 'http://178.124.206.45:443/api/refresh';

             request.getData(url,options,null, function (msg) {
                 console.log(msg);
             })
         },
      //favorite
      favorite({commit}, id) {
        var options = {
                id: id
            }
      axios.post(favorite, options).then((response) => {
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
                  }, (err) => {
                  console.log(err)
              })

      },
    getFavoriteVacancies({commit}) {
        var options = {
            }
      axios.get(favorite).then((response) => {
        commit('favoriteVacanciesPerPage', { item: response.data})
        commit('vacancyCoordinates', { item: null })

                  }, (err) => {
                  console.log(err)
              })
      },

      //get Info
    getUserInfo({commit}){
      axios.get(user).then((response) => {
      commit('userInfo', {item: response.data.data})
                }, (err) => {
                console.log(err)
            })
      },






    }
})
 export default store
