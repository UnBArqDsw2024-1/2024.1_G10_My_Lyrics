// essas interfaces foram feitas sem muito cuidado, alterem de acordo com o que for necessário

export interface Playlist {
  id: string
  userId: string
  title: string
  description: string
  musics: Music[]
}

export interface Music {
  id: string
  albumId: string
  title: string
  youtubeUrl: string
  iconUrl: string
  album: Album
  verses: Verse[]
  playlists: Playlist[]
  likes: User[]
  musicAccess: MusicAccess[]
}

export interface Album {
  id: string
  title: string
  musics: Music[]
}

export interface Verse {
  id: string
  startTime: number
  endTime: number
  text: string
  translatedText: string
  music: Music
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  playlists: Playlist[]
}
 export interface MusicAccess {
  ip: string
  musicId: string
  date: Date
  music: Music
}

