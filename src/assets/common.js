import Vue from 'vue';
import store from '../store'
import axios from 'axios'
import qs from 'qs'
import router from '../router/index.js'
let vue = new Vue();
function loginRefresh(){
    axios.post('/login-refresh')
    .then(res=>{
        if(res.data.codeMsg){
            vue.$message(res.data.codeMsg);
        }
        if(res.data.code == 0){
            store.state.loginRefresh = res.data.data
            if(!res.data.data.extTel){
                vue.$message('暂未绑定分机号,请联系研发部')
            }
        }else{
            router.push({path:'/login'})
        }
    })
   
}

export default {
    loginRefresh
};