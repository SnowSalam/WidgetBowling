import phoneCodeSelect from "./PhoneCodeSelect";
import { dateReplacer } from "./utilities";
import I18n from "./I18n";
import State from "./State";

export default class StepTwo {
    constructor(stepTwoContainer, options, api) {
        console.log('stepTwo constructor')
        this.container = stepTwoContainer;
        this.options = options;
    }

    renderStepTwo() {
        console.log('rendersteptwo')
        this.renderBackButton();
        this.renderReserveInfo();
        this.renderGuestInfo();
        this.renderCheckboxes(this.options.multipleCheckboxes);
        this.renderTotalSum();
        this.renderSubmitButton();

        this.initEventListeners();
    }

    initEventListeners() {
        
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
        console.log('renderReserveInfo')
        // const guestsQuantity = this.widget.querySelector('#remarked-primary-widget__qty').value;
        // const lanesQuantity = this.widget.querySelector('#remarked-primary-widget__lanes-qty').value;

        // const dateInput = this.widget.querySelector('.remarked-primary-widget__date-select');
        // let date = dateReplacer(dateInput.value);
        // let [yyyy, mm, dd] = date.split('-');

        // let dateOutput = toString(dd) + this.monthsArr[parseInt(mm) - 1];

        // const timeInput = this.widget.querySelector('.remarked-primary-widget__times-input');
        // let [startTime, endTime] = timeInput.value.split('-');
        // let reserveDurationHours = (parseInt(endTime) - parseInt(startTime));
        // let reserveDuration = reserveDurationHours / 60;

        // const commentInput = this.widget.querySelector('.remarked-primary-widget__comment textarea');
        // let comment = commentInput.value;

        // let reserveSum = 0;

        let reserveInfo = `
            <div class="remarked-primary-widget__reserve-info-wrap">
                <h2 class="remarked-primary-widget__reserve-info-title">${I18n.t('ru-RU', 'reserveInfoTitle')}</h2>

                <div class="remarked-primary-widget__reserve-info">
                    <div class="remarked-primary-widget__reserve-info-line">
                        <p class="remarked-primary-widget__reserve-info-section">${I18n.t('ru-RU', 'reserveInfoDate')}: <span class="remarked-primary-widget__reserve-info-value" id="remarked-primary-widget__reserve-info-date"></span></p>
                        <p class="remarked-primary-widget__reserve-info-section">${I18n.t('ru-RU', 'reserveInfoTime')}: 
                            <span class="remarked-primary-widget__reserve-info-value">
                                <span id="remarked-primary-widget__reserve-info-starttime"></span>
                                -
                                <span id="remarked-primary-widget__reserve-info-endtime"></span> (<span id="remarked-primary-widget__reserve-info-duration"></span> ${I18n.t('ru-RU', 'minutes')})
                            </span>
                        </p>
                    </div>
                    <div class="remarked-primary-widget__reserve-info-line">
                        <p class="remarked-primary-widget__reserve-info-section">${I18n.t('ru-RU', 'reserveInfoGuestsQty')}: <span class="remarked-primary-widget__reserve-info-value" id="remarked-primary-widget__reserve-info-guests-count"></span></p>
                        <p class="remarked-primary-widget__reserve-info-section">${I18n.t('ru-RU', 'reserveInfoLanesQty')}: <span class="remarked-primary-widget__reserve-info-value" id="remarked-primary-widget__reserve-info-lanes-count"></span></p>
                    </div>
                </div>

                <h3 class="remarked-primary-widget__reserve-sum">${I18n.t('ru-RU', 'reserveInfoTotal')}: <span id="remarked-primary-widget__reserve-info-reserve-sum"></span> ${I18n.t('ru-RU', 'currencySymbol')}</h3>
            </div
        `;

        this.container.insertAdjacentHTML('beforeend', reserveInfo);
    }

