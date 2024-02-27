const _ = require('lodash');

exports.checkNullValuesInObject = (obj, requiredFields) => {
    requiredFields.forEach(field => {
        if (!obj[field]) {
            throw new Error(`${_.capitalize(field)} (${field}) is required`);
        }
    });
    return true;
}