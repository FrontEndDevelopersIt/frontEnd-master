
<template>

<div>
    <div class="column">
        <div class="filt">
            <div class="filt_title">
            </div>
            <div class="filt_by_city">
                <p>Город:</p>
                <div class="bloc">
                   <router-link :to= "{name: 'page', params: {page: 1}}">
                    <select type="text" name="city" class="select_by_city" size="6" v-model="city" v-on:click="cityFunc(city)">
                        <option value="Брест"> Брест</option>
                        <option value="Витебск"> Витебск</option>
                        <option value="Гомель"> Гомель</option>
                        <option value="Гродно"> Гродно</option>
                        <option value="Минск">Минск </option>
                    </select>
                  </router-link>
                </div>
            </div>
            <div class="filt_by_employment">
                <p>Тип занятости:</p>
                <div class="bloc">
                  <router-link :to= "{name: 'page', params: {page: 1}}">
                    <select type="text" name="employment" class="select_by_employment" size="6" v-model="employment" v-on:click="employmentFunc(employment)">
                        <option value="Полная занятость"> Полная занятость</option>
                        <option value="Частичная занятость"> Частичная занятость</option>
                        <option value="Проектная работа"> Проектная работа</option>
                        <option value="Стажировка"> Стажировка</option>
                    </select>
                  </router-link>
                </div>
            </div>
        </div>
        <div class="filt statistics">
            <span>Всего вакансий:</span> <b>{{this.$store.state.totalVacancies}}</b>
            <br>
            <!-- <span class="on_Page">На странице:</span> //Плохо работает
    <select class="select_count_page" v-model="pageValue" v-on:change="vacancyCountSwitcher(pageValue)">
        <option>10</option>
        <option>15</option>
        <option>30</option>
        <option>45</option>
        <option>50</option>
        <option>100</option>
        <option>{{this.$store.state.totalVacancies}}</option>
      </select> -->
        </div>


    </div>
</div>

</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
    name: 'filtration',
    data() {
        return {
            id: null,
            cityMassive: [],
            employmentMassive: [],
        }
    },
    computed: {
        city: {
            set(value) {
                    this.$store.commit("cityCommit", value)
                },
                get() {
                    return this.$store.getters.city
                }
        },
        employment: {
            set(value) {
                    this.$store.commit("employmentCommit", value)
                },
                get() {
                    return this.$store.getters.employment
                }
        },
        pageValue: {
            set(value) {
                    this.$store.commit('perPage', value)
                },
                get() {
                    return this.$store.state.perPage
                }
        }

    },
    methods: {
        vacancyCountSwitcher(pageValue) {
                this.$store.commit("perPage", pageValue)
                this.$store.dispatch('getVacancies')
            },

            cityFunc(city) {


                if (this.$store.state.city == this.cityMassive[0]) {
                    this.$store.commit("cityCommit", null)
                    this.$store.dispatch('getVacancies')
                    this.cityMassive.shift()
                } else {
                    this.$store.commit("filterIndicator", true)
                    this.$store.commit("searchQuery", null)
                    this.$store.commit("cityCommit", city)
                    this.$store.dispatch('getVacancies')
                    this.cityMassive.shift()
                    this.cityMassive.push(city)
                }
            },

            employmentFunc(employment) {
                if (this.$store.state.employment == this.employmentMassive[0]) {
                    this.$store.commit("employmentCommit", null)
                    this.$store.commit("filterIndicator", false)
                    this.$store.dispatch('getVacancies')
                    this.employmentMassive.shift()
                } else {
                    this.$store.commit("filterIndicator", true)
                    this.$store.commit("searchQuery", null)
                    this.$store.commit("employmentCommit", employment)
                    this.$store.dispatch('getVacancies')
                    this.employmentMassive.shift()
                    this.employmentMassive.push(employment)
                }
            },
            getVacancies() {
                this.$store.commit("filterIndicator", true)
                this.$store.dispatch('getVacancies')
            }
    }

}

