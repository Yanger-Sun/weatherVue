<template>
  <div class="weather">
  	
  	<p class="back"><a href="#/">返回首页</a></p>
  	
  	<hr style="height:2px;background:#ccc;"/>
    <div class="weatherBg">
    	  <ul v-if="showNow" class="nowLoca">
    	  	<li class="nowTmp">{{nowtmp}}<span>℃</span></li>
    	  	<li class="nowCity"><span>{{nowbasic.parent_city}}</span><span>{{nowbasic.admin_area}}</span></li>
    	  </ul>
    	  <ul v-if="showNow" class="nowOther">
    	  	<li class="nowwind_sc">{{nowwind_sc}}</li>
    	  	<li class="nowcond_txt">{{nowcond_txt}}</li>
    	  </ul>
    	  <div id="allmap"></div>
    </div>
		<hr style="height:1px;background:#ccc;"/>
		<ul class="nearWeather" v-if="showWeather" v-for="daily in daily_forecast">
<!--	<li class="date">天气预报日期描述:<span>{{daily.date}}</span></li>
			<li>白天天气状况描述:<span>{{daily.cond_txt_d}}</span></li>
			<li>晚间天气状况描述:<span>{{daily.cond_txt_n}}</span></li>
			<li>日出时间状况描述:<span>{{daily.sr}}</span></li>
			<li>日落时间状况描述:<span>{{daily.ss}}</span></li>-->
			<li><span class="nearleft">{{daily.date}}</span><span class="nearMiddle">{{daily.cond_txt_d}}</span><span class="nearRight">{{daily.tmp_max}}℃/{{daily.tmp_min}}℃</span></li>
		</ul>
		<hr style="height:1px;background:#ccc;"/>
		<p style="padding-left: 20px;height:30px;line-height: 30px;font-size: 15px;font-weight: 900;">出行建议</p>
		<ul class="lifestyle" v-if="showNow" v-for="(life,index) in lifestyle">
			<li>
				<span class="lifeType" @click="change(index)">{{life.type}}</span>
				<span class="lifeBrf">{{life.brf}}</span>
				<span class="lifeTxt" >{{life.txt}}</span>
			</li>
		</ul>
		<p v-if="showError" >{{errors}}</p> 
  </div>
</template>



