export function timerDeadLine() {

	const deadLine = '2023-11-20';

	//* Функции
	// определяем разницу между дедлайном и нашим текущим временем
	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		if (t <= 0) {
			// Если акция закончилась то вместо отрицательных значений ставим 0 (Здесь можем выполнять любые другие действия, например сформировать новый блок что Акции нет или она закончилась.)
			days = 0; hours = 0; minutes = 0; seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			minutes = Math.floor((t / (1000 * 60)) % 60);
			seconds = Math.floor((t / 1000) % 60);
		}

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}
	// функция помощник которая добавляет 0 в начало к цифрам от 1 до 9
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	// устанавливаем наш таймер на страницу html
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds');
		// обновляем наш таймер каждую секунду
		const timeInterval = setInterval(updateClock, 1000);
		updateClock(); // функция инициализации которая один раз запуститься, установит текущую дату и исчезнет. (запускает таймер без задержки на странице)
		// помещаем наши величины на страницу
		function updateClock() {
			const t = getTimeRemaining(endtime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			// останавливаем интервал (таймер) при его окончании
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadLine);
}

