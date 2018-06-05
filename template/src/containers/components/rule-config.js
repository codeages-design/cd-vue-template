import Translator from './translations/translator';
module.exports =  {
  es_version: {
    message: Translator.trans('validate_old.es_version.message'),
    validator(str) {
      const reg = /(^\d{1,2}\.\d{1,2}\.\d{1,2})+$/;
      return reg.test(str);
    },
  },
  not_all_digital: {
    message: Translator.trans('validate_old.not_all_digital.message'),
    validator(str) {
      const reg = /(^(?![^0-9a-zA-Z]+$))(?![0-9]+$).+/;
      return reg.test(str);
    },
  },
  visible_character: {
    message: Translator.trans('validate_old.visible_character.message'),
    validator(str) {
      if (str.trim().length <= 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  chinese: {
    message: Translator.trans('validate_old.chinese.message'),
    validator(str) {
      const reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/i;
      return reg.test(str);
    },
  },
  phone: {
    message: Translator.trans('validate_old.mobile.message'),
    validator(str) {
      const reg = /^1\d{10}$/;
      return reg.test(str);
    },
  },
  chinese_alphanumeric: {
    message: Translator.trans('validate_old.chinese_alphanumeric.message'),
    validator(str) {
      const reg = /^([\u4E00-\uFA29]|[a-zA-Z0-9_.·])*$/i;
      return reg.test(str);
    }
  },
  reg_inviteCode: {
    message: Translator.trans('validate_old.reg_invite_code.message'),
    validator(str) {
      const reg = /^[a-z0-9A-Z]{5}$/;
      return reg.test(str);
    }
  },
  alphanumeric: {
    message: Translator.trans('validate_old.alphanumeric.message'),
    validator(str) {
      const reg = /^[a-zA-Z0-9_]+$/i;
      return reg.test(str);
    }
  },
  alphabet_underline: {
    message: Translator.trans('validate_old.alphabet_underline.message'),
    validator(str) {
      const reg = /^[a-zA-Z_]+[a-zA-Z0-9_]*/i;
      return reg.test(str);
    }
  },
  currency: {
    message: Translator.trans('validate_old.currency_check.message'),
    validator(str) {
      const reg = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/i;
      return reg.test(str);
    }
  },
  positive_currency: {
    message: Translator.trans('validate.positive_currency.message'),
    validator(str) {
      const reg = /^[0-9]{0,8}(\.\d{0,2})?$/i;
      return reg.test(str);
    }
  },
  password: {
    message: Translator.trans('validate_old.password.message'),
    validator(str) {
      const reg = /^[\S]{4,20}$/i;
      return reg.test(str);
    }
  },
  second_range: {
    message: Translator.trans('validate_old.second_range.message'),
    validator(str) {
      const reg = /^([0-9]|[012345][0-9]|59)$/;
      return reg.test(str);
    }
  },
  date: {
    message: Translator.trans('validate_old.valid_date_input.message'),
    validator(str) {
      const reg = /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/;
      return reg.test(str);
    }
  },
  qq: {
    message: Translator.trans('validate_old.qq.message'),
    validator(str) {
      const reg = /^[1-9]\d{4,}$/;
      return reg.test(str);
    }
  },
  integer: {
    message: Translator.trans('validate_old.integer.message'),
    validator(str) {
      const reg = /^[+-]?\d+$/;
      return reg.test(str);
    }
  },
  float: {
    message: Translator.trans('validate_old.float_check.message'),
    validator(str) {
      const reg = /^(([+-]?[1-9]{1}\d*)|([+-]?[0]{1}))(\.(\d){1,2})?$/i;
      return reg.test(str);
    }
  },
  decimal: {
    message: Translator.trans('validate_old.float.message'),
    validator(str) {
      const reg = /^(([+]?[1-9]{1}\d*)|([+]?[0]{1}))(\.(\d){1})?$/i;
      return reg.test(str);
    }
  },
  int: {
    message: Translator.trans('validate_old.int.message'),
    validator(str) {
      const reg = /^[+-]?\d{1,9}$/;
      return reg.test(str);
    }
  },
  positive_integer: {
    message: Translator.trans('validate_old.positive_integer.message'),
    validator(str) {
      const reg = /^[1-9]\d*$/;
      return reg.test(str);
    }
  },
  unsigned_integer: {
    message: Translator.trans('validate_old.unsigned_integer.message'),
    validator(str) {
      const reg = /^([1-9]\d*|0)$/;
      return reg.test(str);
    }
  },
  arithmetic_number: {
    message: Translator.trans('validate_old.arithmetic_number.message'),
    validator(str) {
      const reg = /^(?!0+(\.0+)?$)\d+(\.\d+)?$/;
      return reg.test(str);
    }
  },
  percent_number: {
    message: Translator.trans('validate_old.percent_number.message'),
    validator(str) {
      const reg = /^(100|[1-9]\d|\d)$/;
      return reg.test(str);
    }
  },
  date_and_time: {
    message: Translator.trans('validate_old.date_and_time.message'),
    validator(str) {
      const reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29) ([0-1]{1}[0-9]{1})|(2[0-4]{1}):[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$/;
      return reg.test(str); 
    }
  },
  email: {
    message: Translator.trans('validate_old.valid_email_or_mobile_input.message'),
    validator(str) {
      const reg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return reg.tes(str); 
    }
  },
  url: {
    message: Translator.trans('validate_old.valid_url_input.message'),
    validator(str) {
      const reg = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
      return reg.test(str); 
    }
  },
  number: {
    message: Translator.trans('validate_pld.valid_number_input.message'),
    validator(str) {
      const reg = /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/; 
      return reg.test(str); 
    }
  }
};