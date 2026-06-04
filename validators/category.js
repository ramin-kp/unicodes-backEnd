const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  title: {
    type: "string",
    min: 3,
    max: 100,
    messages: {
      string: "عنوان باید متن باشد.",
      stringMin: "عنوان نمی‌تواند کمتر از 3 کاراکتر باشد.",
      stringMax: "عنوان نمی‌تواند بیشتر از 100 کاراکتر باشد.",
      required: "وارد کردن عنوان الزامی است.",
    },
  },

  slug: {
    type: "string",
    min: 3,
    max: 100,
    pattern: /^[a-zA-Z0-9-]+$/, // فقط حروف انگلیسی، عدد و خط تیره (hyphen)
    messages: {
      string: "اسلاگ باید متن باشد.",
      stringMin: "اسلاگ نمی‌تواند کمتر از 3 کاراکتر باشد.",
      stringMax: "اسلاگ نمی‌تواند بیشتر از 100 کاراکتر باشد.",
      stringPattern:
        "فرمت اسلاگ نامعتبر است. فقط از حروف انگلیسی، اعداد و خط تیره (-) استفاده کنید.",
      required: "وارد کردن اسلاگ الزامی است.",
    },
  },

  $$strict: true,
};

const validator = v.compile(schema);

module.exports = validator;
