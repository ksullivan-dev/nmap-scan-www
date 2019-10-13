const createParamString = (obj, startsWithQuestion = true) => {
  return Object.keys(obj).reduce((string, key, idx) => {
    const param = `${key}=${obj[key]}`;
    const join = idx === 0 && startsWithQuestion ? '?' : '&';
    return string + join + param;
  }, '');
};

export default createParamString;
