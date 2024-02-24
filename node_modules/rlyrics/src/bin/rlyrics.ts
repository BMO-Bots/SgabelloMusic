import * as cheerio from "cheerio";
import axios, { AxiosResponse } from "axios";
import * as urls from "../constant/urls.json";
import { Artist } from "./artist";
import { Result } from "./result";
import { SearchResult } from "./searchResult";
import * as selector from "../constant/selector.json";
import { concat } from "./util";

export class Rlyrics {
    async getLyrics(query: string): Promise<string | null> {
        if (!query) throw new Error("Query is required");
        if (typeof query !== "string")
            throw new Error("Query must be a String!");
        const result = await this.find(query);
        return result ? result.lyrics : null;
    }

    async search(query: string): Promise<Array<SearchResult>> {
        if (!query) throw new Error("Invalid query");
        if (typeof query !== "string")
            throw new Error("Query must be a string.");

        const result = await this._getPageData(query, { page: "search" });

        const $ = cheerio.load(result.data);
        const s_title = $(selector.s_title);
        const s_artist = $(selector.s_artist);
        const s_icon = $(selector.s_icon);

        /**Title */
        const titles = s_title.toArray().map((x) => $(x).text());
        titles.shift();
        /**Artist */
        const artists = s_artist.toArray().map((x) => $(x).text());
        artists.shift();
        /**Href */
        const hrefs = s_title.toArray().map((x) => $(x).attr("href"));
        hrefs.shift();
        /**Icon */
        const icons = s_icon.toArray().map((x) =>
            $(x)
                .attr("srcset")
                ?.split(", ")
                .map((e) => e.split(" ")[0])
        );
        icons.shift();

        const _c = concat(titles, artists, hrefs, icons);

        return _c.map(
            (e) =>
                new SearchResult(
                    e.name,
                    e.artist,
                    e.href,
                    urls.base + e.href,
                    e.icon
                )
        );
    }

    async find(url: string): Promise<Result | null> {
        if (!url.startsWith(urls.base)) {
            const result = await this.search(url);
            if (!result.length) return null;
            const href = result[0].href;
            url = urls.base + href;
        }

        const result = await this._getPageData(url, { page: "lyrics" });

        /**Lyrics */
        const $ = cheerio.load(result.data);
        const s_lyrics = $(selector.lyrics_ok).length
            ? $(selector.lyrics_ok)
            : $(selector.lyrics_error);
        const lyrics = s_lyrics
            .toArray()
            .map((x) => $(x).text())
            .join("\n");

        /**Icon */
        const s_icon = $(selector.icon);
        const icon = s_icon.length ? "https:" + s_icon.attr("src") : null;

        /**Name */
        const s_name = $(selector.name);
        const name = s_name.length
            ? s_name.children().remove().end().text()
            : null;

        /**Artist */
        const s_artist = $(selector.artist_1).length
            ? $(selector.artist_1)
            : $(selector.artist_2);
        const artist = s_artist.length
            ? s_artist
                  .toArray()
                  .map(
                      (x) =>
                          new Artist(
                              $(x).children().text(),
                              urls.base + $(x).children().attr("href")
                          )
                  )
            : null;

        return new Result(name, artist, icon, lyrics);
    }

    async _getPageData(
        query: string,
        options: { page: "lyrics" | "search" }
    ): Promise<AxiosResponse> {
        let destination = "";
        if (options.page === "lyrics") destination = encodeURI(query);
        if (options.page === "search") destination = urls.search + query.replace("/ +/g", "%20");

        try {
            var result = await axios.get(destination);
        } catch (e) {
            throw new Error("Request Failed.\n" + e);
        }

        return result;
    }
}
