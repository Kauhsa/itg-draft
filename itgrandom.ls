class ITGRandom
    (songdata) ->
        @songdata = songdata

    songs_between_ratings: (start_rating, end_rating) ->
        [song for song in @songdata when start_rating <= song.rating <= end_rating]

