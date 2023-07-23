export function isPasswordValid(password) {
    const spaceRegex = /\s/;
    return !spaceRegex.test(password)
}

export function isFamilyFriendly(string) {
    const inappropriateWords = [
        "nigger",
    ];

    const lowercaseString = string.toLowerCase();

    for (const word of inappropriateWords) {
        if (lowercaseString.includes(word)) {
            return false;
        }
        return true;
    } 
}

export function isAvatarUrlValid(avatarUrl) {
    return /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(avatarUrl);
}