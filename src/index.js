import WidgetArea from './classes/WidgetArea';
import './style.css';

async function WidgetReMarked(options = {}) {
	const widgetArea = new WidgetArea(options);
	widgetArea.init();
}

export default WidgetReMarked;