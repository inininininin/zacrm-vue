<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>

    <iframe v-show="$canKtTelephone"  ref="ktTelephone" 
        style="border:none;resize: none;height:500px;width:300px;position: absolute;bottom:0;right:0;z-index: 999999999;" 
        src='./assets/kt-telephone/index.html'></iframe>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
		return {
		}
    },
    mounted(){
        debugger
        let ts = this;
        ts.$components[ts.$el.id]=this
        
        ts.$refs.ktTelephone.contentWindow.userWid=ts.$store.state.loginRefresh.token
        ts.$refs.ktTelephone.contentWindow.callRecordUrl='http://192.168.2.100/crm/kt-telephone/call-record'
        ts.$refs.ktTelephone.contentWindow.recordFileUrl='http://192.168.2.100/crm/kt-telephone/record-file'
        ts.$refs.ktTelephone.contentWindow.heartBeatUrl='http://192.168.2.100/crm/kt-telephone/heart-beat'
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
