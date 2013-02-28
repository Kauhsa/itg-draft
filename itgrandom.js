var filter_songs, random_songs;
filter_songs = function(songs, packs, difficulties, style, ratings, titles){
  var filtered_songs, i$, len$, song;
  packs == null && (packs = null);
  difficulties == null && (difficulties = null);
  style == null && (style = null);
  ratings == null && (ratings = null);
  titles == null && (titles = null);
  filtered_songs = [];
  for (i$ = 0, len$ = songs.length; i$ < len$; ++i$) {
    song = songs[i$];
    if (packs !== null && !in$(song.pack, packs)) {
      continue;
    }
    if (difficulties !== null && !in$(song.difficulty, difficulties)) {
      continue;
    }
    if (styles !== null && !in$(song.style, styles)) {
      continue;
    }
    if (ratings !== null && !in$(song.rating, ratings)) {
      continue;
    }
    if (titles !== null && !in$(song.title, titles)) {
      continue;
    }
    filtered_songs += [song];
  }
  return filtered_songs;
};
random_songs = function(songs, count){
  var random_number, indices, index, i$, len$, i, results$ = [];
  random_number = function(min, max){
    return Math.floor(Math.random * (max - min) + min);
  };
  indices = [];
  do {
    index = random_number(0, songs.length);
    if (!in$(index, indices)) {
      indices += [index];
    }
  } while (!(indices.length >= count || indices.length >= songs.length));
  for (i$ = 0, len$ = indices.length; i$ < len$; ++i$) {
    i = indices[i$];
    results$.push(songs[i]);
  }
  return results$;
};
function in$(x, arr){
  var i = -1, l = arr.length >>> 0;
  while (++i < l) if (x === arr[i] && i in arr) return true;
  return false;
}