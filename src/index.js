import handler from './handler';
import './style.css';
import modalView from './view/modal';

async function WidgetReMarked(selector, options = {}) {
	try {
		options.CLASS_NAME = 'WidgetRemarked';
		options.selector = selector;
		options.ID = `${options.CLASS_NAME}__${Date.now()}`;
		if (!options.weekShortNames) options.weekShortNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
		if (!options.weekNames) options.weekNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		if (!options.monthsNames) options.monthsNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
		if (!options.monthsCursiveNames) options.monthsCursiveNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
		
		const textContent = {
			headTitle: 'Забронировать',
			textNoticeGroup: 'Мы размещаем компании от 8 гостей в зале с открытой кухней по условиям группового бронирования. Для уточнения условий оставьте заявку, и мы свяжемся с вами в течение дня в WhatsApp',
			labelGuestCount: 'Кол-во гостей',
			SelectGuestCount: 'Выберите кол-во',
			labelDate: 'Дата',
			labelRoomsTime: 'Выбор зала и времени',
			placeholderName: 'Имя',
			placeholderSurname: 'Фамилия',
			placeholderPhone: 'Телефон',
			placeholderEmail: 'E-mail',
			placeholderGuestCount: 'Количество гостей',
			labelTextPolicy: 'Согласен(-сна) с <a href="#" target="_blank">политикой конфиденциальности</a> и с нашими условиями',
			textNoticeReserve: 'Заполняя форму бронирования вы подтверждаете согласие с нашими правилами',
			textNoticeReserve1: 
			`Подтверждение бронирования происходит на основе внесения предоплаты онлайн за каждого гостя.
			`,
			textNoticeReserve8: '',
			textNoticeReserve2: 'В случае отмены бронирования позднее, чем за 3 дня до даты визита, предоплата не возвращается',
			textNoticeReserve3: 'Мы сервируем дегустационное меню по количеству гостей в бронировании',
			textNoticeReserve4: 'Мы не рекомендуем приходить с детьми младше 7 лет из-за продолжительности и характера дегустационного меню.',
			textNoticeReserve5: 'Посещение ресторана с животными не предусмотрено',
			textNoticeReserve6: 'Продолжите заполнение заявки для перехода на страницу с оплатой. После успешного внесения предоплаты мы отправим Вам подтверждение бронирования в WhatsApp в течение дня.',
			textNoticeReserve7: 'Проверить наличие мест во втором нашем проекте',
			textNoticeNewYearTasteSet: 'В период с 19 декабря по 11 января мы предлагаем новогодний дегустационный сет в одном варианте. Бронирование происходит на основе предоплаты в размере 9 500₽ за каждого гостя.',
			extraNoticeReserve: 'В период с 18 по 21 июня мы будем сервировать расширенный дегустационный сет в одном варианте',
			buttonTextContinue: 'Продолжить',
			buttonTextReserveWaitingList: 'Записаться в лист ожидания',
			buttonTextSendReserve: 'Отправить заявку',
			buttonTextReserve: 'Забронировать',
			buttonTextClose: 'Закрыть',
			textError: 'Ошибка обратитесь в ресторан',
			messageSuccess1: 'Спасибо за Вашу заявку, в течение дня менеджер свяжется с вами для уточнения деталей',
			messageSuccess2: 'Благодарим Вас! Мы сделали предварительное бронирование и свяжемся с Вами в WhatsApp в течение дня для подтверждения резерва.',
			messageSuccess3: 'Благодарим! Мы свяжемся с Вами в случае появления свободных мест за день до желаемой даты',
			messageErrorTitle: 'Ошибка',
			messageErrorText: 'Попробуйте снова или обратитесь в ресторан',
			selectTime: 'Выберите время',
			errorSlot: 'Выбранное вами время не доступно, выберите другое',
			comonTable: 'Общий стол',
			selectSet: 'Выбрать сет',
			timesWrapperEmpty: 'Все места в выбранное Вами время забронированы',
			timesWrapperEmptyTitle: 'Выберите желаемое время',
			nextStep: 'Далее',
		};

		if (options.textContent) {
			const customTextContent = options.textContent;
			for (const key in customTextContent) {
				if (Object.hasOwnProperty.call(customTextContent, key)) {
					const element = customTextContent[key];
					textContent[key] = element;
				}
			}
		}

		options.textContent = textContent;

		const modal = modalView(options);

		document.querySelector('body').appendChild(modal.view);

		handler(modal, options);

	} catch (error) {
		console.error(error);
	}
}

export default WidgetReMarked;