import csv
import sys
import json

DIFF_NUM = {
    'N': 0,
    'E': 1,
    'M': 2,
    'H': 3,
    'X': 4
}

DIFF_LABELS = {
    0: 'Novice',
    1: 'Easy',
    2: 'Medium',
    3: 'Hard',
    4: 'Expert'
}

STYLE_NUM = {
    'S': 0,
    'D': 1
}

STYLE_LABELS = {
    0: 'Single',
    1: 'Double'
}

reader = csv.reader(sys.stdin, delimiter='\t')
songs = []

for row in reader:
    song = {
        'pack': row[0],
        'difficulty': DIFF_NUM[row[1]],
        'style': STYLE_NUM[row[2]],
        'rating': int(row[3]),
        'title': row[4],
        'subtitle': row[5]
    }
    songs.append(song)

data = {
    'charts': songs,
    'labels': {
        'style': STYLE_LABELS,
        'difficulty': DIFF_LABELS
    }
}

print('CHARTDATA = ' + json.dumps(data))
