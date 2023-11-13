import { initializeTabs } from "./tabs/tabs.js";
import { timerDeadLine } from "./timer/timer.js";

document.addEventListener('DOMContentLoaded', () => {
	initializeTabs();
	timerDeadLine();
});