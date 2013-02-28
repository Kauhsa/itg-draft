var ITGRandom;
ITGRandom = (function(){
  ITGRandom.displayName = 'ITGRandom';
  var prototype = ITGRandom.prototype, constructor = ITGRandom;
  function ITGRandom(songdata){
    this.songdata = songdata;
  }
  prototype.songs_between_ratings = function(start_rating, end_rating){
    var i$, ref$, len$, song, ref1$, results$ = [];
    for (i$ = 0, len$ = (ref$ = this.songdata).length; i$ < len$; ++i$) {
      song = ref$[i$];
      if (start_rating <= (ref1$ = song.rating) && ref1$ <= end_rating) {
        results$.push(song);
      }
    }
    return results$;
  };
  return ITGRandom;
}());