<template>
</template>

<script>
export default {
  name: 'new',
  data () {
    return {
    	 showNum:0,
    	 type:"",
    	 types:[],
    	 
    }
  },
  methods:{
  	getNew:function(){
  		
  	}
  },
  mounted: function() {
       this.$http.jsonp("http://www.sojson.com/open/api/lunar/json.shtml",{ credentials: true }).then(function(result){
       	console.log(result)
       },function(){
       	
       })
       
  },
}
</script>

<style>
</style>