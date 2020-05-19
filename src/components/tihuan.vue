<template>
<div>
	
</div>
</template>

<script>
import qs from 'qs';
export default {
	name: 'caseDetails',
	data () {
		return {
			
		}
	},
	computed:{
		
	},
	components:{

	},
	beforeCreate(){

	},
	created(){

	},
	mounted(){
		// console.log(this.$route.query)
		// console.dir(JSON.parse(this.$route.query.query))
		// if(this.$route.query.query)+
		// if(this.$route.query.query)
		// let query = JSON.parse(this.$route.query.query)
		// console.log(query)
		// this.$router.replace({path:this.$route.query.path,query:query})
	},
	activated(){
		// console.dir(JSON.stringify(this.$route.query.query))
		let query = {}
		if(this.$route.query.query){
			query = JSON.parse(this.$route.query.query)
		}
		debugger
		console.log(this.$route.query.path)
		this.$router.replace({path:this.$route.query.path,query:query})
	},
	methods: {
		
	},
}
</script>
