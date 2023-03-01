type Image = {
  "#text": string
  size: string
}

export type Track = {
  "@attr": { rank: string }
  artist: {
    mbid: string
    name: string
    url: string
  }
  duration: string
  image: Image[]
  mbid: string
  name: string
  playcount: string
  streamable: {
    "#text": string
    fulltrack: string
  }
  url: string
}

export type Album = {
  artist: {
    mbid: string
    name: string
    url: string
  }
  image: Image[]
  mbid: string
  url: string
  playcount: string
  "@attr": { rank: string }
  name: string
}

export type Artist = {
  streamable: string
  image: Image[]
  mbid: string
  url: string
  playcount: string
  "@attr": { rank: string }
  name: string
}