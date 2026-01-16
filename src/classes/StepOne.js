import { datepicker } from "js-datepicker";
import { transform } from "terser-webpack-plugin/types/minify";
import { dateReplacer, qtyMinus, qtyPlus, normalizeQty } from "./utilities";

export default class StepOne { // получить api
    constuctor(stepOneWrap, api) {
        this.stepWrap = stepOneWrap;
        this.api = api;

        this.datepickerOptions = {
            formatter: (input, date, instance) => {
                let value = date;
                let d = value.getDate();
                let m = value.getMonth();
                m++;
                let yyyy = value.getFullYear();
                if (d < 10) {
                    d = '0' + d;
                }
                if (m < 10) {
                    m = '0' + m;
                }
                input.value = d + '-' + m + '-' + yyyy; // => '01-01-2099'
            },
            overlayButton: overlayButtonText,
            overlayPlaceholder: overlayPlaceholderText,
            minDate: new Date(options.minDate.yyyy, options.minDate.mm, options.minDate.dd),
            startDay: 1,
            //startDate: new Date(options.minDate.yyyy, options.minDate.mm, options.minDate.dd),
            maxDate: new Date(options.minDate.maxDate),
            customMonths: daysMonths,
            customDays: daysLang,
            disableYearOverlay: true,
            onSelect: (instance, input, date) => {
                options.changeDateCalendarBefore(this.stepWrap, input.value, options, dateReplacer);
                if (instance.dateSelected != undefined) {
                    getTimes(); // доделать
                } else {
                    if (this.stepWrap.querySelector('.remarked-primary-widget__times--active')) {
                        let activeTimes = this.stepWrap.querySelectorAll('.remarked-primary-widget__times--active');

                        activeTimes.forEach(time => time.classList.remove('remarked-primary-widget__times--active'));
                    }
                }
                options.changeDateCalendar(this.stepWrap, date, options);
            },
            disabler: options.customDisabledDate ? options.customDisabledDate : date => options.disableWeekDay.includes(date.getDay()),
            // disabledDates: что-то с getFreeDays. сделать getFreeDays static, поставить в функцию prepareDisabledDates
        };
    }

    updateCalendar() {}

    renderStepOne() {

        this.renderTitle();
        this.renderDateInput();
        this.renderNumberOfGuestsInput();
        this.renderNumberOfLanesInput();
        this.renderTimeSelection();
        this.renderComment();
        this.renderPayTypeSelection();
        this.renderOrderSum();
        this.renderButtonNext();

    }

    initStepOneEventListeners() {
        this.initDateChangeHandler();
        this.initGuestsQtyHandler();
        this.initLanesQtyHandler();
        this.initBampersCheckboxHandler();
        this.initBampersQtyHandler();
    }

    renderTitle() {
        const title = `
            <div class="remarked-primary-widget__main-title">
                <h1>${translate.widgetTitle}</h1>
                <p class="remarked-primary-widget__after-title-text">${translate.afterTitleText}</p>
            </div>
        `;

        this.stepWrap.insertAdjacentHTML('beforeend', title);
    }

    renderDateInput() {
        let dateInput = `<input id="date_${options.session_id}" type="text" placeholder="${translate.placeholderDate}" readonly name="remarked-primary-widget-date" class="remarked-primary-widget__date-select">`;

        this.stepWrap.insertAdjacentHTML('beforeend', dateInput);

        let datepicker = new datepicker(this.stepWrap.querySelector('.remarked-primary-widget__date-select'), this.datepickerOptions);
    }

