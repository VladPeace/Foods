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

	//* Функция постинга данных
	const getResource = async (url) => {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};

	//* Конструктор карточек получаемых с data-base (db.json)
	getResource('http://localhost:3000/menu')
		.then((data => {
			data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}));

	// //* Второй вариант конструктора карточек (формирует верстку на лету) Подходит в случае если нам нужно только один раз что-то построить
	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));
	
	// function createCard(data) {
	// 	data.forEach(({ img, altimg, title, descr, price }) => {
	// 		const element = document.createElement('div');
	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `
	// 					<img src=${img} alt=${altimg} />
  //           <h3 class="menu__item-subtitle">${title}</h3>
  //           <div class="menu__item-descr">${descr}</div>
  //           <div class="menu__item-divider"></div>
  //           <div class="menu__item-price">
  //             <div class="menu__item-cost">Цена:</div>
  //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //           </div>
	// 		`;
	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }
};