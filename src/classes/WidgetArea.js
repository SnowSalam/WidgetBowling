import WidgetRenderer from './WidgetRenderer';

export default class WidgetArea {
    constructor(params) {
        this.options = this.prepareOptions(params);

        this.renderer = new WidgetRenderer(this.options);
    }

    async init(pointId) {
        try {
            this.renderer.renderWidget();
            
        } catch (e) {
            this.renderer.showError(e.message);
        } finally {
            this.renderer.hideLoader();
        }
    }

    prepareOptions(rawOptions) {
        let options = { // добавить labelRoomSelect, добавить translate
            remarkedUrl: rawOptions.remarkedUrl ? rawOptions.remarkedUrl : 'https://app.remarked.ru/api/v1/ApiReservesWidget',
            minDate: rawOptions.minDate ? {
                    yyyy: rawOptions.minDate.split('-')[0],
                    dd: rawOptions.minDate.split('-')[2],
                    mm: rawOptions.minDate.split('-')[1] - 1,
                    full: rawOptions.minDate,
                    maxDate: rawOptions.maxDate ? new Date(rawOptions.maxDate).getTime() : getToday().maxDate,
                } : getToday(rawOptions.maxDate),
            booking: rawOptions.booking,
            qtyMin: rawOptions.qtyMin ? rawOptions.qtyMin : 1,
            qtyMax: rawOptions.qtyMax ? rawOptions.qtyMax : 10,
            linkPolicy: rawOptions.linkPolicy ? rawOptions.linkPolicy : 'https://remarked.ru/widget/new/css/privancy.html',
            linkPolicyChecked: rawOptions.linkPolicyChecked ? rawOptions.linkPolicyChecked : false,
            linkPolicyEnforced: rawOptions.linkPolicyEnforced ? rawOptions.linkPolicyEnforced : false,
            button: rawOptions.button ? rawOptions.button : '.open__primary__widget',
            
            dateNextHour: rawOptions.dateNextHour || rawOptions.dateNextHour === 0 ? rawOptions.dateNextHour : 3600000,

            showDisabledTime: rawOptions.showDisabledTime ? rawOptions.showDisabledTime : false,
            lang: {
            'ru-RU': {
                headTitle: rawOptions.lang['ru-RU'].headTitle ? rawOptions.lang['ru-RU'].headTitle : 'Забронировать',
                headText: rawOptions.lang['ru-RU'].headText ? rawOptions.lang['ru-RU'].headText : 'Какой ресторан вы хотели бы посетить?',
                labelName: rawOptions.lang['ru-RU'].labelName ? rawOptions.lang['ru-RU'].labelName : 'На какое имя бронируем?',
                placeholderName: rawOptions.lang['ru-RU'].placeholderName ? rawOptions.lang['ru-RU'].placeholderName : 'Имя',
                labelLastName: rawOptions.lang['ru-RU'].labelLastName ? rawOptions.lang['ru-RU'].labelLastName : 'На какую фамилию бронируем?',
                placeholderLastName: rawOptions.lang['ru-RU'].placeholderLastName ? rawOptions.lang['ru-RU'].placeholderLastName : 'Фамилия',
                labelPhone: rawOptions.lang['ru-RU'].labelPhone ? rawOptions.lang['ru-RU'].labelPhone : 'Номер телефона',
                placeholderPhone: rawOptions.lang['ru-RU'].placeholderPhone ? rawOptions.lang['ru-RU'].placeholderPhone : 'Телефон',
                labelEmail: rawOptions.lang['ru-RU'].labelEmail ? rawOptions.lang['ru-RU'].labelEmail : 'Электронная почта',
                placeholderEmail: rawOptions.lang['ru-RU'].placeholderEmail ? rawOptions.lang['ru-RU'].placeholderEmail : 'e-mail',
                labelCountGuest: rawOptions.lang['ru-RU'].labelCountGuest ? rawOptions.lang['ru-RU'].labelCountGuest : 'Количество персон',
                labelDate: rawOptions.lang['ru-RU'].labelDate ? rawOptions.lang['ru-RU'].labelDate : 'Дата посещения',
                placeholderDate: rawOptions.lang['ru-RU'].placeholderDate ? rawOptions.lang['ru-RU'].placeholderDate : 'Выберите дату',
                labelTime: rawOptions.lang['ru-RU'].labelTime ? rawOptions.lang['ru-RU'].labelTime : 'Свободное время',
                noticeTime: rawOptions.lang['ru-RU'].noticeTime ? rawOptions.lang['ru-RU'].noticeTime : 'Выберите время',
                labelComment: rawOptions.lang['ru-RU'].labelComment ? rawOptions.lang['ru-RU'].labelComment : 'Комментарий',
                placeholderComment: rawOptions.lang['ru-RU'].placeholderComment ? rawOptions.lang['ru-RU'].placeholderComment : 'Текст вашего сообщения',
                textPolicy: rawOptions.lang['ru-RU'].textPolicy ? rawOptions.lang['ru-RU'].textPolicy : 'Согласен(-сна) на обработку персональных данных и с',
                textLinkPolicy: rawOptions.lang['ru-RU'].textLinkPolicy ? rawOptions.lang['ru-RU'].textLinkPolicy : 'пользовательским соглашением.',
                thanksTitle: rawOptions.lang['ru-RU'].thanksTitle ? rawOptions.lang['ru-RU'].thanksTitle : 'Спасибо',
                thanksText: rawOptions.lang['ru-RU'].thanksText ? rawOptions.lang['ru-RU'].thanksText : 'Ваша бронь успешна!<br> Ресторан свяжется с вами и подтвердит детали резерва.',
                textSubmit: rawOptions.lang['ru-RU'].textSubmit ? rawOptions.lang['ru-RU'].textSubmit : 'Забронировать',
                tags: rawOptions.lang['ru-RU'].tags ? rawOptions.lang['ru-RU'].tags : 'Теги',
                eventTags: rawOptions.lang['ru-RU'].eventTags ? rawOptions.lang['ru-RU'].eventTags : 'Событие',
                labelBirthday: rawOptions.lang['ru-RU'].labelBirthday ? rawOptions.lang['ru-RU'].labelBirthday : 'Дата рождения',
                placeholderBirthday: rawOptions.lang['ru-RU'].placeholderBirthday ? rawOptions.lang['ru-RU'].placeholderBirthday : 'Укажите дату рождения',
                bookingNewOption: rawOptions.lang['ru-RU'].bookingNewOption ? rawOptions.lang['ru-RU'].bookingNewOption : 'Выберите ресторан',
                extraPolicyCheckboxText: rawOptions.lang['ru-RU'].extraPolicyCheckboxText ? rawOptions.lang['ru-RU'].extraPolicyCheckboxText : 'С правилами посещения',
                extraPolicyCheckboxLink: rawOptions.lang['ru-RU'].extraPolicyCheckboxLink ? rawOptions.lang['ru-RU'].extraPolicyCheckboxLink : 'ознакомлен.',
                subcsriptionCheckboxText: rawOptions.lang['ru-RU'].subcsriptionCheckboxText ? rawOptions.lang['ru-RU'].subcsriptionCheckboxText : 'Согласен(-сна) на получение рекламных рассылок, с',
                subcsriptionCheckboxLink: rawOptions.lang['ru-RU'].subcsriptionCheckboxLink ? rawOptions.lang['ru-RU'].subcsriptionCheckboxLink : 'правилами ознакомлен(a).',
                labelchildren: rawOptions.lang['ru-RU'].labelchildren ? rawOptions.lang['ru-RU'].labelchildren : 'Количество детей',
                labelAddSelect: rawOptions.lang['ru-RU'].labelAddSelect ? rawOptions.lang['ru-RU'].labelAddSelect : 'Выберите зал',
                errorName: rawOptions.lang['ru-RU'].errorName ? rawOptions.lang['ru-RU'].errorName : 'Не заполнено поле Имя',
                errorLastName: rawOptions.lang['ru-RU'].errorLastName ? rawOptions.lang['ru-RU'].errorLastName : 'Не заполнено поле Фамилия',
                errorPhone: rawOptions.lang['ru-RU'].errorPhone ? rawOptions.lang['ru-RU'].errorPhone : 'Не заполнено поле Телефон',
                errorBirthday: rawOptions.lang['ru-RU'].errorBirthday ? rawOptions.lang['ru-RU'].errorBirthday : 'Не заполнено поле День рождения',
                errorEmail: rawOptions.lang['ru-RU'].errorEmail ? rawOptions.lang['ru-RU'].errorEmail : 'Не заполнено поле Email',
                errorDate: rawOptions.lang['ru-RU'].errorDate ? rawOptions.lang['ru-RU'].errorDate : 'Не заполнено поле Дата',
            },
            'en-US': {
                headTitle: rawOptions.lang['en-US'].headTitle ? rawOptions.lang['en-US'].headTitle : 'Booking',
                headText: rawOptions.lang['en-US'].headText ? rawOptions.lang['en-US'].headText : 'Which restaurant would you like to visit?',
                labelName: rawOptions.lang['en-US'].labelName ? rawOptions.lang['en-US'].labelName : 'What is the name for the booking?',
                placeholderName: rawOptions.lang['en-US'].placeholderName ? rawOptions.lang['en-US'].placeholderName : 'Name',
                labelLastName: rawOptions.lang['en-US'].labelLastName ? rawOptions.lang['en-US'].labelLastName : 'What is the surname for the booking?',
                placeholderLastName: rawOptions.lang['en-US'].placeholderLastName ? rawOptions.lang['en-US'].placeholderLastName : 'Surname',
                labelPhone: rawOptions.lang['en-US'].labelPhone ? rawOptions.lang['en-US'].labelPhone : 'Phone number',
                placeholderPhone: rawOptions.lang['en-US'].placeholderPhone ? rawOptions.lang['en-US'].placeholderPhone : 'Phone',
                labelEmail: rawOptions.lang['en-US'].labelEmail ? rawOptions.lang['en-US'].labelEmail : 'E-mail',
                placeholderEmail: rawOptions.lang['en-US'].placeholderEmail ? rawOptions.lang['en-US'].placeholderEmail : 'e-mail',
                labelCountGuest: rawOptions.lang['en-US'].labelCountGuest ? rawOptions.lang['en-US'].labelCountGuest : 'Number of guests',
                labelDate: rawOptions.lang['en-US'].labelDate ? rawOptions.lang['en-US'].labelDate : 'Date of visit',
                placeholderDate: rawOptions.lang['en-US'].placeholderDate ? rawOptions.lang['en-US'].placeholderDate : 'Pick a date',
                labelTime: rawOptions.lang['en-US'].labelTime ? rawOptions.lang['en-US'].labelTime : 'Free time',
                noticeTime: rawOptions.lang['en-US'].noticeTime ? rawOptions.lang['en-US'].noticeTime : 'Pick a time',
                labelComment: rawOptions.lang['en-US'].labelComment ? rawOptions.lang['en-US'].labelComment : 'Comment',
                placeholderComment: rawOptions.lang['en-US'].placeholderComment ? rawOptions.lang['en-US'].placeholderComment : 'The text of your message',
                textPolicy: rawOptions.lang['en-US'].textPolicy ? rawOptions.lang['en-US'].textPolicy : 'I agree with the processing of personal data and with ',
                textLinkPolicy: rawOptions.lang['en-US'].textLinkPolicy ? rawOptions.lang['en-US'].textLinkPolicy : 'the user agreement.',
                thanksTitle: rawOptions.lang['en-US'].thanksTitle ? rawOptions.lang['en-US'].thanksTitle : 'Thanks',
                thanksText: rawOptions.lang['en-US'].thanksText ? rawOptions.lang['en-US'].thanksText : 'We will contact you soon <br> to get the details of your visit',
                textSubmit: rawOptions.lang['en-US'].textSubmit ? rawOptions.lang['en-US'].textSubmit : 'Book',
                tags: rawOptions.lang['en-US'].tags ? rawOptions.lang['en-US'].tags : 'Tags',
                eventTags: rawOptions.lang['en-US'].eventTags ? rawOptions.lang['en-US'].eventTags : 'Event',
                labelBirthday: rawOptions.lang['en-US'].labelBirthday ? rawOptions.lang['en-US'].labelBirthday : 'Date of birth',
                placeholderBirthday: rawOptions.lang['en-US'].placeholderBirthday ? rawOptions.lang['en-US'].placeholderBirthday : 'Date of birth',
                extraPolicyCheckboxText: rawOptions.lang['en-US'].extraPolicyCheckboxText ? rawOptions.lang['en-US'].extraPolicyCheckboxText : 'I agree to show the documents confirming the age when ordering',
                extraPolicyCheckboxLink: rawOptions.lang['en-US'].extraPolicyCheckboxLink ? rawOptions.lang['en-US'].extraPolicyCheckboxLink : 'alcoholic beverages.',
                subcsriptionCheckboxText: rawOptions.lang['ru-RU'].subcsriptionCheckboxText ? rawOptions.lang['ru-RU'].subcsriptionCheckboxText : 'I agree to receive advertising mailings and',
                subcsriptionCheckboxLink: rawOptions.lang['ru-RU'].subcsriptionCheckboxLink ? rawOptions.lang['ru-RU'].subcsriptionCheckboxLink : ' have read the rules.',
                labelchildren: rawOptions.lang['en-US'].labelchildren ? rawOptions.lang['en-US'].labelchildren : 'Number of children',
                labelAddSelect: rawOptions.lang['en-US'].labelAddSelect ? rawOptions.lang['en-US'].labelAddSelect : 'Select hall',
                errorName: rawOptions.lang['en-US'].errorName ? rawOptions.lang['en-US'].errorName : 'The Name field is not filled in',
                errorLastName: rawOptions.lang['en-US'].errorLastName ? rawOptions.lang['en-US'].errorLastName : 'The Last Name field is not filled in',
                errorPhone: rawOptions.lang['en-US'].errorPhone ? rawOptions.lang['en-US'].errorPhone : 'The Phone field is not filled in',
                errorBirthday: rawOptions.lang['en-US'].errorBirthday ? rawOptions.lang['en-US'].errorBirthday : 'The Birthday field is not filled in',
                errorEmail: rawOptions.lang['en-US'].errorEmail ? rawOptions.lang['en-US'].errorEmail : 'Email field is not filled in',
                errorDate: rawOptions.lang['en-US'].errorDate ? rawOptions.lang['en-US'].errorDate : 'The Date field is not filled in',
            },
            },
            language: rawOptions.addLang ? rawOptions.addLang : {},
            commentRequired: rawOptions.commentRequired ? rawOptions.commentRequired : false,
            lastNameNotRequired: rawOptions.lastNameNotRequired ? rawOptions.lastNameNotRequired : false,
            guestCountSelect: rawOptions.guestCountSelect ? rawOptions.guestCountSelect : false,
            session_id: `session_${Date.now()}_${Math.random()}`,
        };

        return options; // проверить, нужна ли ещё обработка
    }
}