import Vue from 'vue';
import axios from 'axios'
import store from '../store'
import qs from 'qs'
let vue = new Vue();

function callFn(_callee){
    if(!_callee){
        vue.$message('号码不能为空')
        return '';
    }
    callLogin(_callee);
}
function callLogin(_callee){
    axios.post('/pbx/api/v2-0-0/login')
    .then(res=>{
        console.log(res)
        if(res.data.codeMsg){
            vue.$message('拨打失败')
        }
        if(res.data.code == 0){
            callSevice(_callee);
        }
    })
}
function callSevice(_callee){
    console.log(store.state.loginRefresh)
    if(store.state.loginRefresh&&_callee){
        if(store.state.loginRefresh.extTel){
            axios.post('/pbx/api/v2-0-0/call/dial?',qs.stringify({
                caller: store.state.loginRefresh.extTel,
                callee: _callee
            }))
            .then(res=>{
                debugger
                if(res.data.data.status == 'Failed'){
                    vue.$message(_callee+'拨号失败，请重试')
                }else{
                    vue.$message(_callee+'以拨号，请等待话机响铃')
                }
            }).catch(err=>{
                debugger
                console.log(erro);
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