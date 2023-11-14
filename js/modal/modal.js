export function modalWindow() {

	const modalTrigger = document.querySelectorAll('[data-modal]');
	const btnClose = document.querySelector('[data-close]');
	const modal = document.querySelector('.modal');

	//* Функции
	// Вызываем модальное окно при нажатии на кнопку 'Связаться с нами'
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
	}
	// Закрываем модальное окно
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}
	//* Использование и назначение
	// Назначаем обработчик событий на все кнопки 'Связаться с нами' на странице
	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', openModal);
	});
	// -------
	btnClose.addEventListener('click', closeModal);
	// Закрываем модальное окно кликом на подложку
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});
	// Закрываем модальное окно кнопкой Escape
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});
}