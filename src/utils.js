export function isPasswordValid(password) {
    const spaceRegex = /\s/;
    return !spaceRegex.test(password)
}

export function isFamilyFriendly(string) {
    const inappropriateWords = [
        "nigger",
        "fuck",
        "cunt"
    ];

    const lowercaseString = string.toLowerCase();

    for (const word of inappropriateWords) {
        if (lowercaseString.includes(word)) {
            return false;
        }
        return true;
    } 
}

export function isImageUrlValid(imageUrl) {
    return /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif|bmp|webp|svg))/i.test(imageUrl) && !/\s+/.test(imageUrl);
}

export function convertUrlsToUserFriendlyHeadings(url) {
    if (url === "tv-and-movies") {
        return "TV & Movies";
    }
    const arrayOfCapitalisedWords = url.split("-").map((word) => {
        if (word === "and") {
            return "&";
        }
        else {
            return word[0].toUpperCase() + word.slice(1);
        }
    })
    const userFriendlyHeadings = arrayOfCapitalisedWords.join(" ");
    return userFriendlyHeadings;
}

export function convertCategoryToUrl(category) {
    return category.replaceAll("&", "and").replaceAll(" ", "-").replaceAll(",", "").toLowerCase();
}

export function convertTitleToUrl(title) {
    return title
        .replaceAll(" ", "-")
        .replaceAll("&", "and")
        .replaceAll("?", "")
        .replaceAll("!", "")
        .replaceAll("@", "")
        .replaceAll("#", "")
        .replaceAll("£", "")
        .replaceAll("$", "")
        .replaceAll("€", "")
        .replaceAll("¥", "")
        .replaceAll("%", "")
        .replaceAll("^", "")
        .replaceAll("*", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("+", "")
        .replaceAll("=", "")
        .replaceAll("\\", "")
        .replaceAll("/", "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll("{", "")
        .replaceAll("}", "")
        .replaceAll(";", "")
        .replaceAll(":", "")
        .replaceAll(".", "")
        .replaceAll("'", "")
        .replaceAll("\"", "")
        .replaceAll(",", "")
        .replaceAll("<", "")
        .replaceAll(">", "")
        .replaceAll("|", "")
        .toLowerCase();
}