    renderNumberOfGuestsInput() {
        const qty = `
            <div class="remarked-primary-widget__qty" id="remarked-primary-widget__guests-qty">
                <label for="remarked-primary-widget__guests-qty">${translate.labelCountGuest}</label>
                <div class="remarked-primary-widget__qty-wrap" id="remarked-primary-widget__guests-qty-wrap"></div>
            </div>
        `;

        this.stepWrap.insertAdjacentHTML('beforeend', qty);

        let guestQtyWrap = this.stepWrap.querySelector('.remarked-primary-widget__qty-wrap');
        if (!options.guestCountSelect) {
            guestQtyWrap.innerHTML = ` <button class="remarked-primary-widget__qtyminus" id="remarked-primary-widget__guests-qtyminus" aria-hidden="true">&minus;</button>
            
            <input type="number" ${this.options.guestCountCanType /* подумать, как назвать */ ? '' : 'readonly'}
                    name="remarked-primary-widget__qty"
                    id="remarked-primary-widget__guests-qty"
                    class="remarked-primary-widget__qty-unselected"
                    min="${options.qtyMin}" max="${options.qtyMax}" step="1" value="${options.qtyMin}"
            >

            <button class="remarked-primary-widget__qtyplus" id="remarked-primary-widget__guests-qtyplus" aria-hidden="true">&plus;</button>`;
        } else {
            let qtySelect = document.createElement('select');
            qtySelect.name = 'remarked-primary-widget__guests-qty';
            qtySelect.id = 'remarked-primary-widget__guests-qty';
            qtySelect.classList.add('remarked-primary-widget__qty-unselected');
            guestQtyWrap.append(qtySelect);

            for (let i = options.qtyMin; i <= options.qtyMax; i++) {
                let option = document.createElement('option');
                option.classList.add('remarked-primary-widget__guests-qty-option');
                option.value = i;
                option.textContent = i;
                qtySelect.append(option);
            }
        }
    }

    renderNumberOfLanesInput() {
        let lanesInput = `
            <div class="remarked-primary-widget__qty" id="remarked-primary-widget__lanes-qty">
                <label for="remarked-primary-widget__lanes-qty">${translate.labelCountGuest}</label>
                <div class="remarked-primary-widget__qty-wrap" id="remarked-primary-widget__lanes-qty-wrap">

                    <button class="remarked-primary-widget__qtyminus" id="remarked-primary-widget__lanes-qtyminus" aria-hidden="true">&minus;</button>

                    <input type="number" ${this.options.lanesCountCanType /* подумать, как назвать */ ? '' : 'readonly'}
                        name="remarked-primary-widget__lanes-qty"
                        id="remarked-primary-widget__lanes-qty"
                        class="remarked-primary-widget__qty-unselected"
                        min="1" max="1" step="1" value="1"
                    >

                    <button class="remarked-primary-widget__qtyplus" id="remarked-primary-widget__lanes-qtyplus" aria-hidden="true">&plus;</button>
                </div>
            </div>
        `;

        this.stepWrap.insertAdjacentHTML('beforeend', lanesInput);
    }

    renderTimeSelection() { // доделать тексты labelTimesSelect и TimesSelectText
        const timesContainer = `
            <div class="remarked-primary-widget__times">
                <label for="remarked-primary-widget__times-wrap">${this.options.labelTimesSelect}</label>
                <p class="remarked-primary-widget__times-wrap-text">${this.options.timesSelectText}</p>
                <input type="hidden" class="remarked-primary-widget__times-input" value="">
                <div class="remarked-primary-widget__times-wrap"></div>
            </div>
        `;

        this.stepWrap.insertAdjacentHTML('beforeend', timesContainer);
    }

    renderTimeSlots() {
        const timesContainer = this.stepWrap.querySelector('.remarked-primary-widget__times-wrap');

        let minTime = 10;
        let maxTime = 2;

        let slotDuration = 60;

        for (let i = minTime; ; i = (i + 1) % 24) {
            let hourTextBegin = i < 10 ? '0' + i : String(i);

            let hourTextEnd = (i + 1) < 10 ? '0' + (i + 1) : String(i + 1);
            let timeTextRange = hourTextBegin + ' — ' + hourTextEnd;

            let div = document.createElement('div');
            div.classList.add('remarked-primary-widget__times-item');
            div.setAttribute('data-temp', hourTextBegin);
            div.setAttribute('data-open', timeTextRange);
            div.setAttribute('data-duration', slotDuration);
            div.textContent = hourTextBegin;

            timesContainer.append(div);

            if (i === maxTime) break;
        }
    }

