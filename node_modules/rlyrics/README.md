# Rlyrics
A module that allows users to scrape song lyrics from musixmatch.

## Requirements
* Node.js

## Installation

```bash
npm i rlyrics
```

## Usage

```javascript
const { Rlyrics } = require("rlyrics");
const rlyrics = new Rlyrics();

// Define Query
const query = "Alan walker - Alone"
const url = "https://www.musixmatch.com/lyrics/Alan-Walker-3/Alone"

// #getLyrics Method - Get lyrics of the best result
rlyrics.getLyrics(query)

// #search Method - Search for songs
rlyrics.search(query)

// #find Method - Get detailed datas of the best result
rlyrics.find(url) 
```

## Example Response
```javascript
// Search Result
[
  SearchResult {
    title: 'Alone',
    artist: 'Alan Walker',
    href: '/lyrics/Alan-Walker-3/Alone',
    url: 'https://www.musixmatch.com/lyrics/Alan-Walker-3/Alone',
    icon: [
      'https://s.mxmcdn.net/images-storage/albums4/0/6/5/4/3/7/36734560.jpg',
      'https://s.mxmcdn.net/images-storage/albums4/0/6/5/4/3/7/36734560_350_350.jpg',
      'https://s.mxmcdn.net/images-storage/albums4/0/6/5/4/3/7/36734560_350_350.jpg',
      'https://s.mxmcdn.net/images-storage/albums4/0/6/5/4/3/7/36734560_350_350.jpg'
    ]
  },
  SearchResult {
    title: 'Alan Walker (I)',
    artist: 'RamiKz',
    href: '/lyrics/RamiKz/Alan-Walker-I',
    url: 'https://www.musixmatch.com/lyrics/RamiKz/Alan-Walker-I',
    icon: [
      'https://s.mxmcdn.net/images-storage/albums4/0/2/0/4/3/4/40434020.jpg',
      'https://s.mxmcdn.net/images-storage/albums4/0/2/0/4/3/4/40434020_350_350.jpg',
      'https://s.mxmcdn.net/images-storage/albums4/0/2/0/4/3/4/40434020_350_350.jpg',
      'https://s.mxmcdn.net/images-storage/albums4/0/2/0/4/3/4/40434020_350_350.jpg'
    ]
  }, ... 
]

// Result
Result {
  name: 'Alone',
  artist: [
    Artist {
      name: 'Alan Walker',
      url: 'https://www.musixmatch.com/artist/Alan-Walker-3'
    }
  ],
  icon: 'https://s.mxmcdn.net/images-storage/albums4/0/6/5/4/3/7/36734560_350_350.jpg',
  lyrics: 'Lost in your mind\n' +
    'I wanna know\n' +
    'Am I losing my mind?\n' +
    'Never let me go\n' +
    '\n' +
    'If this night is not forever\n' +
    'At least we are together\n' +
    'I know I′m not alone\n' +
    "I know I'm not alone\n"
   ...
}
```

## Dependencies
* axios
* cheerio

## License
[MIT](https://choosealicense.com/licenses/mit/)
