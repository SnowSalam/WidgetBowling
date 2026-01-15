import phoneCodeSelect from "./PhoneCodeSelect";
import { dateReplacer } from "./utilities";

export default class StepTwo {
    constructor(widget /* который .remarked-primary-widget */, options, translate, stepTwoContainer) {
        this.widget = widget;
        this.container = stepTwoContainer;
        this.options = options;

        // подумать, куда засунуть этот массив - в translate?
        this.monthsArr = lang == 'ru-RU' ? ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'] : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    renderStepTwo() {
        this.renderBackButton();
        this.renderReserveInfo();
        this.renderGuestInfo();
        this.renderCheckboxes(this.options.multipleCheckboxes);

        this.initEventListeners();
    }

    renderBackButton() {
        let backButton = `
            <div class="remarked-primary-widget__prev" style="display: block;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', backButton);
    }

    renderReserveInfo() {
        const guestsQuantity = this.widget.querySelector('#remarked-primary-widget__qty').value;
        const lanesQuantity = this.widget.querySelector('#remarked-primary-widget__lanes-qty').value;

        const dateInput = this.widget.querySelector('.remarked-primary-widget__date-select');
        let date = dateReplacer(dateInput.value);
        let [yyyy, mm, dd] = date.split('-');

        let dateOutput = toString(dd) + this.monthsArr[parseInt(mm) - 1];

        const timeInput = this.widget.querySelector('.remarked-primary-widget__times-input');
        let [startTime, endTime] = timeInput.value.split('-');
        let reserveDurationHours = (parseInt(endTime) - parseInt(startTime));
        let reserveDuration = reserveDurationHours / 60;

        const commentInput = this.widget.querySelector('.remarked-primary-widget__comment textarea');
        let comment = commentInput.value;

        let reserveSum = 0; // написать расчёт цены

        let reserveInfo = `
            <div class="remarked-primary-widget__reserve-info-wrap">
                <h2 class="remarked-primary-widget__reserve-info-title">${translate.reserveInfoTitle/* Ваша бронь: */}</h2>

                <div class="remarked-primary-widget__reserve-info">
                    <div class="remarked-primary-widget__reserve-info-line">
                        <p class="remarked-primary-widget__reserve-info-section">${translate.date/* дата */}: <span class="remarked-primary-widget__reserve-info-value">${dateOutput}</span></p>
                        <p class="remarked-primary-widget__reserve-info-section">${translate.time/* время */}: <span class="remarked-primary-widget__reserve-info-value">${startTime}-${endTime} (${reserveDurationHours} ${translate.minutes/* минут */})</span></p>
                    </div>
                    <div class="remarked-primary-widget__reserve-info-line">
                        <p class="remarked-primary-widget__reserve-info-section">${translate.guestsQuantity/* количество игроков */}: <span class="remarked-primary-widget__reserve-info-value">${guestsQuantity}</span></p>
                        <p class="remarked-primary-widget__reserve-info-section">${translate.lanesQuantity/* количество дорожек */}: <span class="remarked-primary-widget__reserve-info-value">${lanesQuantity}</span></p>
                    </div>
                </div>

                <h3 class="remarked-primary-widget__reserve-sum">${translate.inTotal/* итого */}: ${reserveSum} ${translate.currency/* символ рублей */}</h3>
            </div
        `;

        this.container.insertAdjacentHTML('beforeend', reserveInfo);
    }

    renderGuestInfo() {
        let payTypeChecked = this.widget.querySelector('input[name="payType"]:checked').value;

        let questionnaire = `
            <div class="remarked-primary-widget__questionnaire">
                <div class="remarked-primary-widget__input-wrap">
                    <label for="remarked-primary-widget__name-input">${this.translate.nameInputLabel}</label>
                    <input class="remarked-primary-widget__name-input" id="remarked-primary-widget__name-input"${/* id вообще нужен? (true чтобы ide ошибку не светило) */true} type="text" placeholder="${this.translate.enterName}" minlength="2">
                </div>
                <div class="remarked-primary-widget__input-wrap">
                    <label for="remarked-primary-widget__phone-input">${this.translate.phoneInputLabel}</label>
                    <input class="remarked-primary-widget__phone-input" id="remarked-primary-widget__phone-input" type="tel" placeholder="${this.translate.enterPhone}">
                </div>
                ${payTypeChecked == 'payOnline' ? `
                    <div class="remarked-primary-widget__input-wrap">
                        <label for="remarked-primary-widget__email-input">${this.translate.emailInputLabel}</label>
                        <input class="remarked-primary-widget__email-input" id="remarked-primary-widget__email-input" type="email" placeholder="${this.translate.enterEmail}">
                    </div>`
                : ''}
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', questionnaire);

        const phoneCodeSelector = new phoneCodeSelect(this.container.querySelector('.remarked-primary-widget__phone-input'));
    }

    renderCheckboxes(multipleCheckboxes) {
        let payTypeChecked = this.widget.querySelector('input[name="payType"]:checked').value;

        let policyCheckboxesWrapper = `
            <div class="remarked-primary-widget__checkboxes-wrap">
                <div class="remarked-primary-widget__policy">
                    <div class="remarked-primary-widget__policy-checkbox">
                        <input type="checkbox">
                    </div>
                    <div class="remarked-primary-widget__policy-text">
                        ${translate.textPolicy} <a href="${options.linkPolicy}">${translate.textLinkPolicy}</a>
                    </div>
                </div>
                ${payTypeChecked == 'payOnline' ? `
                    <div class="remarked-primary-widget__policy">
                        <div class="remarked-primary-widget__policy-checkbox remarked-primary-widget__offer-agreement-checkbox">
                            <input type="checkbox">
                        </div>
                        <div class="remarked-primary-widget__policy-text">
                            ${translate.textOfferAgreement} <a href="${options.linkOfferAgreement}">${translate.textLinkOfferAgreement}</a>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', policyCheckboxesWrapper);

        const checkboxWrap = this.widget.querySelector('.remarked-primary-widget__checkboxes-wrap');

        if (multipleCheckboxes.length > 0) {
            multipleCheckboxes.forEach(checkbox => {
                let policyCheckbox = document.createElement('div');
                policyCheckbox.classList.add('remarked-primary-widget__policy');
                policyCheckbox.innerHTML = `
                    <div class="remarked-primary-widget__policy-checkbox">
                        <input type="checkbox" id="remarked-primary-widget__${checkbox.id}-input">
                    </div>
                    <div class="remarked-primary-widget__policy-text">
                        ${checkbox.text}
                    </div>
                `;
                checkboxWrap.insertAdjacentElement('beforeend', policyCheckbox);
            });
        }
    }

    renderTotalSum() {
        let totalSumWrap = `
            <div class="remarked-primary-widget__total-sum-wrap">
                <h2>${this.options.translate.sumToPay}: ${this.calculateTotalSum()}${`символ рублей`}</h2>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', totalSumWrap);
    }

    calculateTotalSum() {
        /* сложные расчёты */
    }

    renderSubmitButton() {
        let submitButton = `
            <div class="remarked-primary-widget__submit-wrap">
                <div class="remarked-primary-widget__submit-button">${this.translate.pay}</div>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', submitButton);
    }

    initEventListeners() {
        
    }
}