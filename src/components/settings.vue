<template>
  <div class="">
    <div class="left_div">
    </div>
        <section class="divSettings">
        <div class="container">
            <h1>Настройки</h1>
            <div class="box">
              <table>
                <tr>
                  <td><p>Ваш ID:</p></td><td>{{userInfo.id}}</td>
                </tr>
                <tr>
                  <td><p>Ваш текущий город:</p></td><td>{{userInfo.city}}</td>
                </tr>
                <tr>
                  <td><p>Вы зарегистрировались:</p></td><td>{{date(userInfo.created_at)}}</td>
                </tr>
                <tr>
                  <td><p>Вы текущий телефон:</p></td><td>{{phone(userInfo.phone)}}</td>
                </tr>
                <tr>
                  <td><p>Ваше имя:</p></td><td>{{userInfo.name}}</td>
                </tr>
              </table>
            </div>
            <div class="boxOfInputs">
                <div class="inputs" @keyup.enter="updateUser(user)">
                    Ваше имя:<div><input class="inputsInSettings" type="text" v-model="user.userName" placeholder="Name"></div>
                    Ваш номер:<div><input class="inputsInSettings" type="text" v-model="user.number" placeholder="Number"></div>
                    Ваш город:<div><input class="inputsInSettings" type="text" v-model="user.city" placeholder="City"></div>
                    Пароль:<div><input class="inputsInSettings" type="password" v-model="user.password" placeholder="Password" ></div>
                </div>
                <div></div>
            </div>
            <div id="confirm">
                <button @click="updateUser(user)" id="buttonConfirm">Confirm settings</button>
            </div>
            </div>
        </section>
    </div>

  </div>
</template>

<script>
    import myheader from './myheader.vue'
    export default {
        name: 'settings',
        data() {
            return {
                user: {
                    userName: "",
                    number: "",
                    city: "",
                    password: "****"
                }
            }

        },
        computed: {
          userInfo(){
            return this.$store.state.userInfo
          }
        },
        components:{myheader},
        methods: {
            updateUser(){
                //this.$store.dispatch('UpdateUser', this.user);
            },
            date(n) {
              var k = n.split(' ')[0]
              var z = k.split('-').join(' ')
              return z
            },
            phone(n){
              if(n ===null){return "Вы не указали телефон" }
            }
        },
        created(){
          if(this.$store.state.tokenPresence===true) {this.$store.dispatch('getUserInfo')}
          if(this.$store.state.tokenPresence===false) {this.$router.push({path: '/singIn'})}

        }
    }
</script>

<style scoped>
    .divSettings {
        background-color: white;
        height: 89.5vh;padding-top: 30px;
    }

    .container{
        padding-top: 30px;
        background-color: #EF7F35;
        background-position: center;
        background-attachment: fixed;
        padding-bottom: 40px;
        border-radius: 15px;
        width: 550px;
        margin: auto;

    }
    h1{
        display: flex;
        justify-content: center;
        margin: 0;
    }
    .boxOfInputs {
        display: flex;
        flex-direction: column;
        width: 70%;
        align-items: flex-end;
        margin: 0 100px 0 100px;
    }
    .inputs {
        flex-direction: column;
        align-items: flex-end;
    }
    .inputs input {
        width: 400px;
        border: 2px forestgreen solid;
    }
    .box {
      display: flex;
      flex-direction: column;
    }

    #buttonConfirm {
        display: inline-block;
        margin-top: 20px;
        background-color: #039BE5;
        padding: 15px 5px;
        border: none;
        width: 170px!important;
        border-radius: 10px;
        color: snow;
        margin-left:  200px;

    }
    #buttonConfirm:hover { background: rgb(127, 207, 255); }
    #buttonConfirm:active { background: rgb(94, 126, 152); }

    input {
        border: none!important;
        outline: none!important;
        color: white;
        background-color: white!important;
        border-bottom-color: grey;
        border-radius: 10px;
        color: black;
        padding-left: 5px;
        border: none!important;
        padding-left: 10px!important;
        position: relative;
        height: 35px;
        box-shadow: 1px 2px 4px 2px rgba(0,0,0,0.15)!important;
        border-radius: 10px!important;
        color: black;
        background-color: #fff;
        margin-bottom: 0px;
        outline: 0!important;

    }
        .box{
          margin-top: 20px;
          padding: 0 20px 0 20px;
          margin-bottom: 20px;
        }
        table{
          padding: 0px;
          text-align: left;
          margin-bottom: 20px;
          font-size: 17px;
        }
        tr{
          text-align: left;
          white-space: nowrap;
          border-radius: 4px;
          margin: 0px;
          padding: 0px;
          color: white;
          font-weight: 400;
          border-bottom: 1px solid black;

        }
        td p{
          display: inline-block;
          margin: 0px;
          font-weight: 400;
          color: black;
          float:left;
        }
        tr:hover{
          background-color: #ce7031;
        }



</style>
