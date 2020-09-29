import Vue from 'vue';
import axios from 'axios'
import store from '../store'
import qs from 'qs'
let vue = new Vue();

var token = '';
function callFn(_callee){
    if(!_callee){
        vue.$message('号码不能为空')
        return '';
    }
    callSevice(_callee);
}
async function callLogin(){
    await axios.post('/login-pbx')
    .then(res=>{
        console.log(res)
        if(res.data.data.token){
            token = res.data.data.token
            console.log(token)
        }
    })
}
async function callSevice(_callee){

    if(!store.state.callToken){
        await callLogin();
    }
    console.log(store.state.loginRefresh)
    if(store.state.loginRefresh&&_callee){
        if(store.state.loginRefresh.extTel){
            await axios.post('http://192.168.2.101/api/v2.0.0/call/dial?token='+token,JSON.stringify({
                caller: store.state.loginRefresh.extTel,
                callee: _callee,
                dialpermission:_callee,
                autoanswer:'yes',
            }))
            .then(res=>{
                debugger
                if(res.data.status == 'Failed'){
                    vue.$message('拨打失败')
                }
            })
        }else{
            vue.$message('拨打失败')
            vue.$common.loginRefresh()
        }
        
    }else{
        vue.$message('拨打失败')
        vue.$common.loginRefresh()
    }
    
   
}
export default {
	callFn
};