export function concat(
    titles: Array<string>,
    artists: Array<string>,
    hrefs: Array<string | undefined>,
    icons: Array<string[] | undefined>
) {
    return titles.map((title, i) => {
        return {
            name: title,
            artist: artists[i],
            href: hrefs[i],
            icon: icons[i],
        };
    });
}
