export default class phoneCodeSelect {
    constructor(elem, options = {}) {
        this.input = elem;
        this.options = options;
        this.valid = false;
        this.init();
    }

    config = {
        ru: { code: "7",   mask: "(***) ***-**-**", flag: "ru" },
        by: { code: "375", mask: "(**) ***-**-**",  flag: "by" },
        kz: { code: "7",   mask: "(***) ***-**-**", flag: "kz" },
        ua: { code: "380", mask: "(**) ***-**-**",  flag: "ua" },

        us: { code: "1",   mask: "(***) ***-****",  flag: "us" },
        ca: { code: "1",   mask: "(***) ***-****",  flag: "ca" },

        gb: { code: "44",  mask: "**** ******",     flag: "gb" },
        ie: { code: "353", mask: "** *** ****",     flag: "ie" },

        de: { code: "49",  mask: "**** ********",   flag: "de" },
        fr: { code: "33",  mask: "* ** ** ** **",   flag: "fr" },
        it: { code: "39",  mask: "*** **** ***",    flag: "it" },
        es: { code: "34",  mask: "*** *** ***",     flag: "es" },
        pt: { code: "351", mask: "*** *** ***",     flag: "pt" },
        nl: { code: "31",  mask: "** *** ****",     flag: "nl" },
        be: { code: "32",  mask: "*** ** ** **",    flag: "be" },
        ch: { code: "41",  mask: "** *** ** **",    flag: "ch" },
        at: { code: "43",  mask: "*** ******",     flag: "at" },
        se: { code: "46",  mask: "** *** ** **",    flag: "se" },
        no: { code: "47",  mask: "** ** ** **",     flag: "no" },
        fi: { code: "358", mask: "** *** ****",     flag: "fi" },
        dk: { code: "45",  mask: "** ** ** **",     flag: "dk" },
        pl: { code: "48",  mask: "*** *** ***",     flag: "pl" },
        cz: { code: "420", mask: "*** *** ***",     flag: "cz" },
        sk: { code: "421", mask: "*** *** ***",     flag: "sk" },
        hu: { code: "36",  mask: "** *** ****",     flag: "hu" },
        ro: { code: "40",  mask: "*** *** ***",     flag: "ro" },
        bg: { code: "359", mask: "*** *** ***",     flag: "bg" },
        hr: { code: "385", mask: "** *** ***",      flag: "hr" },
        si: { code: "386", mask: "** *** ***",      flag: "si" },
        rs: { code: "381", mask: "** *** ****",     flag: "rs" },
        me: { code: "382", mask: "** *** ***",      flag: "me" },
        mk: { code: "389", mask: "** *** ***",      flag: "mk" },

        tr: { code: "90",  mask: "*** *** ****",    flag: "tr" },
        il: { code: "972", mask: "** *** ****",     flag: "il" },
        ae: { code: "971", mask: "** *** ****",     flag: "ae" },
        sa: { code: "966", mask: "** *** ****",     flag: "sa" },
        qa: { code: "974", mask: "*** ****",        flag: "qa" },
        kw: { code: "965", mask: "**** ****",       flag: "kw" },
        bh: { code: "973", mask: "**** ****",       flag: "bh" },
        om: { code: "968", mask: "**** ****",       flag: "om" },
        jo: { code: "962", mask: "* **** ****",     flag: "jo" },

        cn: { code: "86",  mask: "*** **** ****",   flag: "cn" },
        jp: { code: "81",  mask: "** **** ****",    flag: "jp" },
        kr: { code: "82",  mask: "** *** ****",     flag: "kr" },
        in: { code: "91",  mask: "***** *****",    flag: "in" },
        id: { code: "62",  mask: "*** *** ****",    flag: "id" },
        th: { code: "66",  mask: "** *** ****",     flag: "th" },
        vn: { code: "84",  mask: "** **** ****",    flag: "vn" },
        ph: { code: "63",  mask: "*** *** ****",    flag: "ph" },
        sg: { code: "65",  mask: "**** ****",       flag: "sg" },
        hk: { code: "852", mask: "**** ****",       flag: "hk" },

        au: { code: "61",  mask: "* **** ****",     flag: "au" },
        nz: { code: "64",  mask: "** *** ****",     flag: "nz" },

        br: { code: "55",  mask: "** ***** ****",  flag: "br" },
        mx: { code: "52",  mask: "*** *** ****",   flag: "mx" },
        cl: { code: "56",  mask: "* **** ****",     flag: "cl" },
        ar: { code: "54",  mask: "** **** ****",   flag: "ar" },
        uy: { code: "598", mask: "* *** ** **",     flag: "uy" },

        za: { code: "27",  mask: "** *** ****",     flag: "za" },
        eg: { code: "20",  mask: "*** *** ****",   flag: "eg" },
        ke: { code: "254", mask: "*** ******",     flag: "ke" },
    }

    init() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('phoneCodeMaskReMarked');

        this.wrap(this.input, wrapper);

        const select = document.createElement('select');
        this.select = select;
        select.classList.add('phoneCodeMaskReMarked-select');

