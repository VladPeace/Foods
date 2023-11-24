export function formsAJAX() {
	// <-----Отправка форм AJAX------->
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'Загрузка...',
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

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			statusMessage.textContent = message.loading;
			form.append(statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');

			request.setRequestHeader('Content-Type', 'application/json'); //* если мы используем связку XMLHttpRequest() FormData() то заголовок устанавливать НЕ НУЖНО
			const formData = new FormData(form);

			// отправка данных в формате JSON
			const object = {};
			formData.forEach(function (value, key) {
				object[key] = value;
			})

			const json = JSON.stringify(object)

			request.send(json);
			// request.send(formData);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.success;
					form.reset();
					setTimeout(() => {
						statusMessage.remove();
					}, 2000);
				} else {
					statusMessage.textContent = message.failure;
				}
			});
		});
	}
}