<template>
  <div class="new">
  	
  	<p><a href="#/">返回首页</a></p>
  	
  	<hr style="height:2px;background:orange;"/>
  	<h3>查看新闻</h3>
	<hr style="height:1px;background:orange;"/>
    <dl>
    	<dd class="newType">
    		
    	</dd>
    	<dd class="newsBlock"></dd>
    </dl>
  </div>
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
       
    
       
  },
}
</script>