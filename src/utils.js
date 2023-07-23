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