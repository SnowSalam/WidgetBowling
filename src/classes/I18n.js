export default class I18n {
    constructor(langs = {}) {
        if (langs && typeof langs === 'object' && Object.keys(langs).length > 0) {
            I18n.mergeLang(langs);
        }
    }

    static mergeLang(overrides = {}) {
        for (const locale in overrides) {
            if (!this.lang[locale]) continue;

            for (const key in overrides[locale]) {
                this.lang[locale][key] = overrides[locale][key];
            }
        }

        // другой вариант
        // for (const locale of Object.keys(overrides)) {
        //     if (!this.lang[locale]) continue;

        //     const source = overrides[locale];
        //     const target = this.lang[locale];

        //     for (const key of Object.keys(source)) {
        //         if (Object.prototype.hasOwnProperty.call(target, key)) {
        //             target[key] = source[key];
        //         }
        //     }
        // }
    }

    static t(locale, key) {
        return this.lang?.[locale]?.[key] ?? key;
    }
    // использование: I18n.t('ru-RU', 'text');

    static lang = {
        'ru-RU': { // стандартные строки
            headTitle:'Забронировать',
            headText: 'Какой ресторан вы хотели бы посетить?',
            labelName: 'На какое имя бронируем?',
            placeholderName: 'Введите имя',
            labelLastName: 'На какую фамилию бронируем?',
            placeholderLastName: 'Фамилия',
            labelPhone: 'Номер телефона',
            placeholderPhone: 'Телефон',
            labelEmail: 'Ваш е-mail',
            placeholderEmail: 'Введите e-mail',
            labelCountGuest: 'Количество персон',
            labelCountLanes: 'Количество дорожек',
            labelDate: 'Дата посещения',
            placeholderDate: 'Выберите дату',
            labelTime: 'Свободное время',
            labelTimeSelection: 'Выберите время',
            textTimeSelection: 'Выберите время',
            labelComment: 'Комментарий',
            placeholderComment: 'Текст вашего сообщения',
            textPolicy: 'Согласен(-сна) на обработку персональных данных и с',
            textLinkPolicy: 'пользовательским соглашением.',
            thanksTitle: 'Спасибо',
            thanksText: 'Ваша бронь успешна!<br> Ресторан свяжется с вами и подтвердит детали резерва.',
            textSubmit: 'Забронировать',
            tags: 'Теги',
            eventTags: 'Событие',
            labelBirthday: 'Дата рождения',
            placeholderBirthday: 'Укажите дату рождения',
            bookingNewOption: 'Выберите ресторан',
            extraPolicyCheckboxText: 'С правилами посещения',
            extraPolicyCheckboxLink: 'ознакомлен.',
            subcsriptionCheckboxText: 'Согласен(-сна) на получение рекламных рассылок, с',
            subcsriptionCheckboxLink: 'правилами ознакомлен(a).',
            labelchildren: 'Количество детей',
            labelAddSelect: 'Выберите зал',
            errorName: 'Не заполнено поле Имя',
            errorLastName: 'Не заполнено поле Фамилия',
            errorPhone: 'Не заполнено поле Телефон',
            errorBirthday:  'Не заполнено поле День рождения',
            errorEmail: 'Не заполнено поле Email',
            errorDate: 'Не заполнено поле Дата',

            monthsArr: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsCursiveArr: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
            daysArr: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

            wishLanesNear: 'Хотим дорожки рядом',
            wishSpecialEvent: 'День рождения/особое событие',
            wishWithChildren:'Есть дети до 12 лет (включить бамперы)',
            labelCountBampers: 'На скольких дорожках включить бамперы?',
            labelPayType: 'Выберите способ оплаты',
            payTypeOnline: 'Оплата онлайн на сайте',
            payTypeOffline: 'Оплата при посещении',
            labelOrderSum: 'Сумма заказа: ',
            buttonNextStep: 'далее',
            datepickerOverlayButton: 'Выбрать',
            datepickerOverlayPlaceholder: 'Введите нужный год',
            reserveInfoTitle: 'Ваша бронь:',
            reserveInfoDate: 'Дата',
            reserveInfoTime: 'Время',
            reserveInfoGuestsQty: 'Количество игроков',
            reserveInfoLanesQty: 'Количество дорожек',
            reserveInfoTotal: 'Итого',
            sumToPay: 'Сумма к оплате',
            minutes: 'минут',
            currencySymbol: '₽',
        },
        'en-EN': {
            headTitle: 'Booking',
            headText: 'Which restaurant would you like to visit?',
            labelName: 'What is the name for the booking?',
            placeholderName: 'Name',
            labelLastName: 'What is the surname for the booking?',
            placeholderLastName: 'Surname',
            labelPhone: 'Phone number',
            placeholderPhone: 'Phone',
            labelEmail: 'E-mail',
            placeholderEmail: 'e-mail',
            labelCountGuest: 'Number of guests',
            labelDate: 'Date of visit',
            placeholderDate: 'Pick a date',
            labelTime: 'Free time',
            noticeTime: 'Pick a time',
            labelComment: 'Comment',
            placeholderComment: 'The text of your message',
            textPolicy: 'I agree with the processing of personal data and with ',
            textLinkPolicy: 'the user agreement.',
            thanksTitle: 'Thanks',
            thanksText: 'We will contact you soon <br> to get the details of your visit',
            textSubmit: 'Book',
            tags: 'Tags',
            eventTags: 'Event',
            labelBirthday: 'Date of birth',
            placeholderBirthday: 'Date of birth',
            extraPolicyCheckboxText: 'I agree to show the documents confirming the age when ordering',
            extraPolicyCheckboxLink: 'alcoholic beverages.',
            subcsriptionCheckboxText: 'I agree to receive advertising mailings and',
            subcsriptionCheckboxLink: ' have read the rules.',
            labelchildren: 'Number of children',
            labelAddSelect: 'Select hall',
            errorName: 'The Name field is not filled in',
            errorLastName: 'The Last Name field is not filled in',
            errorPhone: 'The Phone field is not filled in',
            errorBirthday: 'The Birthday field is not filled in',
            errorEmail: 'Email field is not filled in',
            errorDate: 'The Date field is not filled in',

            monthsArr: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsCursiveArr: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        }
    };

}