import { AxiosResponse } from "axios";
import { Result } from "./result";
import { SearchResult } from "./searchResult";
export declare class Rlyrics {
    getLyrics(query: string): Promise<string | null>;
    search(query: string): Promise<Array<SearchResult>>;
    find(url: string): Promise<Result | null>;
    _getPageData(query: string, options: {
        page: "lyrics" | "search";
    }): Promise<AxiosResponse>;
}
