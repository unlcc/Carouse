(function(win,doc){
	var defaultOptions = {
	};

	var Carousel = function(dom,srcList,options){
		if(!(this instanceof Carousel)){
			return new Carousel(dom,options);
		}

		var _this = this;
		_this.pos = 0;
		_this.newLeft = 0;
		_this.timer=null;  

		_this.dom = doc.getElementById(dom);
		_this.srcList = srcList;
		_this.options = {};
		if(options){
			_this.options = Object.assign(_this.options,defaultOptions,options);
		}
		_this.length = _this.srcList.length;//图片数量
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

		_this.initStyle();
	};

	Carousel.prototype = {
		initStyle: function(){
			var _this = this;
			for(var pro in _this.options){
				_this.dom.style[pro] = _this.options[pro];
			}
			_this.event();
		},
		event: function(){
			var _this = this;
			var left = document.getElementById("left-turn-carousel");
			var right = document.getElementById("right-turn-carousel");
			var ul = document.getElementById("carousel-ul");
			// var dotUl = document.getElementById("dot-ul");
			left.addEventListener("click",function(){
				_this.pos++;
				if(_this.pos <= _this.length){
					_this.animate(ul,-_this.options.width.split("px")[0]*_this.pos,'left',function(){
						if(_this.pos >= _this.length){
							_this.pos = 0;
							ul.style.left = "0px";
						}
					});
				}
			});

			right.addEventListener("click",function(){
				_this.pos--;
				if(_this.pos < 0){
					_this.pos = _this.length;
					ul.style.left = -_this.options.width.split("px")[0]*_this.pos+"px";
					_this.pos--;
				}
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
			clearInterval(_this.timer);

			_this.timer = setInterval(function(){
				if(Math.abs(dom.style.left.split("px")[0]) < Math.abs(target) && direction =='left'){
					dom.style.left = dom.offsetLeft + speed +'px';
				}else if(Math.abs(dom.style.left.split("px")[0]) > Math.abs(target) && direction =='right'){
					dom.style.left = dom.offsetLeft + speed +'px';
				}else{
					clearInterval(_this.timer);
					callback && callback();
				}
			}, 5);
		},
	}

	win.Carousel = Carousel;
}(window,document));