<script>
export default {
  name: 'weather',
  data () {
    return {
    	 city:"",
     	 basic:"",
     	 nowbasic:{},
     	 nowtmp:"",
     	 nowcond_txt:"",
     	 nowwind_sc:"",
     	 showNow:false,
     	 daily_forecast:[],
     	 status:"",
     	 update:{},
     	 showWeather:false,
     	 showError:false,
     	 errors:"",
    	 locations:"",
    	 lifestyle:{}
    }
  },
  methods:{
  	getWeather:function(){
  	 var that = this;
                 
     this.$http.get("https://free-api.heweather.com/s6/weather/forecast?location="+ this.city + "&key=e4495549270f4719b5cf50a6c94c0b57").then(
            function (res) {
                // 处理成功的结果
                
                  var result = res.data.HeWeather6[0]
                
                	this.basic = res.data.HeWeather6[0].basic;
                
               	  this.daily_forecast = res.data.HeWeather6[0].daily_forecast;
                
                  this.status = res.data.HeWeather6[0].status;
                
                  this.update = res.data.HeWeather6[0].update;
                  
                  this.showWeather = true;
                  
                
                
//              JSON.parse(jsonstr)

//9840355d1767a04ead555861b968f0bf
                
                
            },function (res) {
            // 处理失败的结果
            
            
            
            }
        );
      
  	},
	  change:function(index){
	  	this.lifestyle[index].showtxt = !this.lifestyle[index].showtxt;
	  }
  
  },
  watch:{
  	lifestyle:{
  		　handler(curVal,oldVal){
　　　　　　　　　　　　console.log(curVal,oldVal)
　　　　　　　　　　},
　　　　  deep:true
  	}
  },
  mounted: function() {
  				var map = new BMap.Map("allmap");
					var point = new BMap.Point(116.331398,39.897445);
					map.centerAndZoom(point,12);
				 var that = this
					var geolocation = new BMap.Geolocation();
					geolocation.getCurrentPosition(function(r){
						if(this.getStatus() == BMAP_STATUS_SUCCESS){
							var mk = new BMap.Marker(r.point);
							map.addOverlay(mk);
							map.panTo(r.point);
							console.log(116.331398,r.point.lng,39.897445,r.point.lat)
							that.locations = r.point.lng + ',' + r.point.lat;
						//获取当前温度等信息
						that.$http.get("https://free-api.heweather.com/s6/weather/now?location="+ r.point.lng + "," + r.point.lat + "&key=e4495549270f4719b5cf50a6c94c0b57").then(
             function (res) {
                // 处理成功的结果
                  var result = res.data.HeWeather6[0]
                  
                	that.nowtmp = result.now.tmp;
                	that.nowcond_txt = result.now.cond_txt;
                	that.nowwind_sc = result.now.wind_sc; 
                	that.nowbasic = result.basic;
                	that.showNow = true;
                
            },function (res) {
            // 处理失败的结果
  
            } );
            //获取三天内气温情况
            that.$http.get("https://free-api.heweather.com/s6/weather/forecast?location="+ r.point.lng + "," + r.point.lat + "&key=e4495549270f4719b5cf50a6c94c0b57").then(
            function (res) {
                // 处理成功的结果
                
                  var result = res.data.HeWeather6[0]
                
                	that.basic = res.data.HeWeather6[0].basic;
                
               	  that.daily_forecast = res.data.HeWeather6[0].daily_forecast;
                
                  that.status = res.data.HeWeather6[0].status;
                
                  that.update = res.data.HeWeather6[0].update;
                  
                  that.showWeather = true;
              
                
//              JSON.parse(jsonstr)

//9840355d1767a04ead555861b968f0bf
                
                
            },function (res) {
            // 处理失败的结果
            
            
            
            }
        );
            //获取生活指数
            that.$http.get("https://free-api.heweather.com/s6/weather/lifestyle?location="+ r.point.lng + "," + r.point.lat + "&key=e4495549270f4719b5cf50a6c94c0b57").then(
            function (res) {
                // 处理成功的结果
                  var result = res.data.HeWeather6[0]
                
                	that.lifestyle  = res.data.HeWeather6[0].lifestyle ;
   
   								for(var i =0;i<that.lifestyle.length;i++){
   									if(that.lifestyle[i].type=="comf"){
   										that.lifestyle[i].type="舒适度指数"
   									}else if(that.lifestyle[i].type=="cw"){
   										that.lifestyle[i].type="洗车指数"
   									}else if(that.lifestyle[i].type=="drsg"){
   										that.lifestyle[i].type="穿衣指数"
   									}else if(that.lifestyle[i].type=="flu"){
   										that.lifestyle[i].type="感冒指数"
   									}else if(that.lifestyle[i].type=="sport"){
   										that.lifestyle[i].type="运动指数"
   									}else if(that.lifestyle[i].type=="trav"){
   										that.lifestyle[i].type="旅游指数"
   									}else if(that.lifestyle[i].type=="uv"){
   										that.lifestyle[i].type="紫外线指数"
   									}else if(that.lifestyle[i].type=="air"){
   										that.lifestyle[i].type="空气污染指数"
   									}
   									
   										that.lifestyle[i].showtxt = false;
   								}
   
                  that.showLife = true;
              
                
//              JSON.parse(jsonstr)

//9840355d1767a04ead555861b968f0bf
                
                
            },function (res) {
            // 处理失败的结果
            
            
            
            }
        );
            
       
						}
						else {
							alert('failed'+this.getStatus());
						}        
					},{enableHighAccuracy: true})
            
            
  	
           
          
          
  },
}
</script>

<style>
	.weather .back{
		text-align:left;
		padding:10px 5px;
	}
	.weatherBg{
		width:100%;
		height:50vh;
		position:relative;
	}
	.nowLoca{
	  padding-left:30px;
	}
	.nowCity span{
		margin:0 5px;
	}
	.nowOther{
		height:25px;
		position:absolute;
		width:100%;
		bottom:0;
		left:0;
	}
	.nowOther li{
		width:49%;
		text-align:center;
		float:left;
	}
	.nowwind_sc{
		border-right:1px solid #CCCCCC;
	}
	.weather .require{
		text-align:left;
		height:50px;
		line-height: 25px;
		margin-bottom:10px;
	}
	.weather .inputText{
		margin-left: 25px;
		height:25px;
		
	}
	.weather button{
		width:75px;
		height:25px;
	}
	.weather ul li span{
		padding:0 5px;
	}
	.weather ul .nowTmp{
		font-size: 50px;
		line-height: 70px;
	}
	.weather ul .nowTmp span{
		font-size: 25px;
		line-height: 70px;
	}
	.nearWeather{
		padding:10px 20px 0;
	
	}
	.nearWeather li{
		border-bottom: 1px solid #ccc;
	}
	.weather .nearWeather li span{
		display:inline-block;
		width:33.3%;
		padding: 0;
	}
	.nearWeather li span.nearMiddle{
		text-align: center;
		padding:0;
	}
	.nearWeather li span.nearRight {
    text-align: right;
    padding: 0;
}
	.weather ul{
		margin-bottom: 10px;
	}
	.weather ul li{
		line-height: 25px;
		font-size:16px;
	}
	.weather ul li.date span{
		color:#f51260;
		padding:0;
	}
	.lifestyle{
		padding:0px 20px 0;
	}
	.lifestyle li{
		border-bottom: 1px solid #ccc;
    overflow: hidden;
	}
	.lifestyle li span.lifeType,
	.lifestyle li span.lifeBrf{
		display: inline-block;
		width:50%;
		padding: 0;
		float: left;
		font-size: 15px;
	}
	.lifestyle li span.lifeTxt{
		font-size: 14px;
	}
</style>