
import { datepicker } from 'js-datepicker';
import Api from './Api'
import StepOne from './StepOne';
import StepTwo from './StepTwo';

export default class WidgetRenderer { // нужен ли session_id в данных брони?
    constructor(widgetWrap, options) {
        this.widgetWrap = widgetWrap;
        this.options = options;
        this.widget = null;
        this.container = this.#renderWidgetContainer();
        this.renderCloseButton();

        this.api = new Api(this.options.booking[0].point, this.options.remarkedUrl, this.options.session_id);
    }

    renderWidget() {
        console.log('renderWidget')
        const stepOneWrap = document.createElement('div');
        stepOneWrap.classList.add('remarked-primary-widget__step-one');
        stepOneWrap.classList.add('remarked-primary-widget__active-step');
        const stepTwoWrap = document.createElement('div');
        stepTwoWrap.classList.add('remarked-primary-widget__step-two');

        this.container.append(stepOneWrap, stepTwoWrap);

        let stepOneRenderer = new StepOne(stepOneWrap, this.options, this.api);
        let stepTwoRenderer = new StepTwo(stepTwoWrap, this.options, this.api);

        stepOneRenderer.renderStepOne();
        // stepOneRenderer поставить текущую дату

        stepTwoRenderer.renderStepTwo();

        this.initButtonNextHandler();
        this.initButtonPrevHandler();
    }
    
    renderCloseButton() {
        let buttonClose = document.createElement('div');
        buttonClose.classList.add('remarked-primary-widget__close')
        buttonClose.innerHTML += '<svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="#f07048" fill-rule="evenodd"> <rect transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect> <rect transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect> </g> </svg>'
        this.widgetWrap.insertAdjacentElement('afterbegin', buttonClose);
    }

    #renderWidgetContainer() {
        this.widget = document.createElement('div');
        this.widget.classList.add('remarked-primary-widget');

        const container = document.createElement('div');
        container.classList.add('remarked-primary-widget__container');

        this.widget.append(container);

        this.widgetWrap.append(this.widget)

        return container;
    }

    static startPreloader() {
        const widget = document.querySelector('.remarked-primary-widget');
        if (!widget.querySelector('.remarked-widget-classic__preloader')) {
            let div = document.createElement('div');
            div.classList.add('remarked-widget-classic__preloader');
            div.innerHTML += '<div class="remarked-widget-classic__preloader-block"><span></span><span></span><span></span><span></span></div >'
            widget.append(div);
        }
    }

    static endPreloader() {
        try {
            const widget = document.querySelector('.remarked-primary-widget');
            const preloader = widget.querySelector('.remarked-widget-classic__preloader');
            if (preloader) {
                preloader.remove();
            }
        } catch (error) {
            console.log('Error removing preloader:', error);
        }
    }
    
    initButtonNextHandler() {
        const buttonNext = this.container.querySelector('.remarked-primary-widget__next-step');
        const stepOne = this.container.querySelector('.remarked-primary-widget__step-one');
        const stepTwo = this.container.querySelector('.remarked-primary-widget__step-two');

        const reserveInfo = stepTwo.querySelector('.remarked-primary-widget__reserve-info-wrap');
        const emailInputWrap = stepTwo.querySelector('#remarked-primary-widget__email-input-wrap');
        const agreementChecboxWrap = stepTwo.querySelector('#remarked-primary-widget__agreement-wrap');

        buttonNext.addEventListener('click', () => {
            


            stepOne.classList.remove('remarked-primary-widget__active-step');
            stepTwo.classList.add('remarked-primary-widget__active-step');
        });
    }

    initButtonPrevHandler() {
        const buttonPrev = this.container.querySelector('.remarked-primary-widget__prev svg');
        const stepOne = this.container.querySelector('.remarked-primary-widget__step-one');
        const stepTwo = this.container.querySelector('.remarked-primary-widget__step-two');

        buttonPrev.addEventListener('click', () => {
            stepTwo.classList.remove('remarked-primary-widget__active-step');
            stepOne.classList.add('remarked-primary-widget__active-step');
        });
    }

}