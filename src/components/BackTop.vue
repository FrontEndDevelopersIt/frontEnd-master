<template>
  <div class="buttonUp">
  <span @click.prevent="backTop()">
    <img src="img/ic_up.png" alt="">
 </span>
   </div>
</template>

<script>
  export default {

    name: 'backTop',
    props: {
      speed: {
        type: Number,
        default: 0.1
      }
    },

    data () {
      return {

      };
    },
    methods: {
      backTop: function () {
        var that = this;
        var top = document.body.scrollTop;
        var timer = setInterval(function () {
          top -= Math.abs(top * that.speed);
          if (top <= 1) {
            top = 0;
            clearInterval(timer);
          }
          document.body.scrollTop = top;
        }, 20);
        return false;

      }
   }
 };
</script>

<style lang="css" scoped>
.buttonUp {
  cursor: pointer;
}
img{
  width: 40px;
  background-color: #02AAFC;
  border-radius: 100px;
}
img:hover{
  background-color: rgba(6, 124, 198, 0.82)

}
</style>
