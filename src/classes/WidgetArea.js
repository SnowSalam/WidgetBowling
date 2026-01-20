import I18n from './I18n';
import WidgetRenderer from './WidgetRenderer';

export default class WidgetArea {
    constructor(params) {
        this.options = this.prepareOptions(params);
        this.widgetWrap = this.#createWidgetWrap();

        this.renderer = new WidgetRenderer(this.widgetWrap, this.options);
        this.i18n = new I18n(this.options.lang);
    }

    async init() {
        try {
            console.log('area init')
            this.renderer.renderWidget();
            this.initOpenOnButtonClick();
            this.initWidgetClose();
        } catch (e) {
            //this.renderer.showError(e.message);
            console.log('error:')
            console.log(e.message)
            throw(e);
        } finally {
            WidgetRenderer.endPreloader();
        }
    }

    initOpenOnButtonClick() {
        const widgetOpenButton = document.querySelectorAll(this.options.button);

        widgetOpenButton.forEach(button => button.addEventListener('click',() => {
                if (this.widgetWrap.classList.contains('remarked-primary-widget--none')) {
                    this.widgetWrap.classList.remove('remarked-primary-widget--none');
                }
                this.widgetWrap.classList.add('remarked-primary-widget--active');
                document.querySelector('html').style.overflowY = "hidden";
            })
        );
    }

    initWidgetClose() {
        const closeButton = this.widgetWrap.querySelector('.remarked-primary-widget__close');

        closeButton.addEventListener('click', this.#closeWidget());
        this.widgetWrap.addEventListener('click', (e) => {
            if (e.target.classList.contains('remarked-primary-widget--active')) {
                this.#closeWidget();
            }
        });
    }

    #closeWidget() {
        this.widgetWrap.classList.add('remarked-primary-widget--none');
        
        setTimeout(() => {
        this.widgetWrap.classList.remove('remarked-primary-widget--active');
        // remarkedPrimaryWidgetReset();
        }, 450);

        document.querySelector('html').style.overflowY = "auto";
    }

    #createWidgetWrap() {
        const wrap = document.createElement('div');

        wrap.classList.add('remarked-primary-widget__wrap');
        wrap.classList.add('remarked-primary-widget--none');
        wrap.dataset.id = 'openReMarkedWidget-modal';

        document.body.append(wrap);

        return wrap;
    }

    prepareOptions(rawOptions) {
        let options = { // добавить labelRoomSelect, добавить translate
            booking: rawOptions.booking,
            qtyMin: rawOptions.qtyMin ? rawOptions.qtyMin : 1,
            qtyMax: rawOptions.qtyMax ? rawOptions.qtyMax : 10,
            linkPolicy: rawOptions.linkPolicy ? rawOptions.linkPolicy : 'https://remarked.ru/widget/new/css/privancy.html',
            linkPolicyChecked: rawOptions.linkPolicyChecked ? rawOptions.linkPolicyChecked : false,
            linkPolicyEnforced: rawOptions.linkPolicyEnforced ? rawOptions.linkPolicyEnforced : false,
            button: rawOptions.button ? rawOptions.button : '.open__primary__widget',
            
            dateNextHour: rawOptions.dateNextHour || rawOptions.dateNextHour === 0 ? rawOptions.dateNextHour : 3600000,

            showDisabledTime: rawOptions.showDisabledTime ? rawOptions.showDisabledTime : false,
            
            commentRequired: rawOptions.commentRequired ? rawOptions.commentRequired : false,
            lastNameNotRequired: rawOptions.lastNameNotRequired ? rawOptions.lastNameNotRequired : false,
            guestCountSelect: rawOptions.guestCountSelect ? rawOptions.guestCountSelect : false,
            session_id: `session_${Date.now()}_${Math.random()}`,

            lang: rawOptions.lang,
            lanesCountCanType: rawOptions.lanesCountCanType ? rawOptions.lanesCountCanType : false,
            lanesWithBumperCanType: rawOptions.lanesWithBumperCanType ? rawOptions.lanesWithBumperCanType : false,
            disableWeekDay: rawOptions.disableWeekDay ? rawOptions.disableWeekDay : [],
            policy: 'Я даю <a href="#">Согласие</a> на обработку моих персональных данных в соответствии с <a href="#">Политикой</a>',
            agreement: 'Я принимаю условия <a href="#">Договора оферты</a>',
            guestCountCanType: rawOptions.guestCountCanType ? rawOptions.guestCountCanType : false, // назвать параметр по-другому
            lanesCountCanType: rawOptions.lanesCountCanType ? rawOptions.lanesCountCanType : false,
            lanesWithBumperCanType: rawOptions.lanesWithBumperCanType ? rawOptions.lanesWithBumperCanType : false,
        };

        return options; // проверить, нужна ли ещё обработка
    }
}