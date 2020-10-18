export default function mergeDeepLeft(left: any = {}, right: any = {}) {
  const result = Object.assign({}, left);

  for (let key in right) {
    if (result[key] === null || typeof result[key] !== 'object') {
      result[key] = right[key];
    } else {
      result[key] = mergeDeepLeft(result[key], right[key]);
    }
  }
  return result;
}