        this.select.addEventListener('change', () => {
        const mask = this.select.options[this.select.selectedIndex];
        // console.log(mask);
        inputMask.setAttribute('data-mask', mask.getAttribute('data-mask'));
        //inputMask.value = '';

        this.updateTrigger();

        const event = new Event('input');
        inputMask.dispatchEvent(event);
        });

        const inputMask = document.createElement('input');
        inputMask.classList.add('phoneCodeMaskReMarked-input');

        let index = 0;
        for (const key in this.config) {
        if (Object.hasOwnProperty.call(this.config, key)) {
            const element = this.config[key];
            const option = document.createElement('option');
            option.setAttribute('value', key);
            option.setAttribute('data-mask', element.mask);
            option.setAttribute('data-dial-code', element.code);
            option.textContent = '+' + element.code;
            if ((!index && this.options.selectedPhoneCodeCountry === '' && this.options.selectedPhoneCodeValue === '') || option.value === this.options.selectedPhoneCodeCountry || option.dataset.dialCode === this.options.selectedPhoneCodeValue) {
            option.setAttribute('selected', 'selected');
            inputMask.setAttribute('data-mask', element.mask);
            }
            index++;
            select.append(option);
        }
        }

        wrapper.append(select);

        this.trigger = document.createElement('div');
        this.trigger.className = 'phoneCodeMaskReMarked-trigger';

        this.triggerFlag = document.createElement('div');
        this.triggerFlag.className = 'phoneCodeMaskReMarked-flag';

        this.triggerCode = document.createElement('span');
        this.triggerCode.className = 'phoneCodeMaskReMarked-code';

        const arrow = document.createElement('div');
        arrow.className = 'phoneCodeMaskReMarked-arrow';

        this.trigger.append(this.triggerFlag, arrow, this.triggerCode);
        wrapper.append(this.trigger);

        // Initialize searchable dropdown
        this.initSearchableDropdown(select, wrapper);

        const context = this;

        function maskHandler(e) {
        const el = e.target;
        const clearVal = el.dataset.phoneClear;
        const pattern = el.getAttribute('data-mask');
        const matrix = pattern;
        let i = 0;
        let def = matrix.replace(/\D/g, "");
        let val = e.target.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[*\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });

        if (e.target.value.replace(/\D/g, "").length === matrix.match(/([\*\d])/g).length) {
            context.valid = true;
        } else {
            context.valid = false;
        }

