import csv
import sys
import json

STYLE = {
    'S': 'Single',
    'D': 'Double'
}

reader = csv.reader(sys.stdin, delimiter='\t')
songs = []

for row in reader:
    song = {
        'pack': row[0],
        'difficulty': row[1],
        'style': STYLE[row[2]],
        'rating': int(row[3]),
        'title': row[4],
        'subtitle': row[5]
    }
    songs.append(song)

print('CHARTS = ' + json.dumps(songs))
