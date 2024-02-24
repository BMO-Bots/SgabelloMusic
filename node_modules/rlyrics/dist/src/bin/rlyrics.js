"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rlyrics = void 0;
const cheerio = __importStar(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const urls = __importStar(require("../constant/urls.json"));
const artist_3 = require("./artist");
const result_1 = require("./result");
const searchResult_1 = require("./searchResult");
const selector = __importStar(require("../constant/selector.json"));
const util_1 = require("./util");
class Rlyrics {
    getLyrics(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query)
                throw new Error("Query is required");
            if (typeof query !== "string")
                throw new Error("Query must be a String!");
            const result = yield this.find(query);
            return result ? result.lyrics : null;
        });
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query)
                throw new Error("Invalid query");
            if (typeof query !== "string")
                throw new Error("Query must be a string.");
            const result = yield this._getPageData(query, { page: "search" });
            const $ = cheerio.load(result.data);
            const s_title = $(selector.s_title);
            const s_artist = $(selector.s_artist);
            const s_icon = $(selector.s_icon);
            const titles = s_title.toArray().map((x) => $(x).text());
            titles.shift();
            const artists = s_artist.toArray().map((x) => $(x).text());
            artists.shift();
            const hrefs = s_title.toArray().map((x) => $(x).attr("href"));
            hrefs.shift();
            const icons = s_icon.toArray().map((x) => {
                var _a;
                return (_a = $(x)
                    .attr("srcset")) === null || _a === void 0 ? void 0 : _a.split(", ").map((e) => e.split(" ")[0]);
            });
            icons.shift();
            const _c = (0, util_1.concat)(titles, artists, hrefs, icons);
            return _c.map((e) => new searchResult_1.SearchResult(e.name, e.artist, e.href, urls.base + e.href, e.icon));
        });
    }
    find(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!url.startsWith(urls.base)) {
                const result = yield this.search(url);
                if (!result.length)
                    return null;
                const href = result[0].href;
                url = urls.base + href;
            }
            const result = yield this._getPageData(url, { page: "lyrics" });
            const $ = cheerio.load(result.data);
            const s_lyrics = $(selector.lyrics_ok).length
                ? $(selector.lyrics_ok)
                : $(selector.lyrics_error);
            const lyrics = s_lyrics
                .toArray()
                .map((x) => $(x).text())
                .join("\n");
            const s_icon = $(selector.icon);
            const icon = s_icon.length ? "https:" + s_icon.attr("src") : null;
            const s_name = $(selector.name);
            const name = s_name.length
                ? s_name.children().remove().end().text()
                : null;
            const s_artist = $(selector.artist_1).length
                ? $(selector.artist_1)
                : $(selector.artist_2);
            const artist = s_artist.length
                ? s_artist
                    .toArray()
                    .map((x) => new artist_3.Artist($(x).children().text(), urls.base + $(x).children().attr("href")))
                : null;
            return new result_1.Result(name, artist, icon, lyrics);
        });
    }
    _getPageData(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let destination = "";
            if (options.page === "lyrics")
                destination = encodeURI(query);
            if (options.page === "search")
                destination = urls.search + query.replace("/ +/g", "%20");
            try {
                var result = yield axios_1.default.get(destination);
            }
            catch (e) {
                throw new Error("Request Failed.\n" + e);
            }
            return result;
        });
    }
}
exports.Rlyrics = Rlyrics;
