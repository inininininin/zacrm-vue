import Vue from 'vue';
import store from '../store'
import axios from 'axios'
import qs from 'qs'
import router from '../router/index.js'
let vue = new Vue();
function loginRefresh(){
    axios.post('/crm/login-refresh')
    .then(res=>{
        if(res.data.codeMsg){
            vue.$message(res.data.codeMsg);
        }
        if(res.data.code == 0){
            store.state.loginRefresh = res.data.data
        }else{
            router.push({path:'/login'})
        }
    })
   
}

export default {
    loginRefresh
};