<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>

    <div v-if="telephoneWidgetStatus=='Pad'" style="height:540px;width:300px;border:1px solid #000000;position: absolute;bottom:0;right:0;z-index: 999999;background-color: #ffffff;
        box-sizing: border-box">
        <div @click="telephoneWidgetStatus='Bar'" style="height:40px;cursor: pointer;text-align: center;line-height: 40px;font-size: 22px;background-color: #b8b8b8;">∨</div>
        <iframe style="border:none;resize: none;height:498px;width:100%;" 
            src='./assets/kt-telephone/index.html'></iframe>
    </div>
    <div v-if="telephoneWidgetStatus=='Bar'" @click="telephoneWidgetStatus='Pad'"
        style="height:40px;width:300px;border:1px solid #000000;position: absolute;bottom:0;right:0;z-index: 999999;background-color: #ffffff;
            box-sizing: border-box;">
        电话
    </div>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
		return {
            telephoneWidgetStatus:"Bar"
		}
    },
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
    /* overflow: hidden; */
    /* overflow-x: scroll; */
    /* overflow: scroll; */
  }
  /* #routerViewId{} */
  
</style>
