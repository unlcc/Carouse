(function(win,doc){
	var defaultOptions = {
	};
	
	//构造函数
	var Carousel = function(dom,srcList,options){
		if(!(this instanceof Carousel)){
			return new Carousel(dom,options);
		}
		//初始化属性
		var _this = this;
		_this.pos = 0;
		_this.newLeft = 0;
		_this.timer=null;  

		_this.dom = doc.getElementById(dom);
		_this.srcList = srcList;
		_this.options = {};
		//连接配置项
		if(options){
			_this.options = Object.assign(_this.options,defaultOptions,options);
		}
		_this.length = _this.srcList.length;//图片数量
		//构造html结构
		var liString = '<ul id="carousel-ul">';
		// var dotString = '<ul id="dot-ul">';
		for(let i = 0; i<_this.length; i++){
			liString += '<li><img src="'+_this.srcList[i]+'" alt="Carouel - '+(i+1)+'"></li>'
			// dotString += '<li class="dot"></li>'
		}
		//无缝滚动的最后一张、第一张
		liString += '<li><img src="'+_this.srcList[0]+'" alt="Carouel - last"></li></ul>';
		// liString += dotString +"</ul>";
		liString += '<span id="left-turn-carousel"><</span><span id="right-turn-carousel">></span>'
		_this.dom.innerHTML = liString;
		
		//使用样式
		_this.initStyle();
	};

	Carousel.prototype = {
		//初始化样式方法
		initStyle: function(){
			var _this = this;
			for(var pro in _this.options){
				_this.dom.style[pro] = _this.options[pro];
			}
			_this.event();
		},
		//事件绑定方法
		event: function(){
			var _this = this;
			var left = document.getElementById("left-turn-carousel");
			var right = document.getElementById("right-turn-carousel");
			var ul = document.getElementById("carousel-ul");
			// var dotUl = document.getElementById("dot-ul");
			left.addEventListener("click",function(){
				//当前位置+1
				_this.pos++;
				//如果当前位置小于轮播图长度
				if(_this.pos <= _this.length){
					//执行动画
					_this.animate(ul,-_this.options.width.split("px")[0]*_this.pos,'left',function(){
						//如果当前位置>=轮播图长度,执行回调
						if(_this.pos >= _this.length){
							//位置置为0,起始位置
							_this.pos = 0;
							ul.style.left = "0px";
						}
					});
				}
			});

			right.addEventListener("click",function(){
				//当前位置-1
				_this.pos--;
				//如果当前位置小于0初始位
				if(_this.pos < 0){
					//位置置为末位假图片
					_this.pos = _this.length;
					ul.style.left = -_this.options.width.split("px")[0]*_this.pos+"px";
					//位置置为真实末尾
					_this.pos--;
				}
				//执行动画
				_this.animate(ul,-_this.options.width.split("px")[0]*_this.pos,'right');
			});

			// dotUl.addEventListener("click", function(e){
			// 	var target = e.target;
			// 	if(target.nodeName.toLowerCase() == 'li'){
			// 		var index;
			// 		for(var i = 0; i < liList.length;i++){
			// 			if(liList[i] == target){
			// 				index = i;
			// 			}
			// 		}
			// 	}
			// });
		},
		animate: function(dom,target,direction,callback){
			var _this = this;
			var speed = 10;
			if(direction == 'left'){
				speed = -speed;
			}
			//每次点击清除上一次动画计时器
			clearInterval(_this.timer);

			_this.timer = setInterval(function(){
				//如果方向为左且轮播图当前位置坐标小于目标位置坐标
				if(Math.abs(dom.style.left.split("px")[0]) < Math.abs(target) && direction =='left'){
					dom.style.left = dom.offsetLeft + speed +'px';
				//如果方向为右且轮播图当前位置坐标大于目标位置坐标
				}else if(Math.abs(dom.style.left.split("px")[0]) > Math.abs(target) && direction =='right'){
					dom.style.left = dom.offsetLeft + speed +'px';
				}else{
					//动画结束 清除计时器，执行回调
					clearInterval(_this.timer);
					callback && callback();
				}
			}, 5);
		},
	}

	win.Carousel = Carousel;
}(window,document));
