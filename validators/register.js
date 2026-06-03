const Validators = require("fastest-validator");

const v = new Validators();

const schema = {
  username: { type: "string", min: 3, max: 100 },
  firesName: { type: "string", min: 3, max: 100 },
  lastName: { type: "string", min: 3, max: 100 },
  mobile: { type: "string", min: 11, max: 11 },
  email: { type: "string", min: 11, max: 100 },
  password: { type: "string", min: 8, max: 24 },
  $$strict: true,
};

const validator = v.compile(schema);

module.exports = validator;