        const selected = context.select.options[context.select.selectedIndex];
        context.input.value = selected.dataset.dialCode + e.target.value.replace(/\D/g, "");
        }

        inputMask.addEventListener('input', maskHandler);
        inputMask.addEventListener('blur', maskHandler);
        inputMask.addEventListener('focus', maskHandler);

        wrapper.append(inputMask);

        this.updateTrigger();
    }

    isValid() {
        return this.valid;
    }

    initSearchableDropdown(select, container) {
        this.createSearchElements(select, container);
        this.createDropdownOptions(select);
        this.bindEvents(select, container);
    }

    createSearchElements(select, container) {
        this.searchContainer = document.createElement('div');
        this.searchContainer.className = 'phoneCodeMaskReMarked-search-container';

        this.searchInput = document.createElement('input');
        this.searchInput.type = 'text';
        this.searchInput.className = 'phoneCodeMaskReMarked-search';
        this.searchInput.placeholder = 'Поиск';

        this.dropdown = document.createElement('div');
        this.dropdown.className = 'phoneCodeMaskReMarked-dropdown';

        this.searchContainer.appendChild(this.searchInput);
        container.appendChild(this.searchContainer);
        container.appendChild(this.dropdown);
    }

    createDropdownOptions(select) {
        this.originalOptions = Array.from(select.options);
        this.dropdownOptions = [];

        this.originalOptions.forEach(option => {
            const key = option.getAttribute('value');
            const cfg = this.config[key];

            const dropdownOption = document.createElement('div');
            dropdownOption.className = 'phoneCodeMaskReMarked-option';

            const flag = document.createElement('div');
            flag.className = 'phoneCodeMaskReMarked-flag';

            if (cfg && cfg.flag) {
                flag.style.backgroundImage = `url(https://remarked.ru/widget/new/js/flags/${cfg.flag}.svg)`;
            }

            const text = document.createElement('span');
            text.className = 'phoneCodeMaskReMarked-option-text';
            text.textContent = option.textContent;

            dropdownOption.append(flag, text);

            dropdownOption.setAttribute('data-value', option.value);
            // dropdownOption.setAttribute('data-key', key);

            dropdownOption.addEventListener('click', () => {
                select.value = dropdownOption.dataset.value;
                select.dispatchEvent(new Event('change'));
                this.hideDropdown();
            });

        this.dropdown.appendChild(dropdownOption);
        this.dropdownOptions.push(dropdownOption);
        });
    }

    bindEvents(select, container) {
        select.addEventListener('focus', () => {
        this.showDropdown();
        });

        select.addEventListener('change', () => {
        this.hideDropdown();
        });

        this.searchInput.addEventListener('input', (e) => {
        this.filterOptions(e.target.value);
        });

        this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            this.hideDropdown();
            select.focus();
        }
        });

        this.hideSearchHandler = (e) => {
        if (!container.contains(e.target) && e.target !== select) {
            this.hideDropdown();
            document.removeEventListener('click', this.hideSearchHandler);
        }
        };
        
        this.trigger.addEventListener('click', () => {
        this.showDropdown();
        });

    }

    showDropdown() {
        this.searchContainer.style.display = 'block';
        this.dropdown.classList.add('visible');
        this.searchInput.focus();
        document.addEventListener('click', this.hideSearchHandler);
    }

    hideDropdown() {
        this.searchContainer.style.display = 'none';
        this.dropdown.classList.remove('visible');
        this.searchInput.value = '';
        this.filterOptions('');
    }

    filterOptions(searchText) {
        const searchLower = searchText.toLowerCase();
        this.dropdownOptions.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        if (searchText === '' || optionText.includes(searchLower)) {
            option.classList.remove('hidden');
        } else {
            option.classList.add('hidden');
        }
        });
    }

    updateTrigger() {
        const selectedOption = this.select.options[this.select.selectedIndex];
        const key = selectedOption.getAttribute('value');
        const cfg = this.config[key];

        this.triggerCode.textContent = '+' + selectedOption.getAttribute('data-dial-code');

        if (cfg?.flag) {
        this.triggerFlag.style.backgroundImage =
            `url(https://remarked.ru/widget/new/js/flags/${cfg.flag}.svg)`;
        }
    }

    wrap(toWrap, wrapper) {
        wrapper = wrapper || document.createElement('div');
        toWrap.parentNode.insertBefore(wrapper, toWrap);
        return wrapper.appendChild(toWrap);
    };
    }


    function maskDateRemarked(elem, options = {}) {
    elem.addEventListener('input', function (e) {

        let cursorPos = e.target.selectionStart;
        let originalValue = e.target.value;

        let digits = originalValue.replace(/\D/g, '');

        if (digits.length > 8) digits = digits.substring(0, 8);

        let maskedValue = '';
        if (digits.length > 0) maskedValue = digits.substring(0, 2);
        if (digits.length >= 3) maskedValue += '.' + digits.substring(2, 4);
        if (digits.length >= 5) maskedValue += '.' + digits.substring(4, 8);

        e.target.value = maskedValue;

        let digitsBeforeCursor = 0;
        for (let i = 0; i < cursorPos; i++) {
            if (originalValue[i] && originalValue[i].match(/\d/)) {
                digitsBeforeCursor++;
            }
        }

        // Находим новую позицию курсора в отформатированном значении
        let newCursorPos = 0;
        let digitsCounted = 0;
        for (let i = 0; i < maskedValue.length && digitsCounted < digitsBeforeCursor; i++) {
            if (maskedValue[i].match(/\d/)) {
                digitsCounted++;
            }
            newCursorPos++;
        }

        if (maskedValue[newCursorPos] === '.' && digitsCounted === digitsBeforeCursor && digitsBeforeCursor > 0) {
            if ((digitsBeforeCursor === 2 && maskedValue.length >= 3) ||
                (digitsBeforeCursor === 4 && maskedValue.length >= 6)) {
                newCursorPos++;
            }
        }

        if (cursorPos === originalValue.length && maskedValue.length > originalValue.length) {
            if ((originalValue.replace(/\D/g, '').length === 2 && maskedValue.length === 3) ||
                (originalValue.replace(/\D/g, '').length === 4 && maskedValue.length === 6)
            ) {
                newCursorPos = maskedValue.length;
            }
        } else if (newCursorPos === 0 && digitsBeforeCursor > 0) {}

        if (digitsBeforeCursor === digits.length && digits.length > 0) newCursorPos = maskedValue.length;

        e.target.setSelectionRange(newCursorPos, newCursorPos);
    });

    function isValid() {
        const [dd, mm, yyyy] = elem.value.split('.');
        const format = `${yyyy}-${mm}-${dd}`;
        const instance = new Date(format);
        if (!!isNaN(instance)) return false;

        const instanceDay = instance.getDate();
        const instanceMonth = instance.getMonth() + 1;
        const instanceYear = instance.getFullYear();
        const instanceFormat = `${instanceYear}-${instanceMonth < 10 ? `0${instanceMonth}` : instanceMonth}-${instanceDay < 10 ? `0${instanceDay}` : instanceDay}`;

        if (instanceFormat !== format) return false;

        const instanceNowTimestamp = Date.now();
        const minTimestamp = instanceNowTimestamp - (options.minQtyYears * 365 * 86400 * 1000);
        const maxTimestamp = instanceNowTimestamp - (95 * 365 * 86400 * 1000);

        const instanceTimestamp = instance.getTime();
        return !!(instanceTimestamp > maxTimestamp && instanceTimestamp < minTimestamp);
    }

    return {
        isValid,
    }
}