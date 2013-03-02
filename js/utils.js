var random_number, random_items, random_item, unique_values, weighted_random_item;
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
random_item = function(array){
  var index;
  index = random_number(0, array.length);
  return array[index];
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
weighted_random_item = function(array){
  var item_list, i$, len$, item, j$, to$, x;
  item_list = [];
  for (i$ = 0, len$ = array.length; i$ < len$; ++i$) {
    item = array[i$];
    for (j$ = 0, to$ = item['weight']; j$ < to$; ++j$) {
      x = j$;
      item_list.push(item['item']);
    }
  }
  return random_item(item_list);
};
function in$(x, arr){
  var i = -1, l = arr.length >>> 0;
  while (++i < l) if (x === arr[i] && i in arr) return true;
  return false;
}