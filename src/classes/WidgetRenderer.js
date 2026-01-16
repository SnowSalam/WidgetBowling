
import { datepicker } from 'js-datepicker';
import WidgetAPI from './WidgetAPI'
import StepOne from './StepOne';

export default class WidgetRenderer { // нужен ли session_id в данных брони?
    constructor(widgetWrap, options) {
        this.widgetWrap = widgetWrap;
        this.options = options;
        this.widget = widgetWrap.querySelector('.remarked-primary-widget');

        this.api = new WidgetAPI(this.options.bookingList[0].point, this.options.remarkedUrl, this.options.session_id);
    }

    renderWidget() {
        this.renderLoader(); // доделать

        const stepOneWrap = document.createElement('div');
        stepOneWrap.classList.add('remarked-primary-widget__step-one');

        this.widget.append(stepOneWrap);

        let stepOneRenderer = new StepOne(stepOneWrap);

        stepOneRenderer.renderStepOne(stepOneWrap, this.api);
        stepOneRenderer.updateCalendar(); // на текущую дату
    }

    /*возможно static*/ showLoader() {}
    hideLoader() {}
    
}