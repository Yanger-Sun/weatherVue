<template>
  <div id="app">
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data:function(){
  	return{
        
    }
  },
  components: {
  },
}
</script>

<style>
	
*{
	margin:0;
	padding:0;
	}
body{
	font-size:13px;
	font-family:"Microsoft YaHei","Helvetica";
	}
p,h1,h2,h3,h4,h5,h6,form{
	margin:0;
	padding:0;
}
a{
	color:#000;
	text-decoration:none;
	}
a:hover{
  text-decoration:underline;
}
ul,li,ol{
	list-style:none;
	}
img{
	border:none;
	}
.clear{
	clear:both;
	}
*:focus{
	outline:none;
	}
a {
blr:expression(this.onFocus=this.blur());
}	
	
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 5vh;
  height:95vh;
  overflow-y: scroll;
}
</style>
