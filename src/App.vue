<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>
<script>
  export default {
    name: 'App',

    created () {
      debugger;
      let thisVue = this;
      let telTimeMIntenSecondsInterval;
      $.get('/config', function (res) {
        thisVue.$store.state.serVersion = res.data.version;
      });
      $('.phoneEnd_num').click(function () {
        thisVue.$store.state.telTimeMIntenSeconds = 0;
        $('.phoneEnd_num').html('0 s');
        event.stopPropagation();
      });
      window.setInterval(() => {
        if (localStorage.getItem('currTel')) {
          $('.phoneNow').css('display', 'inline');
          $('#phoneNow p').html(localStorage.getItem('currTel') + '正在通话中. . .');
        } else {
          $('#phoneNow').css({
            'display': 'none'
          });
        }
        // console.log(localStorage.getItem('currTel'))
      }, 500);
      telTimeMIntenSecondsInterval = window.setInterval(() => {
        thisVue.$store.state.telTimeMIntenSeconds++;
        // console.log(thisVue.$store.state.telTimeMIntenSeconds)
        $('.phoneEnd_num').html(thisVue.$store.state.telTimeMIntenSeconds + ' s');
      }, 1000);
    }

  };
</script>

<style>
  html {
    height: 100%;
    width: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    font-size: 14px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
</style>
