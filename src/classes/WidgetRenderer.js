
import { datepicker } from 'js-datepicker';
import StepOne from './StepOne';

export default class WidgetRenderer { // нужен ли session_id в данных брони?
    constructor(widgetWrap, options) {
        this.widgetWrap = widgetWrap;
        this.options = options;
        this.widget = widgetWrap.querySelector('.remarked-primary-widget');

        this.rooms = [ // {id зала, название, картинка, максимум гостей} - найти и вписать id залов
            { room_id: 1, name: 'Хронос', img_url: 'http:remarked.ru/widget/new/points/ загрузить', max_guests: 15 },
            { room_id: 2, name: 'Ностальгия', img_url: 'http:remarked.ru/widget/new/points/ загрузить', max_guests: 10 },
            { room_id: 3, name: 'Зодиак', img_url: 'http:remarked.ru/widget/new/points/ загрузить', max_guests: 12 },
            { room_id: 4, name: 'Сфера', img_url: 'http:remarked.ru/widget/new/points/ загрузить', max_guests: 10 },
            { room_id: 5, name: 'Лайка', img_url: 'http:remarked.ru/widget/new/points/ загрузить', max_guests: 12 },
            { room_id: 6, name: 'Персей', img_url: 'http:remarked.ru/widget/new/points/ загрузить', max_guests: 10 },
            { room_id: 7, name: 'Арес', img_url: 'http:remarked.ru/widget/new/points/ загрузить', max_guests: 8 },
        ];
    }

    renderWidget() {
        const stepOneWrap = document.createElement('div');
        stepOneWrap.classList.add('remarked-primary-widget__step-one');

        this.widget.append(stepOneWrap);

        let stepOneRenderer = new StepOne(stepOneWrap, rooms);

        stepOneRenderer.renderStepOne();
    }

    
}