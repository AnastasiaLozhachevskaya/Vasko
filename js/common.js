
var elems = [];

$(document).ready(function(){

	$(".parallax_window").parallax({imageSrc: "img/bg.jpg"});
	$(".parallax_itp").parallax({imageSrc: "img/bg.jpg"});
	$(".parallax_decimals").parallax({imageSrc: "img/bg.jpg"});

	$.fn.num = function(cb, duration){
		console.log(this.length);
		for(var i = 0; i < this.length; i++){
			cb($(this[i]), duration);
		}
		// for(var n in this){
		// 	console.log(this)
		// 	// cb($(this[n]));
		// }
	}

	init();
	initSlider();
	initForm();

	initAnchor();

	// $('a, div.search input[type="submit"]').css({
	// 	'transition' : '0.5s'
	// });

	r('.text-container_1', 'fade-in');
	// r('.catalogue .button', 'roll-in-left');
	r('.pros .line .pro', 'push-in-down');
    r('.production .button', 'clip-y-in');
    r('footer', 'slide-in-up');

    r('.about', 'fade-in', 500);
    r('.categories', 'fade-in', 700);
    r('.pop_artic', 'fade-in', 900);
    r('.contacts', 'fade-in', 1100);

    // r('.logo_1', 'flip-in-y', 300);

    // r('.logo_2', 'clip-y-in');

    // r('.production .foto', 'fade-in');

	// r('.menu', 'slide-in-left');
    for(var i = 7; i >= 1; i--){
    	r('.menu li:nth-child(' + i +')', 'fade-in', (7 - i) * 50);
    }


    var once = false;
    r('.numbers', function(){

    	if(once == false){
    		once = true;
    		$('.numbers').css({'opacity' : 1});
    		$('.numbers span').num(function(elem, duration){	
    			var max = elem.html();
    			elem.html(0);
    			var c = 0;
    			var stepDur = duration / max;
    			console.log(stepDur);
    			var id = setInterval(function(){
    				if(c < max){
    					elem.html(++c);
    				} else {
    					clearInterval(id);
    				}
    			}, stepDur);
    			// console.log(elem.html());
    		}, 3000);
    	}
    		
    })

    

    onScroll();
       
       
});

function initAnchor(){

	$(window).scroll(function(){
		if($(window).scrollTop() > $(window).height() / 2){
			$('.to-top').fadeIn();
		} else if($(window).scrollTop() < $(window).height() / 2){
			$('.to-top').fadeOut();
		}
	});
	$('.to-top').click(function(){
		$('html, body').animate({
        		scrollTop: 0
    		}, 500);
	});
	$('.menu a').click(function(e){
		e.preventDefault();
		var a = $(this).attr('href');
		if(a){

			$('html, body').animate({
        		scrollTop: $('a' + a).offset().top
    		}, 500);
			// var top = $('a' + a);
			// $('body').scrollTo(top);
			// console.log(top);
		}
		
	});
}




function r(selector, className, delay){
		if(delay == undefined) {
			delay = 0;
		}
		var elem = $(selector);
		var offsetTop = elem.offset().top;
		var elemHeight = elem.height();
		elem.css({opacity : '0'});
		var func;
		// if(typeof className == 'function'){
		// 	func = className;
		// } else {
			func = function(scroll){
			if(scroll + $(window).height() > offsetTop){
				setTimeout(function(){
						if(typeof className == 'function'){
							className();
						} else {
							elem.addClass(className);
							elem.css({opacity : '1'});
						}
						
					}, delay);
				}
			}
	
		// }
		elems.push(func);
}

function register(){

}

function onScroll(){
	for(var i in elems){
       		elems[i]($(this).scrollTop());
       		// console.log(func)
       	}
}

function init(){
	$(window).scroll(onScroll);
}



// function w (){
// $('.slide').width($(window).width());
// var width = $('.slide').length * $('.slide').width();
// $('.sl-container').css({'width' : width + 'px'});
// }

// function initSlider(){
//  $('.slide').css({'float' : 'left'});
//  $('.slider').css({'overflow' : 'hidden'});
//  $(window).resize(w);
//  w();
//  function slide(){
//   $('.slide:first-child').animate({'margin-left' : -$('.slide:first-child').width() + 'px'}, 2000, function(){

//    $('.sl-container').append($('.slide:first-child').css({'margin-left' : 0}));

//   });
//  }
//  setTimeout(function(){
//   slide();
//   setInterval(slide, 7000);
//  }, 5000);
 

// }






// function initForm(){
// 	var form = $('.callback_form');
// 	var bg = $('.form-bg');

// 	form.find('.submit').click(function(){
// 		send(form, hide);

// 	});
// 	$(window).resize(resize);
// 	$('.callback a').click(function(e){
// 		e.preventDefault();
		
// 		resize();
// 		form.fadeIn(500);
// 		bg.fadeIn(500);
// 	});

// 	bg.click(hide);

// 	function resize(){
// 		form.css({
// 			'top' : $(window).height() / 2 - form.height() / 2 + 'px',
// 			'left' : $(window).width() / 2 - form.width() / 2 + 'px'
// 		});
// 	}

// 	function hide(){
// 		form.fadeOut(500);
// 		bg.fadeOut(500);
// 	}

// 	function send(form, cb){

// 	//send
// 		cb();
// 	}

// }



