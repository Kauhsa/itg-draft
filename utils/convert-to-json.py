import csv
import sys
import json

reader = csv.reader(sys.stdin, delimiter='\t')
songs = []

for row in reader:
    song = {
        'name': row[0],
        'difficulty': row[1],
        'style': row[2],
        'block': row[3],
        'title': row[4],
        'subtitle': row[5]
    }
    songs.append(song)

print(json.dumps(songs, sort_keys=True, indent=4))
