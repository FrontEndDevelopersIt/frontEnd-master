<template>
<div>
    <div class="container">
        <div class="post">
            <div class="vacancy_name">
                <h4>{{vacancyDetails.title}}</h4>
                <div class='date'>{{date(vacancyDetails.date)}}</div>
            </div>
            <div class="footer_info">
                <div class="company_name">
                    <span>
                     <i class="material-icons">work</i>Компания:
                     <p>{{vacancyDetails.company}}</p>
               </span>
                    <div id="parallelogram"></div>
                </div>
                <div class="location">
                    <span>
                    <i class="material-icons">location_on</i>Город:
                    <p>{{vacancyDetails.location}}</p>
                </span>
                </div>
                <div id="parallelogram_two"></div>
                <div class="employment">
                    <span>
                    <i class="material-icons">query_builder</i>Тип занятости: <p>{{vacancyDetails.employment}}</p>
                </span>
                </div>
                <div class="img">
                    <div class="img_wrapper">
                        <img src="http://bellagambaam.weebly.com/uploads/7/2/5/0/72504765/1424977_orig.jpg">
                    </div>
                </div>
                <div class="next_top">
                    <i class="material-icons">keyboard_arrow_right</i>
                </div>
            </div>
            <div class="discription">
                <div class="link" @click="link(vacancyDetails.url)"><span><i class="material-icons">link</i>Ссылка на оригинал</span></div>
                <div class="full_description" v-html=vacancyDetails.description></div>
                <div class="links">
                    <div class="back" @click="goBack">
                        <p>Назад</p>
                    </div>
                    <div class="hover">
                        <div class="url" @click="link(vacancyDetails.url)">
                            <p>Перейти на страницу вакансии</p>
                            <b>({{vacancyDetails.url}})</b> </div>
                    </div>
                </div>
                <div class="map" v-if="this.$store.state.vacancyCoordinates">
                    <gmap-map :center="center" :zoom="14" style="width: 100%; height: 450px;">
                        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
                    </gmap-map>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCPxHbMTNdS2FyQgibEYxOIKIl1Zyw2Sv8',
    }
})
export default {
    data() {
            return {
                show: null
            }
        },
        computed: {
            vacancyDetails() {
                    return this.$store.state.vacancyDetails
                },
                center() {
                    return {
                        lat: this.$store.state.vacancyCoordinates.coordinates[1],
                        lng: this.$store.state.vacancyCoordinates.coordinates[0],
                    }

                },
                markers() {
                    return [{
                        position: {
                            lat: this.$store.state.vacancyCoordinates.coordinates[1],
                            lng: this.$store.state.vacancyCoordinates.coordinates[0],
                        }
                    }]
                }
        },
        watch: {
            '$route.params.id' (al) {


            },
        },
        methods: {
            date(n) {
                    var x = parseInt(n);
                    var d = new Date(x);
                    var month = d.getUTCMonth() + 1;
                    var day = d.getUTCDate();
                    var year = d.getUTCFullYear();
                    var newdate = day + "/" + month + "/" + year;
                    return newdate
                },
                goBack() {
                    window.history.back();
                },
                link(x) {
                    return parent.location = x
                },
                mapLoader() {
                  this.show = true


                }

        },

        created: function() {
            this.$store.dispatch('vacancyDetails', this.$route.params.id)
            this.mapLoader()
        },

}

</script>

<style scoped>

.post {
    background-color: #f2f9fe;
    max-width: 1200px;
    margin: auto;
    position: relative;
    overflow: hidden;
    clear: both;
    box-shadow: rgba(166, 190, 205, .2) 0px 3px 0px;
    z-index: 1;
    display: flex;
    flex-direction: column;
}

.container {
    border-left: 0px solid #039BE5;
    min-height: 1000px;
}

.vacancy_name {
    width: 100%;
    border-left: 9px solid #60abcd;
    padding-left: 15px;
    text-transform: capitalize;
    position: relative;
}

.vacancy_name>h4 {
    font-size: 25px;
    padding-left: 35px;
    float: left;
    padding-top: 15px;
    padding-bottom: 15px;
}

.footer_info {
    display: flex;
    background-color: #c1eaff;
    flex-flow: row nowrap;
    width: 100%;
    min-height: 78px;
    max-height: 84px;
    padding: 5px 0px 0px 0px;
    border-right: none;
    border-left: none;
}

.location p {
    padding-top: 7px;
    padding-left: 22px;
}

