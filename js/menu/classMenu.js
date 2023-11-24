export function classMenu() {
	//<-----Шаблон карточек menu__item-------->
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 37;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = +this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			// Устанавливаем параметр по умолчанию
			if (this.classes.length === 0) {
				this.element = 'menu__item'; // Присваиваем строку 'menu__item' в свойство (которое в данном случае хранит значение (строку)) this.element
				element.classList.add(this.element); // Присваиваем к classList значение которое хранит element тем самым создаем новый class для элемента div
			} else {
				// className - условное название тех объектов которые мы передаем в массив ...classes
				this.classes.forEach((className) => element.classList.add(className)); // Присваиваем значения (каждый класс в массиве) className в класс элемента 'div'
			}
			element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          `;
			this.parent.append(element);
		}
	}

	//*Варианты вызова и применения Class
	// 1) полный вариант
	// const div = new MenuCard();
	// div.render(); 

	// 2) вариант использования на месте без ссылок на объект
	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		'Меню “Премиум”',
		'В меню “Премиум” мы используем <br> не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - <br> ресторанное меню без похода в ресторан!',
		14,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		21,
		'.menu .container',
		'menu__item'
	).render();
};