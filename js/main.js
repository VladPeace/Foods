import { initializeTabs } from "./tabs/tabs.js";
import { timerDeadLine } from "./timer/timer.js";
import { modalWindow } from "./modal/modal.js";
import { classMenu } from "./menu/classMenu.js";
import { slider } from "./slider/slider.js";

document.addEventListener('DOMContentLoaded', () => {
	initializeTabs();
	timerDeadLine();
	modalWindow();
	classMenu();
	slider();
});

