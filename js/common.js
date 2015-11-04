(function ($) {


    var elems = [];

    $(document).ready(function () {

        $(".royalSlider").royalSlider({
            arrowsNav: true,
            loop: true,
            autoPlay: true,
            keyboardNavEnabled: true,
            usePreloader: true,
            controlsInside: false,
            imageScaleMode: 'fill',
            arrowsNavAutoHide: true,
            //autoScaleSlider: false,
            autoScaleSliderWidth: 1600,
            autoScaleSliderHeight: 400,
            //controlNavigation: 'bullets',
            thumbsFitInViewport: false,
            navigateByClick: true,
            startSlideId: 0,
            transitionType:'move',
            //transitionSpeed: 600,
            globalCaption: false,
            deeplinking: {
                enabled: true,
                change: false
            },
            autoPlay: {
                enabled: true,
                //pauseOnHover: true,
                delay: 	4000
            }
            /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
            //imgWidth: 1400,
            //imgHeight: 400
        });

        $(".small_menu_btn, .menu_item").click(function() {
            $("#sandwich").toggleClass("active");
        });

        $(".parallax_window").parallax({imageSrc: "img/bg.jpg"});
        $(".parallax_itp").parallax({imageSrc: "img/bg.jpg"});
        $(".parallax_decimals").parallax({imageSrc: "img/bg.jpg"});

        $.fn.num = function (cb, duration) {
            console.log(this.length);
            for (var i = 0; i < this.length; i++) {
                cb($(this[i]), duration);
            }
            // for(var n in this){
            // 	console.log(this)
            // 	// cb($(this[n]));
            // }
        };

        initMenu('div.small_menu button.small_menu_btn', 'div.top_hidden_row div.top_menu_hidden');

        init();
        //initSlider();
        //initForm();

        initAnchor();

        register(600, 800, function(){
            console.log('>= 600 && < 800');
        });

        register(400, 600, function(){
            console.log('>= 400 && < 600');
        });

        register(800, 1000, function(){
            console.log('>= 800 && < 1000');
        });








        //r('.pros .line .pro', 'push-in-down');

        //r('.menu', 'slide-in-left');
        r('.pre_text', 'fade-in-up');


        r('.right', 'push-in-right');
        r('.pros', 'slide-in-up');
        r('.left', 'push-in-left');

        r('.itp h2', 'scale-in');


        r('.foto_right', 'slide-in-right', 200);
        r('.production_text', 'slide-in-left', 200);
        r('.text', 'slide-in-right', 200);
        r('.foto_left', 'slide-in-left', 200);


        r('footer', 'slide-in-up', 200);

        r('.about', 'fade-in', 700);
        r('.categories', 'fade-in', 900);
        r('.pop_artic', 'fade-in', 1100);
        r('.contacts', 'fade-in', 1300);








        for (var i = 7; i >= 1; i--) {
            r('.menu li:nth-child(' + i + ')', 'fade-in', (7 - i) * 50);
        }


        var once = false;
        r('.decimals', function () {

            if (once == false) {
                once = true;
                $('.decimals').css({'opacity': 1});
                $('.decimals span').num(function (elem, duration) {
                    var max = elem.html();
                    elem.html(0);
                    var c = 0;
                    var stepDur = duration / max;
                    console.log(stepDur);
                    var id = setInterval(function () {
                        if (c < max) {
                            elem.html(++c);
                        } else {
                            clearInterval(id);
                        }
                    }, stepDur);
                    // console.log(elem.html());
                }, 3000);
            }

        });


        onScroll();


    });

    function initMenu(activatorSelector, menuSelector){
        var btn = $(activatorSelector);
        var menu = $(menuSelector);
        menu.css({
            'top' : (-menu.height() + btn.height()) + 'px'
        });
        btn.click(function(){
            if(!menu.hasClass('open')){
                slideDown();
            } else {
                slideUp();
            }

        });
        function slideDown(){
            menu.addClass('open');
            menu.animate({'top' : btn.height() + 'px'}, 400);
        }

        function slideUp(){
            menu.animate({'top' : (-menu.height() + btn.height()) + 'px'}, 400, function(){
                menu.removeClass('open');
            });
        }

        $(window).resize(function(){
            if(menu.hasClass('open')){
                slideUp();
            }
        });
    }

    function register(min, max, func){
        var width = $(window).width();
        var active = width >= min && width < max;
        if(active) func();
        $(window).resize(function(){
            //console.log(active);
            var width = $(window).width();
            if(active){
                if(width < min || width >= max){
                    active = false;
                }
            } else {
                if(width >= min && width < max){
                    active = true;
                    func();
                }
            }
        });
    }

    function initAnchor() {

        $(window).scroll(function () {
            if ($(window).scrollTop() > $(window).height() / 2) {
                $('.to-top').fadeIn();
            } else if ($(window).scrollTop() < $(window).height() / 2) {
                $('.to-top').fadeOut();
            }
        });
        $('.to-top').click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        });
        $('.menu a').click(function (e) {
            e.preventDefault();
            var a = $(this).attr('href');
            if (a) {

                $('html, body').animate({
                    scrollTop: $('a' + a).offset().top
                }, 500);
                // var top = $('a' + a);
                // $('body').scrollTo(top);
                // console.log(top);
            }

        });
    }

    function r(selector, className, delay) {
        if (delay == undefined) {
            delay = 0;
        }

        var elem = $(selector);
        if (elem.length == 0){
            console.log('FOOO');
            return;
        }
        var offsetTop = elem.offset().top;
        //var elemHeight = elem.height();
        elem.css({opacity: '0'});
        var func;
        // if(typeof className == 'function'){
        // 	func = className;
        // } else {
        func = function (scroll) {
            if (scroll + $(window).height() > offsetTop) {
                setTimeout(function () {
                    if (typeof className == 'function') {
                        className();
                    } else {
                        elem.addClass(className);
                        elem.css({opacity: '1'});
                    }

                }, delay);
            }
        };

        // }
        elems.push(func);
    }

    function onScroll() {
        for (var i in elems) {
            elems[i]($(this).scrollTop());
            // console.log(func)
        }
    }

    function init() {
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


})(jQuery);