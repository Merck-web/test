import { date } from 'quasar';

export default function (value = 'now', needTime = false, withoutTimezone = false) {
  value = (value && value !== 'now') ? new Date(value) : new Date();
  let format = 'DD.MM.YYYY';

  if (!value) {
    return '—';
  }

  if (/^\d{2}.\d{2}.\d{4}$/.test(value)) {
    return value;
  }
  else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.split('-').reverse().join('.');
  }
  else if (!isNaN(value) && Object.prototype.toString.call(new Date()) !== '[object Date]') {
    // Значит пришло timestamp и надо проверить, в секундах или миллисекундах. Иначе пришло значение из БД в
    // виде YYYY-MM-DDTHH:mm:ss.sssZ
    value = value.toString();

    if (value.length === 10) {
      // значит у нас секунды, а надо миллисекунды
      value = `${ value }000`;
    }
    else if (value.length === 16) {
      value = value.substr(0, 13);
    }

    value = parseInt(value);

    if (withoutTimezone) {
      value = new Date(value).toISOString();
      value = value.substr(0, 10);
      value = value.split('-').reverse().join('.');
      return value;
    }
    else if (needTime) {
      format = 'DD.MM.YYYY HH:mm';
      return date.formatDate(value, format);
    }
    else {
      return date.formatDate(value, format);
    }
  }
  else {
    if (needTime) format = 'DD.MM.YYYY HH:mm';
    return date.formatDate(value, format);
  }
}
