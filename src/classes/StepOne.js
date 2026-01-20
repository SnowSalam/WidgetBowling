import datepicker from 'js-datepicker';
import { dateReplacer, qtyMinus, qtyPlus, normalizeQty, compareTimes } from "./utilities";
import State from "./State";
import I18n from "./I18n";

export default class StepOne { // получить api
    constructor(stepOneWrap, options, api) {
        console.log('stepOne constructor')

        this.container = stepOneWrap;

        this.api = api;
        this.options = options;

        let maxDate = null;
        let timezone = (new Date().getUTCHours() + 3);
        if (timezone >= 24) timezone -= 24;
        if (timezone >= 14) {
            maxDate = new Date(new Date().setDate(new Date().getDate() + 30));
        } else {
            maxDate = new Date(new Date().setDate(new Date().getDate() + 29));
        }

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
            overlayButton: I18n.t('ru-RU', 'datepickerOverlayButton'),
            overlayPlaceholder: I18n.t('ru-RU', 'datepickeroverlayPlaceholder'),
            minDate: new Date(),
            startDay: 1,
            //startDate: new Date(options.minDate.yyyy, options.minDate.mm, options.minDate.dd),
            maxDate: maxDate,
            customMonths: I18n.t('ru-RU', 'monthsArr'),
            customDays: I18n.t('ru-RU', 'daysArr'),
            disableYearOverlay: true,
            onSelect: (instance, date) => {
                if (instance.dateSelected != undefined) {
                    // this.#updateTimeSlots(date/instance.dateSelected, State.guestsCount);
                    console.log('dateSelected = ' + instance.dateSelected); // узнать, в каком виде приходит дата и возможно replace
                    console.log('date = ' + date);

                    console.log('datepicker instance = ');
                    console.log(instance);
                    // input.innerText = instance.dateSelected или date, возможно обработанные Replacer

                    // State.dateSelected = /* instance.dateSelected или date - узнать из консоли */
                    State.startTimeSelected = null;
                    State.reserveDuration = 0;
                } else {
                    if (this.container.querySelector('.remarked-primary-widget__times--active')) {
                        let activeTimes = this.container.querySelectorAll('.remarked-primary-widget__times--active');

                        activeTimes.forEach(time => time.classList.remove('remarked-primary-widget__times--active'));
                    }
                }
                options.changeDateCalendar(this.container, date, options);
            },
            disabler: this.options.customDisabledDate ?
                    this.options.customDisabledDate : date => this.options.disableWeekDay.includes(date.getDay()),
            // disabledDates: что-то с getFreeDays. сделать getFreeDays static, поставить в функцию prepareDisabledDates
        };
    }

    renderStepOne() {
        console.log('renderstepone')
        this.renderTitle(this.container);

        const inputsBlock = this.#createBlock('inputs');
        this.container.append(inputsBlock);

        this.renderDateInput(inputsBlock);
        this.renderNumberOfGuestsInput(inputsBlock);
        this.renderNumberOfLanesInput(inputsBlock);

        const timesBlock = this.#createBlock('times');
        this.container.append(timesBlock);

        this.renderTimeSelection(timesBlock);
        this.renderTimeSlots(timesBlock);

        const checkboxesBlock = this.#createBlock('checkboxes');
        this.container.append(checkboxesBlock);

        this.renderWishCheckboxes(checkboxesBlock);

        const footerBlock = this.#createBlock('footer');
        this.container.append(footerBlock);

        this.renderComment(footerBlock);
        this.renderPayTypeSelection(footerBlock);
        this.renderOrderSum(footerBlock);
        this.renderButtonNext(footerBlock);

        this.initStepOneEventListeners();
    }

    initStepOneEventListeners() {
        this.initGuestsQtyHandler();
        this.initLanesQtyHandler();
        this.initBampersCheckboxHandler();
        this.initBampersQtyHandler();
        this.initTimeSlotsHandler();
        this.initPayTypeSelectionHandler();
    }

    #createBlock(blockName) {
        const block = document.createElement('div');
        block.classList.add('remarked-primary-widget__block');
        block.classList.add(`remarked-primary-widget__${blockName}-block`);

        return block;
    }

    renderTitle(container) {
        console.log('renderTitle')
        const title = `
            <div class="remarked-primary-widget__main-title">
                <h1>${I18n.t('ru-RU', 'headTitle')}</h1>
                <p class="remarked-primary-widget__after-title-text">${I18n.t('ru-RU', 'headText')}</p>
            </div>
        `;

        container.insertAdjacentHTML('afterbegin', title);
    }

    renderDateInput(container) {
        console.log('renderDateInput')
        let dateInput = `
            <div class="remarked-primary-widget__date-input-wrap" id="remarked-primary-widget__date-input-wrap">
                <label for="remarked-primary-widget__date-input-wrap">${I18n.t('ru-RU', 'labelDate')}</label>
                <input
                    type="text" readonly
                    name="remarked-primary-widget-date"
                    class="remarked-primary-widget__date-select"
                >
            </div>
            `;

        container.insertAdjacentHTML('beforeend', dateInput);

        console.log(I18n.t('ru-RU', 'monthsArr'))
        console.log(I18n.t('ru-RU', 'daysArr'))
        datepicker(container.querySelector('.remarked-primary-widget__date-select'), this.datepickerOptions);
    }

    renderNumberOfGuestsInput(container) {
        console.log('renderNumberOfGuestsInput')
        const qty = `
            <div class="remarked-primary-widget__qty-wrap">
                <label for="remarked-primary-widget__guests-qty">${I18n.t('ru-RU', 'labelCountGuest')}</label>
                <div class="remarked-primary-widget__guests-qty-container"></div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', qty);

        let guestQtyContainer = container.querySelector('.remarked-primary-widget__guests-qty-container');
        if (!this.options.guestCountSelect) {
            guestQtyContainer.innerHTML = ` <button class="remarked-primary-widget__qtyminus" id="remarked-primary-widget__guests-qtyminus" aria-hidden="true">&minus;</button>
            
            <input type="number" ${this.options.guestCountCanType /* подумать, как назвать */ ? '' : 'readonly'}
                    id="remarked-primary-widget__guests-qty"
                    class="remarked-primary-widget__qty remarked-primary-widget__qty-unselected"
                    min="${this.options.qtyMin}" max="${this.options.qtyMax}" step="1" value="0"
            >

            <button class="remarked-primary-widget__qtyplus" id="remarked-primary-widget__guests-qtyplus" aria-hidden="true">&plus;</button>`;
        } else {
            let qtySelect = document.createElement('select');
            qtySelect.name = 'remarked-primary-widget__guests-qty';
            qtySelect.id = 'remarked-primary-widget__guests-qty';
            qtySelect.classList.add('remarked-primary-widget__qty-unselected');
            guestQtyContainer.append(qtySelect);

            for (let i = this.options.qtyMin; i <= this.options.qtyMax; i++) {
                let option = document.createElement('option');
                option.classList.add('remarked-primary-widget__guests-qty-option');
                option.value = i;
                option.textContent = i;
                qtySelect.append(option);
            }
        }
    }

    renderNumberOfLanesInput(container) {
        console.log('renderNumberOfLanesInput')
        let lanesInput = `
            <div class="remarked-primary-widget__qty-wrap">
                <label for="remarked-primary-widget__lanes-qty">${I18n.t('ru-RU', 'labelCountLanes')}</label>
                <div class="remarked-primary-widget__lanes-qty-container">

                    <button class="remarked-primary-widget__qtyminus" id="remarked-primary-widget__lanes-qtyminus" aria-hidden="true">&minus;</button>

                    <input type="number" ${this.options.lanesCountCanType ? '' : 'readonly'}
                        id="remarked-primary-widget__lanes-qty"
                        class="remarked-primary-widget__qty remarked-primary-widget__qty-unselected"
                        min="1" max="1" step="1" value="0"
                    >

                    <button class="remarked-primary-widget__qtyplus" id="remarked-primary-widget__lanes-qtyplus" aria-hidden="true">&plus;</button>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', lanesInput);
    }

    renderTimeSelection(container) {
        console.log('renderTimeSelection')
        const timesContainer = `
            <div class="remarked-primary-widget__times">
                <label for="remarked-primary-widget__times-wrap">${I18n.t('ru-RU', 'labelTimeSelection')}</label>
                <input type="hidden" class="remarked-primary-widget__times-input" value="">
                <div class="remarked-primary-widget__times-wrap"></div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', timesContainer);
    }

    renderTimeSlots(container) {
        console.log('renderTimeSlots')
        const timesContainer = container.querySelector('.remarked-primary-widget__times-wrap');

        let minTime = 10;
        let maxTime = 2;

        let slotDuration = 60;

        for (let i = minTime; ; i = (i + 1) % 24) {
            let hourTextBegin = (i < 10 ? '0' + i : String(i)) + ':00';

            let hourTextEnd = ((i + 1) < 10 ? '0' + (i + 1) : String(i + 1)) + ':00';
            let timeTextRange = hourTextBegin + ' — ' + hourTextEnd;

            let div = document.createElement('div');
            div.classList.add('remarked-primary-widget__times-item');
            div.classList.add('remarked-primary-widget__times-item--disabled');
            div.setAttribute('data-time', hourTextBegin);
            div.setAttribute('data-range', timeTextRange);
            div.setAttribute('data-duration', slotDuration);
            div.textContent = hourTextBegin;

            timesContainer.append(div);

            if (i === maxTime) break;
        }
    }

    renderWishCheckboxes(container) {
        console.log('renderWishCheckboxes')
        const wishCheckboxes = `
            <div class="remarked-primary-widget__wish-checkboxes">

                <div class="remarked-primary-widget__wish-checkbox-wrap">
                    <input type="checkbox" id="remarked-primary-widget__wish-lanesNear-input">
                    <p class="remarked-primary-widget__wish-checkbox-text">${I18n.t('ru-RU', 'wishLanesNear')}</p>
                </div>

                <div class="remarked-primary-widget__wish-checkbox-wrap">
                    <input type="checkbox" id="remarked-primary-widget__wish-specialEvent-input">
                    <p class="remarked-primary-widget__wish-checkbox-text">${I18n.t('ru-RU', 'wishSpecialEvent')}</p>
                </div>

                <div class="remarked-primary-widget__wish-checkbox-wrap">
                    <input type="checkbox" id="remarked-primary-widget__wish-bampers-input">
                    <p class="remarked-primary-widget__wish-checkbox-text">${I18n.t('ru-RU', 'wishWithChildren')}</p>
                </div>

            </div>

            <div class="remarked-primary-widget__qty-wrap remarked-primary-widget__lanesWithBumper-qty-wrap" style="display: none;">
                <label for="remarked-primary-widget__lanesWithBumper-qty">${I18n.t('ru-RU', 'labelCountBampers')}</label>

                <div class="remarked-primary-widget__lanesWithBumper-qty-container">
                    <button class="remarked-primary-widget__qtyminus" id="remarked-primary-widget__lanesWithBumper-qtyminus" aria-hidden="true">&minus;</button>

                    <input type="number" ${this.options.lanesWithBumperCanType ? '' : 'readonly'}
                        id="remarked-primary-widget__lanesWithBumper-qty"
                        min="1" max="1" step="1" value="1"
                    >

                    <button class="remarked-primary-widget__qtyplus" id="remarked-primary-widget__lanesWithBumper-qtyplus" aria-hidden="true">&plus;</button>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', wishCheckboxes);
    }

    renderComment(container) { // посмотреть, как собирается comment_session_, доделать; сделать __not-required;
        console.log('renderComment')
        const commentContainer = `
            <div class="remarked-primary-widget__comment">
                <label for="comment_session_" class="__not-required">${I18n.t('ru-RU', 'labelComment')}</label>
                <textarea id="comment_session_" maxlength="500" name="remarked-primary-widget__textarea" placeholder="${I18n.t('ru-RU', 'placeholderComment')}"></textarea>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', commentContainer);
    }

    renderPayTypeSelection(container) {
        console.log('renderPayTypeSelection')
        const payTypeSelection = `
            <div class="remarked-primary-widget__pay-type-wrap">
                <label for="remarked-primary-widget__pay-type-wrap">${I18n.t('ru-RU', 'labelPayType')}</label>
                <label class="remarked-primary-widget__radio-label">
                    <input type="radio" class="remarked-primary-widget__radio-input" name="remarked-widget_payType" value="payOnline" id="payOnline">
                    ${I18n.t('ru-RU', 'payTypeOnline')}
                </label>
                <label class="remarked-primary-widget__radio-label">
                    <input type="radio" class="remarked-primary-widget__radio-input" name="remarked-widget_payType" value="payOffline" id="payOffline">
                    ${I18n.t('ru-RU', 'payTypeOffline')}
                </label>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', payTypeSelection);
    }

    renderOrderSum(container) {
        console.log('renderOrderSum')
        const orderSum = `
            <div class="remarked-primary-widget__order-sum">
                <p class="remarked-primary-widget__order-sum-text">
                    ${I18n.t('ru-RU', 'labelOrderSum')}
                    <span class="remarked-primary-widget__order-sum-num"></span>
                </p>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', orderSum);
    }

    renderButtonNext(container) {
        console.log('renderButtonNext')
        const nextButton = `<div class="remarked-primary-widget__next-step">${I18n.t('ru-RU', 'buttonNextStep')}</div>`;

        container.insertAdjacentHTML('beforeend', nextButton);
    }

    initGuestsQtyHandler() {
        console.log('renderBinitGuestsQtyHandleruttonNext')
        const guestQtyWrap = this.container.querySelector('.remarked-primary-widget__guests-qty-container');
        const guestsInput = this.container.querySelector('#remarked-primary-widget__guests-qty');
        const lanesInput = this.container.querySelector('#remarked-primary-widget__lanes-qty');

        if (!this.options.guestCountSelect) {
            const buttonMinus = this.container.querySelector('#remarked-primary-widget__guests-qtyminus');
            const buttonPlus = this.container.querySelector('#remarked-primary-widget__guests-qtyplus');

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

            if (normalized === 1) {
                lanesInput.min = 1;
                lanesInput.max = 1;
            } else if (normalized > 6) {
                const inputMin = Math.ceil(normalized / 6);
                lanesInput.min = inputMin;
                lanesInput.max = normalized;
            } else {
                lanesInput.min = 1;
                lanesInput.max = normalized;
            }

            State.guestsCount = normalized;

            this.#updateTimeSlots(State.dateSelected, normalized);
        });

        guestsInput.addEventListener('blur', () => {
            const value = Number(guestsInput.value);
            const normalized = normalizeQty(guestsInput, value, 'guests', true);

            if (normalized !== null && normalized !== value) {
                guestsInput.value = normalized;
            }

            State.guestsCount = normalized;

            this.#updateTimeSlots(State.dateSelected, normalized);
        });
    }

    initLanesQtyHandler() {
        console.log('initLanesQtyHandler')
        const lanesQtyWrap = this.container.querySelector('#remarked-primary-widget__lanes-qty-container');
        const lanesInput = this.container.querySelector('#remarked-primary-widget__lanes-qty');

        const bampersInput = this.container.querySelector('#remarked-primary-widget__lanesWithBumper-qty');

        const buttonMinus = this.container.querySelector('#remarked-primary-widget__lanes-qtyminus');
        const buttonPlus = this.container.querySelector('#remarked-primary-widget__lanes-qtyplus');

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

            State.lanesCount = normalized;

            //updateReservePrice
        });

        lanesInput.addEventListener('blur', () => {
            const value = Number(lanesInput.value);
            const normalized = normalizeQty(lanesInput, value, 'guests', true);

            if (normalized !== null && normalized !== value) {
                lanesInput.value = normalized;
                bampersInput.max = normalized;
                bampersInput.value = 1;
            }

            State.lanesCount = normalized;

            //updateReservePrice
        });
    }

    initBampersCheckboxHandler() {
        console.log('initBampersCheckboxHandler')
        const bampersCheckbox = this.container.querySelector('#remarked-primary-widget__wish-bampers-input');
        const bampersQtyWrap = this.container.querySelector('.remarked-primary-widget__lanesWithBumper-qty-wrap');

        bampersCheckbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                bampersQtyWrap.style.display = 'block';
                State.needBampers = true;
            } else {
                bampersQtyWrap.style.display = 'none';
                State.needBampers = false;
            }
        });
    }

    initBampersQtyHandler() {
        console.log('initBampersQtyHandler')
        const bampersQtyWrap = this.container.querySelector('.remarked-primary-widget__lanesWithBumper-qty-wrap');
        const bampersInput = this.container.querySelector('#remarked-primary-widget__lanesWithBumper-qty');

        const buttonMinus = this.container.querySelector('#remarked-primary-widget__lanesWithBumper-qtyminus');
        const buttonPlus = this.container.querySelector('#remarked-primary-widget__lanesWithBumper-qtyplus');

        buttonMinus.addEventListener('click', () => qtyMinus(bampersQtyWrap, 'lanes'));
        buttonPlus.addEventListener('click', () => qtyPlus(bampersQtyWrap, 'lanes'));

        bampersInput.addEventListener('input', () => {
            const value = Number(bampersInput.value);
            const normalized = normalizeQty(bampersInput, value, 'lanes', false);

            if (normalized !== null && normalized !== value) {
                bampersInput.value = normalized;
            }

            State.bampersCount = normalized;
        });

        bampersInput.addEventListener('blur', () => {
            const value = Number(bampersInput.value);
            const normalized = normalizeQty(bampersInput, value, 'guests', true);

            if (normalized !== null && normalized !== value) {
                bampersInput.value = normalized;
            }

            State.bampersCount = normalized;
        });
    }

    #updateTimeSlots(date, guestsCount) {
        const response = this.api.getTimeSlots({
                        date: date,
                        guests_count: guestsCount,
                    });
        const slots = response.slots;
        this.#updateTimeSlotsStatuses(slots);
    }

    #updateTimeSlotsStatuses(slots) {
        const timesContainer = this.container.querySelector('.remarked-primary-widget__times-wrap');
        const timeSlots = timesContainer.querySelectorAll('.remarked-primary-widget__times-item');

        timeSlots.forEach(timeSlot => {
            timeSlot.classList.remove('remarked-primary-widget__times-item--active');
            timeSlot.classList.add('remarked-primary-widget__times-item--disabled');
        })

        for (let slot of slots) {
            if (!slot.is_free) continue;

            const [date, time] = slot.start_datetime.split(' ');
            const shortTime = time.split(':').slice(0, 2).join(':');

            timesContainer.querySelector(`[data-time="${shortTime}"]`).classList.remove('remarked-primary-widget__times-item--disabled');
        }
    }

    initTimeSlotsHandler() {
        console.log('initTimeSlotsHandler')
        const timeSlots = this.container.querySelectorAll('.remarked-primary-widget__times-item');

        timeSlots.forEach((slot, index) => {
            slot.addEventListener('click', (e) => {
                if (e.target.classList.contains('times-item--disabled')) return;

                const prev = timeSlots[index - 1];
                const next = timeSlots[index + 1];

                const hasActiveNeighbor =
                    (prev && prev.classList.contains('times-item--active')) ||
                    (next && next.classList.contains('times-item--active'));

                if (hasActiveNeighbor) {
                    e.target.classList.add('times-item--active');
                    
                    if (State.startTimeSelected != null && compareTimes(State.startTimeSelected, e.target.dataset.time)) {
                        State.reserveDuration += State.standardSlotDoration;
                    } else {
                        State.startTimeSelected = e.target.dataset.time;
                        State.reserveDuration += State.standardSlotDoration;
                    }

                } else {
                    timeSlots.forEach(el =>
                        el.classList.remove('times-item--active')
                    );

                    slot.classList.add('times-item--active');

                    State.startTimeSelected = e.target.dataset.time;
                    State.reserveDuration = State.standardSlotDoration;
                }

                // updateReservePrice
            });
        });
    }

    initPayTypeSelectionHandler() {
        console.log('initPayTypeSelectionHandler')
        const payTypes = document.querySelectorAll('input[name="remarked-widget_payType"]');

        payTypes.forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.checked) {
                    State.payType = this.value;
                }
            });
        });
    }

    // подумать, нужно ли static. мысль пока - вызывать при отрисовке слотов времени
    // возможно: сделать static функцию для отрисовки слотов времени в этом классе, и вызывать из Api или оркестратора
    static updateReservePrice(date, time) {
    
    }

}