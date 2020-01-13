export const getObjectValue = (object, path, defaultValue) => {
  const _defaultValue = defaultValue || null;
  if (!path) {
    return _defaultValue;
  }

  let result = object;
  const _pathTrimmed = path.trim();
  if (_pathTrimmed == '') {
    return result;
  }

  const keys = _pathTrimmed.split('.');

  keys.forEach(key => {
    if (result !== null && typeof result[key] !== 'undefined' && result[key] !== null) {
      result = result[key];
      return;
    }

    result = _defaultValue;
  });

  return result;
};

export const hasFormatFunction = item => {
  return (item && 'formatFunction' in item) ? true : false;
};
