/**
 * 简单的deep merge实现
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function assignment(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }

  return assignment(target, ...sources);
}
