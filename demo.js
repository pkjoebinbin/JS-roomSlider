window.onload = function(){
	
	var room = document.getElementById('room');		//获取第二层
	var slide = document.getElementById('slide');	//获取第一层
	var img = room.getElementsByTagName('img');	//获取图片的个数
	var slideWidth = parseInt(getComputedStyle(slide).width);	//获取slide的宽度
	var slideHeight = parseInt(getComputedStyle(slide).height);	//获取slide的高度，用来动态居中按钮的位置
	
	
	
	
	//初始化操作，建立按钮，定位点
	var reset = function (){	


		//初始化需要的样式
		var createStyle = document.createElement('style');

		/*两个左右按钮公共样式*/
		createStyle.innerHTML+='.buttonCss{font-size:14px;position:absolute;;z-index:2;background:rgba(51,51,51,0.4);color:#fff;padding:4px;border-style:none;outline:none;cursor:pointer;display:none;}';
		createStyle.innerHTML+='.buttonPosition{top:'+ (slideHeight/2-14) +'px;}';	//两个按钮动态的垂直定位
		createStyle.innerHTML+='.room{position:absolute;'+'width:'+ (slideWidth*img.length +'px;}');	//初始化room的css
		createStyle.innerHTML+='.slide{font-size:0;overflow:hidden;position:relative;}'	//初始化slide样式
		createStyle.innerHTML+='.nav{padding:0 4px;list-style:none;position:absolute;font-size:0px;background:rgba(222,222,222,0.4);bottom:10px;right:10px;text-align:center;-moz-border-radius:10px;border-radius:10px;}';	//nav样式
		createStyle.innerHTML+='.navButton{display:inline-block;margin:6px 4px;background:#fff;width:8px;height:8px;-moz-border-radius:8px;border-radius:8px;cursor:pointer;}'	//导航点样式
		document.head.appendChild(createStyle);
		room.style.left = 0+'px';	//初始化room的left

		
		
		//按钮prev
		var prev = document.createElement('div');	
		prev.id ='prev';	
		prev.innerHTML = '<';
		prev.setAttribute('class','buttonCss buttonPosition');
		prev.style = 'left:0px;';
		slide.appendChild(prev);





		//按钮next
		var next = document.createElement('div');	
		next.id ='next';	//给定id
		next.innerHTML = '>';
		next.setAttribute('class','buttonCss buttonPosition');
		next.style ='right:0px';
		slide.appendChild(next);



		//导航原点定位框
		var nav = document.createElement('ul');
		nav.id = 'nav';	
		nav.setAttribute('class','nav');
		slide.appendChild(nav);


		//生成导航原点
		for(var i=0;i<img.length;i++){
			var navButton = document.createElement('li');
			navButton.setAttribute('class','navButton');
			navButton.index = i+1;
			nav.appendChild(navButton);
		}


		
		
		//遍历所有的原点
		;(function(){
			var li = slide.getElementsByTagName('li');	//获取到所有原点

			for(var i=0;i<li.length;i++){
				
			li[i].onclick = function(){
				
				clearInterval(time);
				var _this = this;
				time = setInterval(function(){
				var left = parseInt(room.style.left);
				
				//如果点击的原点位置大于轮播现在的位置
				if(_this.index>imgIndex){
					if(left > -(slideWidth)*(_this.index-1)){
						room.style.left = parseInt(room.style.left)+speed*(_this.index-imgIndex)+'px';	
					}else{
						clearInterval(time);
						room.style.left = -(slideWidth)*(_this.index-1)+'px';
						navButtonStyle.call(_this,li);
						
					}

				//如果点击的原点位置小于轮播的位置	
				}else if(_this.index<imgIndex){
					if(left < -slideWidth*(_this.index-1)){
						room.style.left = parseInt(room.style.left)-speed*(imgIndex-_this.index)+'px';	
					}else{
						clearInterval(time);
						room.style.left = (-slideWidth)*(_this.index-1)+'px';
						navButtonStyle.call(_this,li);
						
					}
				}else{
					return false;
				}
				},16.7);	
			}
			
			}
		})();


		//点击原点完成后原点的变化的函数，同时改变imgIndex。
		function navButtonStyle(li){
			this.style.background = '#333';
			li[imgIndex-1].style.background = '#fff';
			imgIndex = this.index;
		}


		


		//初始化第一个点的颜色
		slide.getElementsByTagName('li')[0].style.background = '#333';

		

	}();


	

	


	


	


	


	var up = document.getElementById('prev');		//获取按钮
	var down = document.getElementById('next');		//获取按钮

	var navButton = slide.getElementsByTagName('li');	//获取到所有的li

	



	

	
	var imgIndex = 1;	//获取图片位置

	var time = null;	//设置个定时器，这个是动画的定时器

	var speed = -40;	//动画的速度
	

	var backSpeed= 200;		//当第一张或最后一张时，相互返回的动画速度
		

	function nextStart(){
		
		clearInterval(time);

		
		
		


		time = setInterval(function(){

				var left = parseInt(room.style.left);

				if(imgIndex < img.length){

					if(left > (-slideWidth*imgIndex) ){
						room.style.left = parseInt(room.style.left)+speed+'px';	
					}else{
						clearInterval(time);
						room.style.left = -slideWidth*imgIndex +'px';
						
						navButton[imgIndex-1].style.background = '#fff';
						imgIndex++;
						navButton[imgIndex-1].style.background = '#333';

					}

				}else{
					if(left < 0){
						room.style.left = parseInt(room.style.left)+backSpeed+'px';	
					}else{
						clearInterval(time);
						room.style.left = 0+'px';
						navButton[imgIndex-1].style.background = '#fff';
						imgIndex = 1;
						navButton[imgIndex-1].style.background = '#333';

							
					};

				};	
		},16.7);

		
	
	}


	function prevStart(){
		
		clearInterval(time);

		

		time = setInterval(function(){

				var left = parseInt(room.style.left);

				if(imgIndex == 1){
					if(left > -slideWidth*(img.length-1)){
						room.style.left = left-backSpeed +'px';
					}else{
						clearInterval(time);
						room.style.left = -slideWidth*(img.length-1)+'px';
						
						navButton[imgIndex-1].style.background = '#fff';
						imgIndex = img.length;
						navButton[imgIndex-1].style.background = '#333';
					}
				}else{


					if(left < -(slideWidth*(imgIndex-1)-slideWidth)){
						room.style.left = left - speed +'px';

					}else{
						clearInterval(time);
						room.style.left = -(slideWidth*(imgIndex-1)-slideWidth) + 'px';
						
						navButton[imgIndex-1].style.background = '#fff';
						imgIndex--;
						navButton[imgIndex-1].style.background = '#333';
					}

				}

		},16.7);
	
	}


	down.onclick = nextStart;
	up.onclick = prevStart;

	autoStart = setInterval(nextStart,3000);


	slide.onmouseleave = function(){
		down.style.display = 'none';
		up.style.display = 'none';
		clearInterval(autoStart);
		autoStart = null;
		autoStart = setInterval(nextStart,3000);	
	}



	slide.onmouseenter = function(){
		down.style.display = 'block';
		up.style.display = 'block';
		clearInterval(autoStart);
		autoStart = null;
	}



}






