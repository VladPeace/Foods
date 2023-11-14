import { initializeTabs } from "./tabs/tabs.js";
import { timerDeadLine } from "./timer/timer.js";
import { modalWindow } from "./modal/modal.js";

document.addEventListener('DOMContentLoaded', () => {
	initializeTabs();
	timerDeadLine();
	modalWindow();
});