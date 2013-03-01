var random_number, random_items, unique_values;
random_number = function(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
};
random_items = function(array, count){
  var indices, index, i$, len$, i, results$ = [];
  indices = [];
  while (!(indices.length >= count || indices.length >= array.length)) {
    index = random_number(0, array.length);
    if (!in$(index, indices)) {
      indices.push(index);
    }
  }
  for (i$ = 0, len$ = indices.length; i$ < len$; ++i$) {
    i = indices[i$];
    results$.push(array[i]);
  }
  return results$;
};
unique_values = function(obj){
  var values, i$, len$, item, key, val, results$ = {};
  values = {};
  for (i$ = 0, len$ = obj.length; i$ < len$; ++i$) {
    item = obj[i$];
    for (key in item) {
      val = item[key];
      if (!(key in values)) {
        values[key] = {};
      }
      values[key][val] = null;
    }
  }
  for (key in values) {
    val = values[key];
    results$[key] = Object.keys(val);
  }
  return results$;
};
function in$(x, arr){
  var i = -1, l = arr.length >>> 0;
  while (++i < l) if (x === arr[i] && i in arr) return true;
  return false;
}