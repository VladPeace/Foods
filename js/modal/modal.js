export function modalWindow() {
	//<-----Создаем модальное окно------->
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	// Назначаем обработчик событий на все кнопки 'Связаться с нами' на странице
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	//* Функции
	// Вызываем модальное окно при нажатии на кнопку 'Связаться с нами'
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden'; // - отключаем прокрутку страницы при открытии модалки
		clearInterval(modalTimerId); // - отключаем авто открытие модалки если пользователь сам открыл его
	}
	// Закрываем модальное окно
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = ''; // - возвращаем прокрутку страницы при закрытии модалки
	}
	// Вызываем модальное окно когда пользователь долистал до конца страницы 
	function showModalByScroll() {
		const rootElement = document.documentElement;
		if (window.scrollY + rootElement.clientHeight >= rootElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll); // - отключаем повторные вызовы при скролле в будущем
		}
	}
	//* Использование и назначение
	// Закрываем модальное окно кликом на подложку и на крестик
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == "") {
			closeModal();
		}
	});
	// Закрываем модальное окно кнопкой Escape
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	//----------------------
	const modalTimerId = setTimeout(openModal, 50000); // - вызываем модальное окно автоматически через 15с
	window.addEventListener('scroll', showModalByScroll); // - вызываем модалку при прокрутке в самый конец страницы

	//*! <---------------------------Отправка форм AJAX----------------------------->
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	//Подвязываем под все формы postData
	forms.forEach((item) => {
		postData(item);
	});

	//* Функция постинга данных
	function postData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
			form.insertAdjacentElement('afterend', statusMessage);

			// request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); //* Для отправка данных в формате JSON заголовок нужен
			const formData = new FormData(form);

			//* 2. Трансформация формдейт в JSON формат. отправка данных в формате JSON
			const object = {};
			formData.forEach(function (value, key) {
				object[key] = value;
			});

			//* 1. Классическая формдейт
			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8' //* 2. отправка JSON
				},
				// body: formData //* 1
				body: JSON.stringify(object) //* 2
			}).then(data => data.text())
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(error => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}

	// <-----Красивое оповещение пользователя------->
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));
};
