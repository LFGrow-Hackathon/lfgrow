import omitDeep from 'omit-deep';

export const prettyJSON = (message, obj) => {
  console.log(message, JSON.stringify(obj, null, 2));
};

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const omit = (object, name) => {
  return omitDeep(object, name);
};