    renderWishCheckboxes() {
        const wishCheckboxes = `
            <div class="remarked-primary-widget__wish-checkboxes">

                <div class="remarked-primary-widget__wish-checkbox-wrap">
                    <input type="checkbox" id="remarked-primary-widget__wish-lanesNear-input">
                    <p class="remarked-primary-widget__wish-checkbox-text">${translate.wishTextLanesNear}</p>
                </div>

                <div class="remarked-primary-widget__wish-checkbox-wrap">
                    <input type="checkbox" id="remarked-primary-widget__wish-specialEvent-input">
                    <p class="remarked-primary-widget__wish-checkbox-text">${translate.wishTextSpecialEvent}</p>
                </div>

                <div class="remarked-primary-widget__wish-checkbox-wrap">
                    <input type="checkbox" id="remarked-primary-widget__wish-bampers-input">
                    <p class="remarked-primary-widget__wish-checkbox-text">${translate.wishTextWithChildren}</p>
                </div>

            </div>

            <div class="remarked-primary-widget__qty" id="remarked-primary-widget__lanesWithBumper-wrap" style="display: none;">

                <button class="remarked-primary-widget__qtyminus" id="remarked-primary-widget__lanesWithBumper-qtyminus" aria-hidden="true">&minus;</button>

                <input type="number" ${this.options.lanesWithBumperCountCanType /* подумать, как назвать */ ? '' : 'readonly'}
                    name="remarked-primary-widget__lanesWithBumper-qty"
                    id="remarked-primary-widget__lanesWithBumper-qty"
                    min="1" max="1" step="1" value="1"
                >

                <button class="remarked-primary-widget__qtyplus" id="remarked-primary-widget__lanesWithBumper-qtyplus" aria-hidden="true">&plus;</button>

            </div>
        `;

        this.stepWrap.insertAdjacentHTML('beforeend', wishCheckboxes);
    }

    renderComment() { // посмотреть, как собирается comment_session_, доделать; сделать __not-required;
        const commentContainer = `
            <div class="remarked-primary-widget__comment">
                <label for="comment_session_" class="__not-required">${translate.commentLabel}</label>
                <textarea id="comment_session_" maxlength="500" name="remarked-primary-widget__textarea" placeholder="${translate.commentPlaceholder}"></textarea>
            </div>
        `;

        this.stepWrap.insertAdjacentHTML('beforeend', commentContainer);
    }

    renderPayTypeSelection() {
        const payTypeSelection = `
            <div class="remarked-primary-widget__pay-type-wrap">
                <label for="remarked-primary-widget__pay-type-wrap">${translate.payTypeLabel}</label>
                <label class="remarked-primary-widget__radio-label">
                    <input type="radio" class="remarked-primary-widget__radio-input" name="payType" value="payOnline" id="payOnline">
                    ${translate.payTypeOnline}
                </label>
                <label class="remarked-primary-widget__radio-label">
                    <input type="radio" class="remarked-primary-widget__radio-input" name="payType" value="payOffline" id="payOffline">
                    ${translate.payTypeOffline}
                </label>
            </div>
        `;

        this.stepWrap.insertAdjacentHTML('beforeend', payTypeSelection);
    }

    renderOrderSum(){
        const orderSum = `
            <div class="remarked-primary-widget__order-sum">
                <p class="remarked-primary-widget__order-sum-text">
                    ${translate.textPolicy}
                    <span class="remarked-primary-widget__order-sum-num"></span>
                </p>
            </div>
        `;

        this.stepWrap.insertAdjacentHTML('beforeend', orderSum);
    }

    renderButtonNext() {
        const nextButton = `<div class="remarked-primary-widget__next-step">${translate.textNextStep/*далее*/}</div>`;

        this.stepWrap.insertAdjacentHTML('beforeend', nextButton);
    }

    // использовать в datepickerOptions -> onSelect
    // initDateChangeHandler() {
    //     this.stepWrap.querySelector('.remarked-primary-widget__date-select').addEventListener('change', () => {
    //         let guestCount = this.stepWrap.querySelector('#remarked-primary-widget__qty').value;
    //         let selectedDate = dateReplacer(this.stepWrap.querySelector('.remarked-primary-widget__date-select').value);

    //         this.api.getTimes(guestCount, selectedDate);
    //     }); // получить api
    // }

    initGuestsQtyHandler() {
        const guestQtyWrap = this.stepWrap.querySelector('#remarked-primary-widget__guests-qty-wrap');
        const guestsInput = this.stepWrap.querySelector('#remarked-primary-widget__guests-qty');
        const lanesInput = this.stepWrap.querySelector('#remarked-primary-widget__lanes-qty');

        if (!options.guestCountSelect) {
            const buttonMinus = this.stepWrap.querySelector('#remarked-primary-widget__guests-qtyminus');
            const buttonPlus = this.stepWrap.querySelector('#remarked-primary-widget__guests-qtyplus');

            buttonMinus.addEventListener('click', () => qtyMinus(guestQtyWrap, 'guests'));
            buttonPlus.addEventListener('click', () => qtyPlus(guestQtyWrap, 'guests'));
        }

        guestsInput.addEventListener('input', () => {
            const value = Number(guestsInput.value);
            const normalized = normalizeQty(guestsInput, value, 'guests', false);

            if (normalized === null) return;

            if (normalized !== value) {
                guestsInput.value = normalized;
            }

            if (value === 1) {
                lanesInput.min = 1;
                lanesInput.max = 1;
            } else if (value > 6) {
                const inputMin = Math.ceil(value / 6);
                lanesInput.min = inputMin;
                lanesInput.max = value;
            } else {
                lanesInput.min = 1;
                lanesInput.max = value;
            }

            // this.renderTimes(); - переполучить время и перерисовать
        });

        guestsInput.addEventListener('blur', () => {
            const value = Number(guestsInput.value);
            const normalized = normalizeQty(guestsInput, value, 'guests', true);

            if (normalized !== null && normalized !== value) {
                guestsInput.value = normalized;
            }

            // не забыть this.renderTimes();
        });
    }

