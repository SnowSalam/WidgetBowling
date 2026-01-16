import WidgetArea from './classes/WidgetArea';
import './style.css';

async function WidgetReMarked(options = {}) {
	// if (!options.weekShortNames) options.weekShortNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
	// if (!options.weekNames) options.weekNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	// if (!options.monthsNames) options.monthsNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	// if (!options.monthsCursiveNames) options.monthsCursiveNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

	const widgetArea = new WidgetArea(options);
	widgetArea.init();
}

export default WidgetReMarked;