    renderGuestInfo() {
        console.log('renderGuestInfo')
        let questionnaire = `
            <div class="remarked-primary-widget__questionnaire">
                <div class="remarked-primary-widget__input-wrap" id="remarked-primary-widget__name-input-wrap">
                    <label for="remarked-primary-widget__name-input">${I18n.t('ru-RU', 'labelName')}</label>
                    <input class="remarked-primary-widget__step-two-input" id="remarked-primary-widget__name-input" type="text" placeholder="${I18n.t('ru-RU', 'placeholderName')}" minlength="2">
                </div>
                <div class="remarked-primary-widget__input-wrap" id="remarked-primary-widget__phone-input-wrap">
                    <label for="remarked-primary-widget__phone-input">${I18n.t('ru-RU', 'labelPhone')}</label>
                    <input class="remarked-primary-widget__step-two-input" id="remarked-primary-widget__phone-input" type="tel">
                </div>
                <div class="remarked-primary-widget__input-wrap" id="remarked-primary-widget__email-input-wrap">
                    <label for="remarked-primary-widget__email-input">${I18n.t('ru-RU', 'labelEmail')}</label>
                    <input class="remarked-primary-widget__step-two-input" id="remarked-primary-widget__email-input" type="email" placeholder="${I18n.t('ru-RU', 'placeholderEmail')}">
                </div>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', questionnaire);

        // const phoneCodeSelector = new phoneCodeSelect(this.container.querySelector('.remarked-primary-widget__phone-input'));
    }

    renderCheckboxes(multipleCheckboxes) {
        console.log('renderCheckboxes')
        let policyCheckboxesWrapper = `
            <div class="remarked-primary-widget__checkboxes-wrap">
                <div class="remarked-primary-widget__policy">
                    <div class="remarked-primary-widget__policy-checkbox">
                        <input type="checkbox">
                    </div>
                    <div class="remarked-primary-widget__policy-text">
                        ${this.options.policy}</a>
                    </div>
                </div>
                <div class="remarked-primary-widget__policy" id="remarked-primary-widget__agreement-wrap">
                    <div class="remarked-primary-widget__policy-checkbox remarked-primary-widget__agreement-checkbox">
                        <input type="checkbox">
                    </div>
                    <div class="remarked-primary-widget__policy-text">
                        ${this.options.agreement}
                    </div>
                </div>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', policyCheckboxesWrapper);

        // const checkboxWrap = this.widget.querySelector('.remarked-primary-widget__checkboxes-wrap');

        // if (multipleCheckboxes.length > 0) {
        //     multipleCheckboxes.forEach(checkbox => {
        //         let policyCheckbox = document.createElement('div');
        //         policyCheckbox.classList.add('remarked-primary-widget__policy');
        //         policyCheckbox.innerHTML = `
        //             <div class="remarked-primary-widget__policy-checkbox">
        //                 <input type="checkbox" id="remarked-primary-widget__${checkbox.id}-input">
        //             </div>
        //             <div class="remarked-primary-widget__policy-text">
        //                 ${checkbox.text}
        //             </div>
        //         `;
        //         checkboxWrap.insertAdjacentElement('beforeend', policyCheckbox);
        //     });
        // }
    }

    renderTotalSum() {
        console.log('renderTotalSum')
        let totalSumWrap = `
            <div class="remarked-primary-widget__total-sum-wrap">
                <h2>${I18n.t('ru-RU', 'sumToPay')}: <span id="remarked-primary-widget__total-sum"></span>${I18n.t('ru-RU', 'currencySymbol')}</h2>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', totalSumWrap);
    }

    renderSubmitButton() {
        console.log('renderSubmitButton')
        let submitButton = `
            <div class="remarked-primary-widget__submit-wrap">
                <div class="remarked-primary-widget__submit-button"></div>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', submitButton);
    }

    finishFieldsAndBlocks() {
        this.fillReserveData();
        // this.toggleEmailBlock();
        // this.toggleAgreementCheckbox();
        // this.toggleSubmitButtonText();
    }

    fillReserveData() {
        const dateField = this.container.querySelector('#remarked-primary-widget__reserve-info-date');
        const startTimeField = this.container.querySelector('#remarked-primary-widget__reserve-info-starttime');
        const endTimeField = this.container.querySelector('#remarked-primary-widget__reserve-info-endtime');
        const durationField = this.container.querySelector('#remarked-primary-widget__reserve-info-duration');
        const guestsCountField = this.container.querySelector('#remarked-primary-widget__reserve-info-guests-count');
        const lanesCountField = this.container.querySelector('#remarked-primary-widget__reserve-info-lanes-count');

        if (State.dateSelected) {
            let selectedDay = String(State.dateSelected.getDate());
            let selectedMonth = I18n.t('ru-RU', 'monthsCursiveArr')[State.dateSelected.getMonth()];
            
            dateField.innerText = selectedDay + ' ' + selectedMonth;
        }
    }

}