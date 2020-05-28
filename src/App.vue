<template>
  <div id="app">
      <keep-alive>
          <router-view/>
      </keep-alive>


  </div>
</template>
<script>

export default {
  name: 'App',
  created(){
    debugger
    let thisVue=this
    $.get('/config',function(res){
			thisVue.$store.state.serVersion = res.data.version
		})
  },
 
}
</script>

<style>
html{
  height: 100%;
  width: 100%;
}
body{
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
