$(window).on('load', function() {
});

document.addEventListener("DOMContentLoaded", function() {
	//generating uid
	var cookie = JSON.parse(localStorage.getItem("cookie"));
	if (!cookie) {
		var id = {
			id: randomString(16)
		};
		localStorage.setItem("cookie", JSON.stringify(id));
		cookie = JSON.parse(localStorage.getItem("cookie"));
	}
	window.uid = cookie["id"];
	var uidInp = $('input[name="uid"]');
	uidInp.each(function(){
		$(this).val(window.uid);
	});
	function randomString(length) {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		var result = '';
		for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
		return result;
	}
	//end generating uid

	$(".js-scroll-to").on('click', function(e) {
		e.preventDefault();
		if(!$(this).hasClass('active')){
			var elementClick = $(this).data("href");
			var target = conf.body.find('[data-id="' + elementClick + '"]');
			if (target.length) {
				var destination = $(target).offset().top,
					pad = window.matchMedia('(max-width: 600px)').matches ? 65 : 74;
				if(elementClick == 'tabswrapper'){
					$("html, body:not(:animated), .out:not(:animated)").animate({
						scrollTop: destination
					}, 500);
				}else{
					$("html, body:not(:animated), .out:not(:animated)").animate({
						scrollTop: destination - pad
					}, 500);
				}
			}
		}
	});

	var conf = {
		body: $('body'),
		header: $('.page__header'),
		html: $('html'),
		hidden: 'is-hidden',
		wrpr: $('.wrapper'),
		arnextcontent: '<button type="button" class="slick-next slick-arrow"><div class="icon"><svg viewBox="0 0 20 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1229.000000, -6970.000000)" fill="#BBBBBB"><g transform="translate(0.000000, 6681.000000)"><g transform="translate(190.000000, 289.000000)"><path d="M1049,28.2721055 L1030.57779,9.84989661 L1030.57779,9.84989661 C1030.2195,9.49160084 1029.63858,9.49160084 1029.28029,9.84989661 L1029.28029,9.84989661 L1029.28029,9.84989661 C1028.92199,10.2081924 1028.92199,10.7891046 1029.28029,11.1474004 L1029.28029,11.1474004 L1048.28299,30.1501034 C1048.47951,30.3466238 1048.743,30.4353554 1049,30.4162982 C1049.257,30.4353554 1049.52049,30.3466238 1049.71701,30.1501034 L1068.71971,11.1474004 L1068.71971,11.1474004 C1069.07801,10.7891046 1069.07801,10.2081924 1068.71971,9.84989661 L1068.71971,9.84989661 L1068.71971,9.84989661 C1068.36142,9.49160084 1067.7805,9.49160084 1067.42221,9.84989661 L1067.42221,9.84989661 L1049,28.2721055 Z" id="Combined-Shape-Copy-8" transform="translate(1049.000000, 20.000000) scale(-1, 1) rotate(90.000000) translate(-1049.000000, -20.000000)"></path></g></g></g></g></svg></div></button>',
		arnprevcontent: '<button type="button" class="slick-prev slick-arrow"><div class="icon"><svg viewBox="0 0 20 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1229.000000, -6970.000000)" fill="#BBBBBB"><g transform="translate(0.000000, 6681.000000)"><g transform="translate(190.000000, 289.000000)"><path d="M1049,28.2721055 L1030.57779,9.84989661 L1030.57779,9.84989661 C1030.2195,9.49160084 1029.63858,9.49160084 1029.28029,9.84989661 L1029.28029,9.84989661 L1029.28029,9.84989661 C1028.92199,10.2081924 1028.92199,10.7891046 1029.28029,11.1474004 L1029.28029,11.1474004 L1048.28299,30.1501034 C1048.47951,30.3466238 1048.743,30.4353554 1049,30.4162982 C1049.257,30.4353554 1049.52049,30.3466238 1049.71701,30.1501034 L1068.71971,11.1474004 L1068.71971,11.1474004 C1069.07801,10.7891046 1069.07801,10.2081924 1068.71971,9.84989661 L1068.71971,9.84989661 L1068.71971,9.84989661 C1068.36142,9.49160084 1067.7805,9.49160084 1067.42221,9.84989661 L1067.42221,9.84989661 L1049,28.2721055 Z" id="Combined-Shape-Copy-8" transform="translate(1049.000000, 20.000000) scale(-1, 1) rotate(90.000000) translate(-1049.000000, -20.000000)"></path></g></g></g></g></svg></div></button>',
	};

	(function() {
		var mainHeader = document.querySelector('.cd-auto-hide-header');

		$(window).on('scroll', function() {
			requestAnimationFrame(autoHideHeader);
		});

		function autoHideHeader() {
			var currentTop = $(document).scrollTop();
			checkSimpleNavigation(currentTop);
		}

		function checkSimpleNavigation(currentTop) {
			if (currentTop <= 100) {
				mainHeader.classList.remove(conf.hidden);
				conf.header.parent().removeClass('is-hidden');
			} else {
				mainHeader.classList.add(conf.hidden);
				conf.header.parent().addClass('is-hidden');
			}
		}
	})();

	function DocMenu(){
		var trigger = $('.js-doc-btn'),
			OpenClass = 'active',
			OpenClass2 = 'menu-open';

		trigger.on('click', function() {

			if (!trigger.hasClass('anim')) {
				trigger.addClass('anim');

				if(trigger.hasClass(OpenClass)){

					setTimeout(function(){
						trigger.removeClass(OpenClass);
					},400);

					conf.body.add(conf.header).removeClass(OpenClass2);
					conf.header.parent().removeClass('is-hidden');
					window.__prevScrollTop && (window.scroll(0, window.__prevScrollTop));
					window.__prevScrollTop = null;
				}else{
					var top = $(window).scrollTop();
					window.__prevScrollTop = top;
					trigger.addClass(OpenClass);
					conf.body.add(conf.header).addClass(OpenClass2);
					conf.header.parent().addClass('is-hidden');
					document.body.style.top = -top + "px";
					window.scroll(0, window.__prevScrollTop);
				}
				setTimeout(function() {
					trigger.removeClass('anim')
				}, 500);
			}
		})
	}DocMenu();
	function aside() {
		var elem = $('.js-stick');
		if(elem.length){
			var parent = elem.closest('.js-stick-parent');
			var po = parent.offset().top;
			var ph = parent.height();
			var hh = conf.header.height();
			var ws;
			elem.on('click',function(){
				setTimeout(function(){
					ph = parent.height();
				},500)
			})
			$(window).on('scroll resize',function(){
				ws = $(window).scrollTop();
				if(ws > po && ws < po + ph - hh){
					elem.addClass('is_stuck')
					conf.header.addClass('stucked')
				}else{
					elem.removeClass('is_stuck')
					conf.header.removeClass('stucked')
				}
			});
			var resizeTimer;
			$(window).on('resize',function(){
				clearTimeout(resizeTimer)
				resizeTimer = setTimeout(function(){
					ws = $(window).scrollTop();
					hh = conf.header.height();
					po = parent.offset().top;
					ph = parent.height();
				},300)
			})
		}
	}


	(function() {
		var timer = new Date().valueOf();
		var _ = $(".js-validate");

		_.each(function(){
			var form = $(this),
				_hidden = form.find(".hidden");
			$.validate({
				form: form,
				borderColorOnError: false,
				onValidate: function(form){
				},
				onSuccess: function(form){

					if(_hidden.val().length !== 0 || (Date.now() - timer <= 3000)) {
						console.log("Go away, bot");
					} else {
						var data = form.serialize();
						send(form,data)
						return false
					}
				}
			})
		});
	})();

	function send(form,data){
		var url = '/includes/mail/index.php',
			method = 'post',
			btn = form.find(".btn");
		$.ajax({
			url: url,
			data: data,
			type: method,
			dataType: 'html',
			beforeSend: function(res){
				btn.add(form).addClass('loading');
			},
			success: function (res) {
				window.location.pathname = '/thanks/';
				return false
			},
			error: function(res){
				// get server response and grab its message
				var response = JSON.parse(res);
				form.prepend('<div class="form-msg">'+response.message+'</div>');
				return false
			},
			complete: function(res){
				btn.add(form).removeClass('loading');
			},
		});
	}


	function Menu() {
		var trigger = $('.js-menu'),
			target = $('.mob-menu'),
			OpenClass = 'active',
			OpenClass2 = 'menu-open';

		trigger.add(target).on('click', function() {

			if (!trigger.hasClass('anim')) {
				trigger.addClass('anim');

				target.toggleClass(OpenClass);

				if(trigger.hasClass(OpenClass)){

					setTimeout(function(){
						trigger.removeClass(OpenClass);
					},400);

					conf.body.add(conf.header).removeClass(OpenClass2);

					window.__prevScrollTop && (window.scroll(0, window.__prevScrollTop));
					window.__prevScrollTop = null;
				}else{
					var top = $(window).scrollTop();
					window.__prevScrollTop = top;
					trigger.addClass(OpenClass);
					conf.body.add(conf.header).addClass(OpenClass2);
					document.body.style.top = -top + "px";
					window.scroll(0, window.__prevScrollTop);
				}
				setTimeout(function() {
					trigger.removeClass('anim')
				}, 500);
			}
		})
		$('.mob-menu-inner').click(function(e) {
			e.stopPropagation();
		});
	}
	Menu();

	function scrollAnimations(){
		inView.offset({
			top: 0,
			bottom: 65,
		});
		inView.threshold(0.5);
		inView('.illustration-cont')
			.on('enter', function(el){
				el.classList.add('active');
			})
			.on('exit', function(el) {
				el.classList.remove('active');

			});
	}scrollAnimations();

	function wraparound(){
		var elem = $('.doc-content-inner table');
		var elem2 = $('.doc-content-inner pre');
		var image = document.querySelectorAll('.doc-content-inner img');
		var len = image.length;
		elem.add(elem2).wrap("<div class='scroll-cont'></div>");

		for(var i = 0; i<len; i++){
			$(image[i]).attr('data-action','zoom');
		}
	}wraparound();

	function parntersSloders(){
		$(".js-partnersSlider").each(function() {
			var _this = $(this);
			var parent = _this.parent();
			_this.slick({
				accessibility: true,
				arrows: false,
				draggable: false,
				autoplay: true,
				dots: false,
				touchMove: false,
				infinite: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				autoplaySpeed: 8000,
				responsive: [{
					breakpoint: 750,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
					},
				},{
					breakpoint: 340,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				}
				]
			});
		});
	}
	parntersSloders();
	function feedbackSlider(){
		$(".js-feedbackSlider").each(function() {
			var _this = $(this);
			var parent = _this.parent();
			_this.slick({
				accessibility: true,
				arrows: true,
				draggable: false,
				dots: true,
				touchMove: false,
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				appendArrows: parent.find('.arrows-wrap'),
				appendDots: parent.find('.dots-wrap'),
				nextArrow: conf.arnextcontent,
				prevArrow: conf.arnprevcontent,
				adaptiveHeight: true
			});
		});
	}
	feedbackSlider();
	Tabs();
	aside();
	autosize($('textarea'));
// end of document.ready
});
// end of document.ready
function isMobile()
{
	 return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) );
}
function Tabs(){
	if($('.js-tabs-wrap').length){
		var parent = $('.js-tabs-wrap');
		parent.each(function(){
			var _ = $(this),
				trigger = _.find('.js-tab-trigger'),
				tabbody = _.find('.tabs-body'),
				tabcont = tabbody.find('.tabs-cont'),
				triggerCur = _.find(trigger).filter('.active'),
				triggerIndex = triggerCur.index();

			if(!triggerCur.length){
				tabcont.not(':first').hide();
				trigger.first().addClass('active');
			}else{
				tabcont.hide().eq(triggerIndex).show();
			}

			if(_.hasClass('whoare-inner')){
				var swith = _.find('.js-switch');
				var _t = $(this).find('input');
				swith.on('click',function(e){
					e.preventDefault();
					var state = _t.prop('checked');

					if(state === false){
						_t.prop('checked',true);
						trigger.eq(1).addClass('active').siblings().removeClass('active');
						tabcont.hide().eq(1).fadeIn();
					}else{
						_t.prop('checked',false);
						trigger.eq(0).addClass('active').siblings().removeClass('active');
						tabcont.hide().eq(0).fadeIn();
					}
				});
				_.on('update',function(){
					var active = _.find(trigger).filter('.active').index();
					if(active == 0){
						_t.prop('checked', false)
					}else{
						_t.prop('checked', true)
					}
				});
			}

			trigger.on('click',function(){
				var _ = $(this);
				if(!_.hasClass('active')){
					_.addClass('active').siblings().removeClass('active')
					var triggerA = parent.find(trigger).filter('.active');
					tabcont.hide().eq($(triggerA).index()).fadeIn();
					_.trigger('update');
				}
			});
		});
	}
}
