random_number = (min, max) ->
    Math.floor((Math.random() * (max - min))) + min

random_items = (array, count) ->
    indices = []
    until indices.length >= count or indices.length >= array.length
        index = random_number 0 array.length
        if index not in indices
            indices.push index
    [array[i] for i in indices]

random_item = (array) ->
    index = random_number 0 array.length
    array[index]

unique_values = (obj) ->
    values = {}
    for item in obj
        for key, val of item
            if key not of values
                values[key] = {}
            values[key][val] = null
    {[key, Object.keys val] for key, val of values}

weighted_random_item = (array) ->
    item_list = []
    for item in array
        for x til item['weight']
            item_list.push item['item']
    random_item item_list