.footer_info span {
    color: #8AB1C4;
    overflow: hidden;
    letter-spacing: -0.2px;
    font-size: 18px;
    text-align: center;
    display: inline-block;
}

.footer_info i {
    color: #1B61B8;
    vertical-align: bottom;
    margin-right: 5px;
    font-size: 30px;
}

.footer_info p {
    color: black;
    text-align: center;
    line-height: 20px;
    padding-right: 8px;
    padding-bottom: 40px;
    margin: 3px;
    letter-spacing: 0px;
    font-size: 17px;
}

.location,
.employment {
    height: 100%;
    width: 22%;
    text-transform: capitalize;
    overflow: hidden;
    position: relative;
}

.employment {
    vertical-align: bottom;
    line-height: 30px;
}

.mail {
    height: 100%;
    width: 25%;
}

.mail p {
    padding-left: 10px;
}

.company_name {
    height: 100%;
    width: 33%;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
}

.company_name i {
    margin-left: 4px;
}

.company_name p {
    padding-top: 7px;
    padding-left: 10px;
    text-align: left;
}

.company_name span {
    padding-left: 20px;
}

.img {
    height: 100%;
    width: 30%;
}

.img_wrapper {
    position: relative;
}

img {
    box-shadow: rgba(0, 0, 0, 0.4) 5px 5px 4px;
    box-shadow: inset (0, 0, 0, 0.4) 5px 5px 4px;
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0;
    right: 0;
    margin: auto;
    min-width: 150px;
    max-width: 170px;
}

.discription {
    padding-top: 20px;
    width: 85%;
    border-left: 9px solid #60abcd;
    line-height: 15px;
    padding: 15px 0px 15px 50px;
    padding-bottom: 70px;
}

.date {
    padding-bottom: 15px;
    float: right;
    padding-right: 40px;
    padding-left: 20px;
    padding-top: 15px;
    margin-top: 15px;
    background-color: #B6E8FF;
    vertical-align: middle;
    border-left: 6px solid #60ABCD;
    font-weight: bold;
}

//#parallelogram {
margin-left: 10px;
left: 240px;
top: 58px;
position: absolute;
width: 8px;
height: 78px;
-webkit-transform: skew(42deg);
-moz-transform: skew(20deg);
-o-transform: skew(20deg);
background: red
} //  #parallelogram_two {
margin-left: 10px;
left: 410px;
top: 58px;
position: absolute;
width: 8px;
height: 78px;
-webkit-transform: skew(42deg);
-moz-transform: skew(20deg);
-o-transform: skew(20deg);
background: #F2F9FE;

}
.link {
    cursor: pointer
}
.link:hover span {
    opacity: 1;
}
.link>span {
    color: black;
    opacity: 0.4;
    font-size: 18px;
}
.link span i {
    vertical-align: bottom;
    margin-bottom: -4px;
    margin-right: 4px;
    font-size: 27px;
}
.full_description {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 300!important;
    line-height: 23px;
}
.full_description>>>li {
    list-style-type: disc;
}
.url>p {
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    background-color: #ef7f35;
    padding: 10px 0px 15px 5px;
    border-radius: 5px;
    color: white;
    width: 250px;
    height: 60px;
    vertical-align: middle;
    line-height: 20px;
}
.back>p {
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    background-color: #60ABCD;
    padding: 10px 0px 10px 5px;
    border-radius: 5px;
    color: white;
    width: 250px;
    height: 60px;
    padding-top: 24px;
}
.back {
    display: inline-block;
    float: left;
    vertical-align: middle;
    margin-right: 24px;
}
.url,
.next {
    display: inline-block;
    vertical-align: middle;
}
.next>p {
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    background-color: #48ad61;
    color: white;
    padding: 10px 0px 10px 5px;
    border-radius: 5px;
    width: 250px;
    height: 60px;
    padding-top: 23px;
    margin-left: 20px;
    margin-top: 5px;
    clear: both;
}
.url:hover {}
.hover {
    display: inline-block;
    transition: 2s;
}
.hover b {
    opacity: 0;
    margin: 0px;
    padding: 0px;
}
.hover:hover b {
    opacity: 0.7;
    -webkit-transition-delay: ease 0.8s;
    transition: ease 0.7s;
}
.next_top i {
    text-decoration: none;
    border-radius: 14px;
    padding: 8px 9px;
    background-color: #039BE5;
    text-align: center;
    color: white;
    display: inline-block;
    margin-top: 10px;
}
.map {
    width: 700px;
    height: 400px;
    margin: 0 auto;
}

</style>
