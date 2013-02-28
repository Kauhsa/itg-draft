filter_songs = (songs, packs=null, difficulties=null, style=null, ratings=null, titles=null) ->
    filtered_songs = []
    for song in songs
        if packs != null and song.pack not in packs
            continue
        if difficulties != null and song.difficulty not in difficulties
            continue
        if styles != null and song.style not in styles
            continue
        if ratings != null and song.rating not in ratings
            continue
        if titles != null and song.title not in titles
            continue
        filtered_songs += [song]
    filtered_songs

random_songs = (songs, count) ->
    random_number = (min, max) ->
        Math.floor (Math.random * (max - min)) + min

    indices = []
    do
        index = random_number 0 songs.length
        if index not in indices
            indices += [index]
    until indices.length >= count or indices.length >= songs.length

    [songs[i] for i in indices]
