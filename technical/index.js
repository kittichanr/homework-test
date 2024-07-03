function longestCommonPrefix(input) {
    let pref = input[0]
    let prefLen = pref.length;

    for (let i = 1; i < input.length; i++) {
        let s = input[i]
        while (pref !== s.substring(0, prefLen)) {
            prefLen--
            if (prefLen === 0) {
                return ""
            }
            pref = pref.substring(0, prefLen)
        }
    }
    return pref
}

const input1 = longestCommonPrefix(["flower", "flow", "flight"])
console.log(input1);
const input2 = longestCommonPrefix(["dog", "racecar", "car"])
console.log(input2);
