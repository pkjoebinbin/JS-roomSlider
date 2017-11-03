;(function(){

	var RoomSlider = function(slideId){		//给一个参数传递
		
		
		this.slide = document.getElementById(slideId); 	//获取第一层
		this.room = this.slide.getElementsByTagName('div')[0];  //获取第二层
		this.img = this.room.getElementsByTagName('img');	//获取图片的个数
		this.slideWidth = parseInt(getComputedStyle(this.slide).width);	//获取slide的宽度
		this.slideHeight = parseInt(getComputedStyle(this.slide).height);	//获取slide的高度，用来动态居中按钮的位置
		


		this.up = null;		//获取按钮
		this.down = null;		//获取按钮
		this.navButton = null;	//获取到所有的li

		this.time = null;	//定时器
		this.imgIndex = 1;	//获取图片位置
		this.speed = -(this.slideWidth/10);	//动画速度

		this.resetAllButton();	//初始化设置
		
		this.slide.onmouseenter = this.onmouseenter.bind(this);	//按钮绑定事件
		this.slide.onmouseleave = this.onmouseleave.bind(this);	//按钮绑定事件
		this.down.onclick = this.nextStart.bind(this);	//按钮绑定事件
		this.up.onclick = this.prevStart.bind(this);	//按钮绑定事件
		this.autoStart = setInterval(this.nextStart.bind(this),3000);	//定时器
		
		

		

		//遍历所有原点
		for(var j=0;j<this.navButton.length;j++){
			this.navButton[j].onclick = this.navButtonClick.bind(this);
		}
		

	};



	

	//立即执行函数初始化css样式
	RoomSlider.prototype.resetCss = function(){

		//初始化需要的样式
		var createStyle = document.createElement('style');
		/*两个左右按钮公共样式*/
		createStyle.innerHTML+='.buttonCss{font-size:14px;position:absolute;;z-index:2;background:rgba(51,51,51,0.4);color:#fff;padding:4px;border-style:none;outline:none;cursor:pointer;display:none;}';
		createStyle.innerHTML+='.room{position:absolute;}';	//初始化room的css
		createStyle.innerHTML+='.slide{font-size:0;overflow:hidden;position:relative;}'	//初始化slide样式
		createStyle.innerHTML+='.nav{padding:0 4px;list-style:none;position:absolute;font-size:0px;background:rgba(222,222,222,0.4);bottom:10px;right:10px;text-align:center;-moz-border-radius:10px;border-radius:10px;}';	//nav样式
		createStyle.innerHTML+='.navButton{display:inline-block;margin:6px 4px;background:#fff;width:8px;height:8px;-moz-border-radius:8px;border-radius:8px;cursor:pointer;}'	//导航点样式
		document.head.appendChild(createStyle);

	}();


	


	


	


	//初始化函数
	RoomSlider.prototype.resetAllButton = function(){
		
		var buttonPosition = this.slideHeight/2-14;		//动态得到按钮垂直居中的top值


		this.slide.setAttribute('class','slide');
		
		this.room.style.left = 0+'px';	//初始化room的left
		this.room.style.width = this.slideWidth*(this.img.length)+'px';	//设置room的宽度，等于图片的宽度*图片的数量
		this.room.setAttribute('class','room');
		



		//创建按钮prev
		var prev = document.createElement('div');	
		prev.innerHTML = '<';
		prev.setAttribute('class','buttonCss prev');
		prev.style.left= 0 +'px;';
		prev.style.top = buttonPosition+'px'; //设置按钮垂直居中
		this.slide.appendChild(prev);
		this.up = this.slide.querySelector('.prev');	//获取prev按钮


		
		//创建按钮next
		var next = document.createElement('div');	
		next.innerHTML = '>';
		next.setAttribute('class','buttonCss next');
		next.style.right = 0 +'px';
		next.style.top = buttonPosition +'px';	//设置按钮垂直居中
		this.slide.appendChild(next);
		this.down = this.slide.querySelector('.next');



		
		//创建导航原点定位框
		var nav = document.createElement('ul');
		nav.id = 'nav';	
		nav.setAttribute('class','nav');
		this.slide.appendChild(nav);

			

		//生成导航原点
		for(var i=0;i<this.img.length;i++){
			var navButtonLi = document.createElement('li');
			navButtonLi.setAttribute('class','navButton');
			navButtonLi.index = i+1;
			nav.appendChild(navButtonLi);
		}
		this.navButton = this.slide.getElementsByTagName('li');	//获取到所有的li
		this.navButton[0].style.background = '#333';	//初始化第一个点的颜色
		
	}


		
		
	

	
	//鼠标进入事件
	RoomSlider.prototype.onmouseenter = function(){

		this.down.style.display = 'block';
		this.up.style.display = 'block';
		clearInterval(this.autoStart);
		this.autoStart = null;
	}

	//鼠标离开事件
	RoomSlider.prototype.onmouseleave = function(){
		this.down.style.display = 'none';
		this.up.style.display = 'none';
		clearInterval(this.autoStart);
		this.autoStart = null;
		this.autoStart = setInterval(this.nextStart.bind(this),3000);	
	}

	
	//down按钮事件
	RoomSlider.prototype.nextStart = function(){
		
		
		clearInterval(this.time);
		var _this = this;

		this.time = setInterval(function(){

				
				var left = parseInt(_this.room.style.left);

				if(_this.imgIndex< _this.img.length ){

					if(left > (-_this.slideWidth*_this.imgIndex) ){
						_this.room.style.left = parseInt(_this.room.style.left)+_this.speed+'px';	
					}else{
						clearInterval(_this.time);
						_this.room.style.left = -_this.slideWidth*_this.imgIndex +'px';
						
						_this.navButton[_this.imgIndex-1].style.background = '#fff';
						_this.imgIndex++;
						_this.navButton[_this.imgIndex-1].style.background = '#333';

					}

				}else{
					if(left < 0){
						_this.room.style.left = parseInt(_this.room.style.left)+(-_this.speed*2)+'px';	

					}else{
						clearInterval(_this.time);
						_this.room.style.left = 0+'px';
						_this.navButton[_this.imgIndex-1].style.background = '#fff';
						_this.imgIndex = 1;
						_this.navButton[_this.imgIndex-1].style.background = '#333';

							
					};

				};	
		},16.7);

	}


	//up按钮事件
	RoomSlider.prototype.prevStart = function(){
		
		clearInterval(this.time);
		var _this = this;

		this.time = setInterval(function(){

				var left = parseInt(_this.room.style.left);

				if(_this.imgIndex == 1){
					if(left > -_this.slideWidth*(_this.img.length-1)){
						_this.room.style.left = left+(_this.speed*2) +'px';
						
					}else{
						clearInterval(_this.time);
						_this.room.style.left = -_this.slideWidth*(_this.img.length-1)+'px';
						
						_this.navButton[_this.imgIndex-1].style.background = '#fff';
						_this.imgIndex = _this.img.length;
						_this.navButton[_this.imgIndex-1].style.background = '#333';
					}
				}else{


					if(left < -(_this.slideWidth*(_this.imgIndex-1)-_this.slideWidth)){
						_this.room.style.left = left - _this.speed +'px';

					}else{
						clearInterval(_this.time);
						_this.room.style.left = -(_this.slideWidth*(_this.imgIndex-1)-_this.slideWidth) + 'px';
						
						_this.navButton[_this.imgIndex-1].style.background = '#fff';
						_this.imgIndex--;
						_this.navButton[_this.imgIndex-1].style.background = '#333';
					}

				}

		},16.7);
	}


	//原点点击事件
	RoomSlider.prototype.navButtonClick = function(e){
		

		clearInterval(this.time);
		var _this= this;
		var liTarget = e.target;		//匿名函数的this问题，需要同时指向构造函数与目标dom，采用e.target获取index
		
		this.time = setInterval(function(){
			

			var left = parseInt(_this.room.style.left);
				
			//如果点击的原点位置大于轮播现在的位置
			if(liTarget.index>_this.imgIndex){
				if(left > -(_this.slideWidth)*(liTarget.index-1)){
					_this.room.style.left = parseInt(_this.room.style.left)+_this.speed*(liTarget.index-_this.imgIndex)+'px';	
				}else{
					clearInterval(_this.time);
					_this.room.style.left = -(_this.slideWidth)*(liTarget.index-1)+'px';
					_this.navButtonStyle.call(_this,liTarget);
					
						
				}

			//如果点击的原点位置小于轮播的位置	
			}else if(liTarget.index<_this.imgIndex){
				if(left < -_this.slideWidth*(liTarget.index-1)){
					_this.room.style.left = parseInt(_this.room.style.left)-_this.speed*(_this.imgIndex-liTarget.index)+'px';	
				}else{
					clearInterval(_this.time);
					_this.room.style.left = (-_this.slideWidth)*(liTarget.index-1)+'px';
					_this.navButtonStyle.call(_this,liTarget);
					
				}
			}else{
				return false;
			}
		},16.7);
	}

	
	

	//原点样式改变
	RoomSlider.prototype.navButtonStyle = function(liTarget){
		liTarget.style.background = '#333';
		this.navButton[this.imgIndex-1].style.background = '#fff';
		this.imgIndex = liTarget.index;
	}



	this.RoomSlider = RoomSlider;

})();


	



