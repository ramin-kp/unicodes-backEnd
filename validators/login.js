const Validators = require("fastest-validator");

const v = new Validators();

const schema = {
  identifier: { type: "string", min: 3, max: 100 },
  password: { type: "string", min: 8, max: 24 },
  $$strict: true,
};

const validator = v.compile(schema);

module.exports = validator;
