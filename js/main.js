import { initializeTabs } from "./tabs/tabs.js";
import { timerDeadLine } from "./timer/timer.js";
import { modalWindow } from "./modal/modal.js";
import { classMenu } from "./menu/classMenu.js";

document.addEventListener('DOMContentLoaded', () => {
	initializeTabs();
	timerDeadLine();
	modalWindow();
	classMenu();

	function calcOrDoable(number, basis = 2) {
		console.log(number * basis);
	}
	calcOrDoable(5)
});

