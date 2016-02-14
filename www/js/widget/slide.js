define(['jquery'], function($) {
	(function($) {
		$.fn.slide = function(options) {

			var defaults      = {
				type          : 'fade',
				duration      : 600,
				speed         : 5000,
				autoPlay      : true,

				showControls  : false,
				hideControls  : false,

				showMarkers   : true,
				hoverPause    : true
			};

			var settings      = $.extend({}, defaults, options);

			var $wrapper      = this,
				$slideElement = $wrapper.find('.slide-element'),
				$slideItem    = $slideElement.children('li'),

				$markerWrap   = null,
				$markerItem   = null,

				$controlsWrap = null,
				$controlsNext = null,
				$controlsPrev = null,

				$cloneFirst   = null,
				$cloneLast    = null;

			var state         = {
				width         : $slideElement.parent().width(),
				slideCount    : $slideItem.length,
				isAnimated    : false,
				isPaused      : false,
				currentSlide  : 1,
				currentIndex  : 0,
				nextSlide     : 0,
				nextIndex     : 0,
				timer         : null
			};

			var dirs          = {
				next          : 'next',
				prev          : 'previous'
			};

			var init = function() {
				if ( state.slideCount > 1 ) {
					if ( settings.showMarkers ) {
						conf_showMarkers();
					}

					if ( settings.showControls ) {
						conf_showControls();
					}

					if ( settings.autoPlay && settings.hoverPause ) {
						conf_stop();
					}

					if ( settings.type === 'slide' ) {
						conf_slide();
					}
				} 
				else {
					settings.autoPlay = false;
				}

				if ( settings.type === 'slide' ) {
					if ( state.slideCount > 1  ) {
						state.currentSlide = 2;
						state.currentIndex = 1;
					} else {
						state.currentSlide = 1;
						state.currentIndex = 0;
					}	
				}

				$slideElement.show();
				$slideItem.eq(state.currentIndex).show();

				if ( settings.autoPlay ) {
					state.timer = setInterval(function() {
						go(dirs.next, false);
					}, settings.speed);
				}
			};

			var conf_showMarkers = function() {
				$markerWrap = $('<ol class="slide-marker"></ol>');
				$.each($slideItem, function(key, value) {

					var slideNum  = key + 1,
						gotoSlide = key + 1;

					if ( settings.type === 'slide' ) {
						gotoSlide = key + 2;
					}

					var $marker = $('<li><a href="#">'+ slideNum +'</a></li>');

					if (slideNum === state.currentSlide) {
						$marker.addClass('active-marker');
					}

					$marker.on('click', 'a', function(e) {
						e.preventDefault();
						if (!state.isAnimated && state.currentSlide != gotoSlide) {
							console.log(gotoSlide);
							go(false, gotoSlide);
						}

					});

					$marker.appendTo($markerWrap);

				});

				$markerWrap.appendTo($wrapper);
				$markerItem = $markerWrap.find('li');
			};

			var conf_showControls = function() {
				$controlsWrap = $('<div class="slide-control"></div>');
				$controlsNext = $('<a href="#" class="next" data-direction="'+ dirs.next +'"><i></i></a>');
				$controlsPrev = $('<a href="#" class="prev" data-direction="'+ dirs.prev +'"><i></i></a>');

				$controlsWrap.on('click', 'a', function(e) {
					e.preventDefault();
					var direction = $(this).attr('data-direction');

					if ( !state.isAnimated ) {
						if ( direction === dirs.next ) {
							go(dirs.next, false);
						}

						if ( direction === dirs.prev ) {
							go(dirs.prev, false);
						}
					}
				});

				$controlsNext.appendTo($controlsWrap);
				$controlsPrev.appendTo($controlsWrap);
				$controlsWrap.appendTo($wrapper);

				if ( !settings.hideControls ) {
					$controlsWrap.show();
				} else {
					$controlsWrap.hide();
				}
			};

			var conf_slide = function() {
				$cloneFirst = $slideItem.eq(0).clone();
				$cloneLast  = $slideItem.eq(state.slideCount - 1).clone();

				$cloneFirst.attr({'data-clone' : 'last', 'data-slide'  : 0}).appendTo($slideElement).show();
				$cloneLast.attr({'data-clone'  : 'first', 'data-slide' : 0}).prependTo($slideElement).show();

				$slideItem = $slideElement.children('li');
				state.slideCount = $slideItem.length;

				$slideElement.css({
					'width' : state.width * (state.slideCount + 2),
					'left'  : -state.width * state.currentSlide
				});

				$slideItem.css({
					'float'    : 'left',
					'position' : 'relative',
					'display'  : 'list-item'
				});
			};

			var conf_stop = function() {
				$wrapper.hover(function() {
					if ( !state.isPaused ) {
						clearInterval(state.timer);
						state.isPaused = true;

						if ( settings.showControls && settings.hideControls ) {
							$controlsWrap.show();
						}
					}
				}, function() {
					if ( state.isPaused ) {
						state.timer = setInterval(function() {
							go(dirs.next, false);
						}, settings.speed);
						state.isPaused = false;

						if ( settings.showControls && settings.hideControls ) {
							$controlsWrap.hide();
						}
					}
				});
			};

			var set_next = function(direction) {
				if ( direction === dirs.next ) {
					if ( $slideItem.eq(state.currentIndex).next().length ) {
						state.nextIndex = state.currentIndex + 1;
						state.nextSlide = state.currentSlide + 1;
					} 
					else {
						state.nextIndex = 0;
						state.nextSlide = 1;
					}
					
				}
				else {
					if ( $slideItem.eq(state.currentIndex).prev().length ) {
						state.nextIndex = state.currentIndex - 1;
						state.nextSlide = state.currentSlide - 1;
					}
					else {
						state.nextIndex = state.slideCount - 1;
						state.nextSlide = state.slideCount;
					}
					
				}
			};

			var go = function(direction, position) {
				if ( !state.isAnimated ) {
					state.isAnimated = true;

					if ( position ) {
						state.nextSlide = position;
						state.nextIndex = position - 1;
					}
					else {
						set_next(direction);
					}

					if ( settings.type === 'fade' ) {
						if ( settings.showMarkers ) {
							$markerItem.removeClass('active-marker');
							$markerItem.eq(state.nextIndex).addClass('active-marker');
						}

						$slideItem.eq(state.currentIndex).fadeOut(settings.duration);
						$slideItem.eq(state.nextIndex).fadeIn(settings.duration, function() {
							state.isAnimated = false;
							state.currentSlide = state.nextSlide;
							state.currentIndex = state.nextIndex;
						});
					}

					if ( settings.type === 'slide' ) {
						if ( settings.showMarkers ) {
							var markerIndex = state.nextIndex - 1;
							
							if( markerIndex === state.slideCount - 2 ) {
								markerIndex = 0;
							}
							else if( markerIndex === -1 ) {
								markerIndex = state.slideCount - 3;
							}

							$markerItem.removeClass('active-marker');
							$markerItem.eq(markerIndex).addClass('active-marker');
						}

						$slideElement.animate({'left': -state.nextIndex * state.width }, settings.duration, function(){						
							state.currentSlide = state.nextSlide;
							state.currentIndex = state.nextIndex;

							if( $slideItem.eq(state.currentIndex).attr('data-clone') === 'last' ) {
								$slideElement.css({'left' : -state.width});
								state.currentSlide = 2;
								state.currentIndex = 1;
							}
							else if( $slideItem.eq(state.currentIndex).attr('data-clone') === 'first' ) {
								$slideElement.css({'left' : -state.width * (state.slideCount - 2)});
								state.currentSlide = state.slideCount - 1;
								state.currentIndex = state.slideCount - 2;
							}

							state.isAnimated = false;
						});
					}
				}
			};

			init();
		};
	})(jQuery);
});