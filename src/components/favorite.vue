<template>
    <span>
        <a href="#" v-if="isFavorite" @click.prevent="unFavorite(favPost)">
            <i class="material-icons">star</i>
        </a>
        <a href="#" v-else @click.prevent="favorite(favPost)">
            <i class="material-icons">star_border</i>
        </a>
    </span>
</template>




<script>
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
export default {
    name: 'favorite',

    props: {
        favPost: {
            type: Number,
            default: 1
        },
    },

    computed: {
            isFavorite() {
                return this.$store.state.isFavorited
            },
        },
    methods: {
            favorite(favPost) {
                this.$store.dispatch('favorite',favPost )
            },
          unFavorite(favPost) {
            this.$store.dispatch('unFavorite', favPost )
            }
        },
}



</script>
