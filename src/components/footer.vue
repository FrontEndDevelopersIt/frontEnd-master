<template lang="html">
  <div class="">
        <modal v-if="showModalSubscription" @close="showModalSubscription = false"></modal>
      <div class="footer">
        <div class="footer-section">
              <div class="footer-section__header-text">
                Контакты:
              </div>
              <div class="footer-section__text">
                <ul>
                  <li>+375 15 260 7687</li>
                  <li>+49 71 121 8431 82</li>
                  <li><b>contact@exposit.com</b></li>
                </ul>
              </div>

        </div>

        <div class="footer-section">
                <div class="footer-section__header-text">
                  Наш адрес:
                </div>
                <div class="footer-section__text">
                  ул. Поповича, 2Б <br>
                  <b>230024 Беларусь, Гродно</b>
                </div>
        </div>

        <div class="footer-section">
                <div class="footer-section__header-text footer-section__header-text_no-padding">
                  Найти нас:
                </div>
                <div class="footer-section__icons footer-section__text">
                      <div class="table">
                      <table>
                        <tr>
                          <td width="100"><a href="http://www.exposit.com/"><img class="img1" src="img/logotype.png" alt="">Exposit</a></td>
                          <td><a href="https://ru-ru.facebook.com/expositds/"><img class="img2" src="img/fb-art.png" alt="">Facebook</a></td>
                        </tr>

                        <tr>
                          <td><a href="https://vk.com/expositds"><img class="img3" src="img/ic_vk.png" alt="">VK</a></td>
                          <td><a href="https://jobs.tut.by/employer/1681914"><img  class="img4" src="img/vectorpaint6.svg" alt="">Tut.by</a></td>
                        </tr>
                    </table>
                </div>
        </div>
</div>

      <div class="footer-section">
        <div class="footer-section__header-text footer-section__header-text_no-padding">
          Подписаться на новые вакансии:
        </div>
        <div class="footer-input">
            <input class="footer-section__input" type="text" v-model=inputValue placeholder="Введите свой email" v-on:keyup.enter="redirectSingIn()">
        </div>
      </div>
      </div>
      <div class="line_2">
        <p>© 2012 - 2017 Exposit Digital Services. </p>
      </div>

  </div>
</template>

<script>
import modal from './modal.vue'
export default {
  name: 'footer',
  data(){
    return {
    }
  },
  computed: {
    tokenPresence(){
      return this.$store.state.tokenPresence
    },
  showModalSubscription: {
    set() {
            this.$store.commit('showModalSubscription', false)
        },
        get() {
            return this.$store.state.showModalSubscription
        }
  },
  inputValue: {
    set(value){
      this.$store.commit('inputValue', value )
    },
    get(){
      return this.$store.state.inputValue
    }
  },
    },
    components: {
      modal
    },
  methods: {
    redirectSingIn(){
      if(this.tokenPresence){
        this.$router.push({path: '/settings'})
      }
      if(!this.tokenPresence){
        this.$store.commit("showModalSubscription", true)

      }
    }
  }
}
</script>

<style scoped>

.footer {
  width: 100%;
  background-color: #56B3D4;
  margin-top: 200px;
   display: flex;
  flex-direction: row;
  height: 72px;
  justify-content: space-around;
  margin-bottom: 0px;
  padding: 0px;

}




.text3 a{
  border-bottom: 2px dashed white;
  display: inline;
}
.line_2{
  width: 100%;
  background-color: #4799b6;

}
.line_2 p {
  padding: 0px;
  margin: 0px;
  font-size: 10px;
}
.info{
  display: block;
  height: 100%;
  color: white;
}


.footer-section__header-text {
  font-size: 17px;
  margin-bottom: 5px;
  font-weight: 300;

}

.footer-section {
  font-weight: 300;
  width: 33%;
  text-align: center;
  flex-direction: column;
  margin-top: 0px;
  padding-top: 3px;
}
b {
  font-weight: 400;

}
.footer-section__text {
  color: rgb(254, 254, 254);

}

.footer-section__text li{
   margin: 0px;
   font-size: 13px;
   line-height: 14px;
}
.footer-section__text ul{
   margin: 0px;

}
.footer-section__icons img{
 width: 18px;
}

.footer-section__icons td{
  padding: 2px;
  margin: 0px;

}

.footer-section__icons tr{
  margin: auto;
  padding: 0px;

}
td img {
  margin-right: 5px;
}
td a{
  color: rgb(254, 254, 254);
  opacity: 0.8;
}
a:hover{
  text-decoration: none!important;
  opacity: 1;
}


.footer-section__icons a .img4{
  width: 32px;
  margin-left: -10px;
  margin-right: 0px;
}

.footer-section__icons a .img3{
  margin-right: 9px;
}

.footer-section__icons a .img1 {
  width: 21px;

}

.table {
  padding-left:  30%;
}

.footer-section__header-text_no-padding{
  padding: 0px;
  margin: 0px;
}

@media screen and (max-width: 900px){
  .table {
      padding-left:  25%;
  }
}
.footer-input {
  padding-top: 10px;
}
.footer-section__input{
  background-color: white;
  height: 25px;
  width: 70%;
  padding-left: 10px;
  color: black;

}
</style>
