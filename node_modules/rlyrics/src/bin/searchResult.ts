import { Artist } from "./artist";

export class SearchResult {
    title: string | null;
    artist: string | null;
    href: string | undefined;
    url: string | null;
    icon: string[] | undefined;
    constructor(
        title: string | null,
        artist: string | null,
        href: string | undefined,
        url: string | null,
        icon: string[] | undefined
    ) {
        this.title = title;
        this.artist = artist;
        this.href = href;
        this.url = url;
        this.icon = icon;
    }
}
