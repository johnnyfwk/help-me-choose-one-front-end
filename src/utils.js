export function isPasswordValid(password) {
    const spaceRegex = /\s/;
    return !spaceRegex.test(password)
}