</script>

<style scoped>

input {
    width: 50%;
    padding: 20px;
    color: black;
    opacity: 2!important;
    left: 0px!important;
    position: relative!important;
    min-width: 50px;
}

.filt {
    background-color: #F7FCFF;
    overflow: hidden;
    margin-left: 35px;
    margin-top: 35px;
    border-radius: 6px;
    width: 200px;
    vertical-align: middle;
    text-align: center;
}



.filt_title {
    padding: 0px;
    margin: 0px;

}

select {
    display: inline-block;
    background-color: #F7FCFF;
}

.select_by_city {
    height: 145px;
}

select option:hover {
    color: #F7FCFF;
    border-color: #FF771E;
    border-bottom-color: #039BE5;
    cursor: pointer;
}

select option:active {
    background-color: #E55D03;
    color: white;
    border-color: #FF771E;
}

select option:hover,
select option:focus,
select option:active,
select option:checked {
    color: white !important;
    background: linear-gradient(#039BE5, #039BE5);
    background-color: #039BE5 !important;
}

.select_by_employment {
    height: 120px;
}


option {
    padding-left: 5px;
}

option {
    padding: 2px 10px;
}


.filt_by_employment p {
    font-size: 17px;
    color: black;
}

.filt_by_city {
    padding: 0px;
    margin: 0px;
}

.bloc {
    display: inline-block;
    overflow: hidden;
}

.bloc select {
    margin-right: 20px;
    padding-right: 50px;
    margin: -5px 40px -5px -3px;
    width: 300px;
    font-size: 14px;
    color: #039BE5;
}

option {
    background-color: #F7FCFF;
    margin-bottom: 2px;
    width: 90%;
    color: black;
    font-weight: 300;
    border-left: 4px solid #039BE5;
    border-bottom: 1.5px solid #E5E5E5;
    margin-left: 4px;
}

button {
    background-color: #039BE5;
    border: none;
    font-size: 18px;
    font-weight: 300;
    border-radius: 10px;
    padding: 6px 15px;
    color:  inherit;
    box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
    vertical-align: bottom;
    float: left;
    margin-left: 15px;
}

.delete {
    padding: 0px;
    background-color: #ff771e;
    float: left;
    margin-left: 12px;
}

.delete>i {
    padding: 3px 3px 5px 3px;
    vertical-align: bottom;
}

@keyframes bounce {
    0% {
        transform: scale(0);
    }
    80% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

.bounce-enter-active {
    animation: bounce .5s;
}

.bounce-leave-active {
    animation: bounce .5s reverse;
}

internal-list-box {}

option:first-child {
    padding-top: 2px;
}

p {

    font-size: 19px;
    border-radius: 3px;
    margin: 10px;
    font-weight: 400;
    color: black;
    letter-spacing: -1.3px;
    line-height: 30px;
    position: relative;
    padding: 0px 8px;
    padding-bottom: 2px;
    font-weight: 300;
    opacity: 1;
    margin-left: 1px;
    width: 98%;

    box-shadow: 0px 0px 3px 1px #039BE5;
    border-color: #039BE5;
    border-left: 6px solid #039BE5;
    text-align: left;
}

p:hover {
    box-shadow: 0px 0px 3px 1px #E55D03;
border-left: 6px solid #EF7F35;

}


.statistics {
    height: auto;
    padding: 15px 5px 15px 20px;
    text-align: left;
    box-shadow: 0px 0px 2px 1px #E55D03;
}
.statistics:hover {
  box-shadow: 0px 0px 3px 2px #E55D03;
}

.statistics b {
    float: right;
    margin-right: 22px;
}

option p {
    float: right;
}

.select_count_page {
    width: 50px;
    height: 28px;
    float: right;
    vertical-align: top;
    margin-bottom: 10px;
}

.on_Page {
    line-height: 27px;
}

</style>
