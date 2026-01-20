import { Tooltips } from "./Tooltips";

export function dateReplacer(datepickerValue) {
    let dateArr = datepickerValue.split('-');
    if (dateArr.length === 1) return datepickerValue;
    let date = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
    return date;
}

export function normalizeQty(input, value, inputName, showTooltip = false) {
    const min = Number(input.min);
    const max = Number(input.max);

    let normalized = value;

    if (Number.isNaN(normalized)) return null;

    if (normalized < min) {
        normalized = min;
        if (showTooltip) {
        Tooltips.showQtyWarning(inputName, 'minus', 'min');
        }
    }

    if (normalized > max) {
        normalized = max;
        if (showTooltip) {
        Tooltips.showQtyWarning(inputName, 'plus', 'max');
        }
    }

    return normalized;
}

function setQty(input, value, inputName) {
    const normalized = normalizeQty(input, value, inputName, true);
    if (normalized === null) return;

    if (normalized === Number(input.value)) return;

    input.value = normalized;
    input.dispatchEvent(new Event('input', { bubbles: true }));
}

export function qtyPlus(inputWrap, inputName) {
    const input = inputWrap.querySelector('input');
    const step = Number(input.step) || 1;

    setQty(input, Number(input.value) + step, inputName);
}

export function qtyMinus(inputWrap, inputName) {
    const input = inputWrap.querySelector('input');
    const step = Number(input.step) || 1;

    setQty(input, Number(input.value) - step, inputName);
}

export function calculateReservePrice(date, times, lanesNum) {
    const weekDay = date.getDay();

    let reserveSum = 0;

    if (weekDay >= 1 && weekDay <= 4) {
        for (let time of times) {
            if (time >= '10:00' && time <= '16:00') {
                reserveSum += 960;
            } else {
                reserveSum += 1350;
            }
        }
    } else if (weekDay === 5) {
        for (let time of times) {
            if (time >= '10:00' && time <= '16:00') {
                reserveSum += 960;
            } else if (time >= '17:00' && time <= '23:00' || time == '00:00') {
                reserveSum += 1860;
            } else {
                reserveSum += 1860;
            }
        }
    } else if (weekDay === 6) {
        reserveSum += 1860;
    } else {
        for (let time of times) {
            if (time >= '10:00' && time <= '16:00') {
                reserveSum += 1860;
            } else {
                reserveSum += 1350;
            }
        }
    }

    reserveSum *= lanesNum;

    return reserveSum;
}

function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  let minutes = h * 60 + m;

  // всё, что с 00:00 до 02:00 — считаем следующим днём
  if (h < 10) {
    minutes += 24 * 60;
  }

  return minutes;
}

// принимает две строки формата "10:00"
export function compareTimes(a, b) {
  return timeToMinutes(a) - timeToMinutes(b);
}