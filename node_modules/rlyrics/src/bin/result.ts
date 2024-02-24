export class Result {
    name: string | null;
    artist: Array<object> | null;
    icon: string | null;
    lyrics: string | null;
    constructor(
        name: string | null,
        artist: Array<object> | null,
        icon: string | null,
        lyrics: string | null
    ) {
        this.name = name;
        this.artist = artist;
        this.icon = icon;
        this.lyrics = lyrics;
    }
}