    initLanesQtyHandler() {
        const lanesQtyWrap = this.stepWrap.querySelector('#remarked-primary-widget__lanes-qty-wrap');
        const lanesInput = this.stepWrap.querySelector('#remarked-primary-widget__lanes-qty');

        const bampersInput = this.stepWrap.querySelector('#remarked-primary-widget__lanesWithBumper-qty');

        const buttonMinus = this.stepWrap.querySelector('#remarked-primary-widget__lanes-qtyminus');
        const buttonPlus = this.stepWrap.querySelector('#remarked-primary-widget__lanes-qtyplus');

        buttonMinus.addEventListener('click', () => qtyMinus(lanesQtyWrap, 'lanes'));
        buttonPlus.addEventListener('click', () => qtyPlus(lanesQtyWrap, 'lanes'));

        lanesInput.addEventListener('input', () => {
            const value = Number(lanesInput.value);
            const normalized = normalizeQty(lanesInput, value, 'lanes', false);

            if (normalized !== null && normalized !== value) {
                lanesInput.value = normalized;
                bampersInput.max = normalized;
                bampersInput.value = 1;
            }

            let selectedTimes = this.stepWrap.querySelectorAll('.remarked-primary-widget__times-wrap .remarked-primary-widget__times-item--active');
            if (selectedTimes.length > 0) {

            }
        });

        lanesInput.addEventListener('blur', () => {
            const value = Number(lanesInput.value);
            const normalized = normalizeQty(lanesInput, value, 'guests', true);

            if (normalized !== null && normalized !== value) {
                lanesInput.value = normalized;
                bampersInput.max = normalized;
                bampersInput.value = 1;
            }
        });
    }

    initBampersCheckboxHandler() {
        const bampersCheckbox = this.stepWrap.querySelector('#remarked-primary-widget__wish-bampers-input');
        const bampersQtyWrap = this.stepWrap.querySelector('#remarked-primary-widget__lanesWithBumper-wrap');

        bampersCheckbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                bampersQtyWrap.style.display = 'block';
            } else {
                bampersQtyWrap.style.display = 'none';
            }
        });
    }

    initBampersQtyHandler() {
        const bampersQtyWrap = this.stepWrap.querySelector('#remarked-primary-widget__lanesWithBumper-wrap');
        const bampersInput = this.stepWrap.querySelector('#remarked-primary-widget__lanesWithBumper-qty');

        const buttonMinus = this.stepWrap.querySelector('#remarked-primary-widget__lanesWithBumper-qtyminus');
        const buttonPlus = this.stepWrap.querySelector('#remarked-primary-widget__lanesWithBumper-qtyplus');

        buttonMinus.addEventListener('click', () => qtyMinus(bampersQtyWrap, 'lanes'));
        buttonPlus.addEventListener('click', () => qtyPlus(bampersQtyWrap, 'lanes'));

        bampersInput.addEventListener('input', () => {
            const value = Number(bampersInput.value);
            const normalized = normalizeQty(bampersInput, value, 'lanes', false);

            if (normalized !== null && normalized !== value) {
                bampersInput.value = normalized;
            }
        });

        bampersInput.addEventListener('blur', () => {
            const value = Number(bampersInput.value);
            const normalized = normalizeQty(bampersInput, value, 'guests', true);

            if (normalized !== null && normalized !== value) {
                bampersInput.value = normalized;
            }
        });
    }

    // подумать, нужно ли static. мысль пока - вызывать при отрисовке слотов времени
    // возможно: сделать static функцию для отрисовки слотов времени в этом классе, и вызывать из Api или оркестратора
    static updateReservePrice(date, time) {
    
    }

}