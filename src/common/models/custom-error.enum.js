const CustomErrorsEnum = Object.freeze(
  {
    isEmpty: 'Value must not be empty',
    isString: 'Value must be a string',
    isRequired: 'Value is required',
    notString: 'Value must not be string',
    isNumeric: 'Value must be a number',
    isIn: 'Value must be type of',
    isInt: 'Value must be integer number',
    isArray: 'Value must be an array',
    isLengthMin: 'Length of the value must be greater than',
    isArrayOfStrings: 'All values in array must not be empty strings',
    isOneLetter: 'Length of value must be not longer than one letter',
    isDate: 'Value must be in ISO date format',
    isEmail: 'It must be an email',
  },
);

export default CustomErrorsEnum;
