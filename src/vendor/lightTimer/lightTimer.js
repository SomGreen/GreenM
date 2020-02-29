(function($) {

	function appendStructure(obj){
		$(obj).append(
			'<div class="lightTimerBlock">'+
			'<span class="lightTimerDaysSpan lightTimerСaptionSpan">Days</span>'+
			'<span class="lightTimerDays lightTimerNumberSpan"></span>'+
			'</div>'+
			'<div class="lightTimerBlock">'+
			'<span class="lightTimerHoursSpan lightTimerСaptionSpan">Hours</span>'+
			'<span class="lightTimerHours lightTimerNumberSpan"></span>'+
			'</div>'+
			'<div class="lightTimerBlock">'+
			'<span class="lightTimerMinutesSpan lightTimerСaptionSpan">Minutes</span>'+
			'<span class="lightTimerMinutes lightTimerNumberSpan"></span>'+
			'</div>'+
			'<div class="lightTimerBlock">'+
			'<span class="lightTimerSecondsSpan lightTimerСaptionSpan">Seconds</span>'+
			'<span class="lightTimerSeconds lightTimerNumberSpan"></span>'+
			'</div>'
			);
	}
	function getTimeRemaining(deadline) {
		var t = Date.parse(deadline) - Date.parse(new Date());
		var seconds = Math.floor((t / 1000) % 60);
		var minutes = Math.floor((t / 1000 / 60) % 60);
		var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		var days = Math.floor(t / (1000 * 60 * 60 * 24));
		// console.log(days, hours, minutes, seconds);
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}
	function initializeClock(obj, objName, language, deadline) {
		appendStructure(obj);

		var clock = $(objName);
		var days = $('.lightTimerDays');
		var hours = $('.lightTimerHours');
		var minutes = $('.lightTimerMinutes');
		var seconds = $('.lightTimerSeconds');

		function updateClock() {
			var t = getTimeRemaining(deadline);
			var slice = []
			$.each(t, function(i,e){
				// console.log(i,e);
				if(e>999){
					slice.push(4)
				}
				else if(e>99){
					slice.push(3)
				}
				else{
					slice.push(2)
				}
			});
			// console.log(slice);

			days.html(('0' + t.days).slice(-slice[1]));
			hours.html(('0' + t.hours).slice(-slice[2]));
			minutes.html(('0' + t.minutes).slice(-slice[3]));
			seconds.html(('0' + t.seconds).slice(-slice[4]));
			
			var captionSpan = [];

			switch(language){
				case('ru'):
				captionSpan = [
				['Дней','День','Дня'],
				['Часов','Час','Часа'],
				['Минут','Минута','Минуты'],
				['Секунд','Секунда','Секунды'],
				]
				break;
				case('ua'):
				captionSpan = [
				['Днів','День','Дні'],
				['Годин','Година','Години'],
				['Хвилин','Хвилина','Хвилини'],
				['Секунд','Секунда','Секунди'],
				]
				break;
			}

			$('.lightTimerСaptionSpan').each(function(i, e) {
				var strSpan = String($(e).siblings('span').html());
				var lastStrSpan =  Number(strSpan[strSpan.length-1]); 

				$(e).html(captionSpan[i][0]);

				// if(lastStrSpan == 0)
				// {
				// 	$(e).html(captionSpan[i][0]);
				// }
				// else if(lastStrSpan == 1)
				// {
				// 	$(e).html(captionSpan[i][1]);
				// }
				// else if(lastStrSpan > 1 && lastStrSpan <= 4)
				// {
				// 	$(e).html(captionSpan[i][2]);
				// }
				// else if(lastStrSpan >= 5 && lastStrSpan <= 9 )
				// {
				// 	$(e).html(captionSpan[i][0]);
				// }
			});

			if (t.total <= 0) {
				clearInterval(timeinterval);
				$('.lightTimerDays').html('0');
				$('.lightTimerHours').html('0');
				$('.lightTimerMinutes').html('0');
				$('.lightTimerSeconds').html('0');
			}
		}

		updateClock();

		var timeinterval = setInterval(updateClock, 1000);
	}

	jQuery.fn.lightTimer = function(options) {

		settings = $.extend({
			language: '',
			deadline: ''
		}, options);

		this.each(function() {
			if(options){
				$.extend(settings, options)
			}
		});

		var objName = $(this)[0].className; 
		var deadline = settings.deadline;
		var language = settings.language;

		return this.each(function() {
			initializeClock(this, objName, language, deadline);
		});

	};
}) (jQuery);
