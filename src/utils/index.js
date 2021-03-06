const removeLastWord = text => {
    const words = text.split(' ');
    words.pop();
    return words.join(' ');
}

const replaceLastWord = (text, replacement) => {
    return replacement ? (removeLastWord(text) + replacement) : text;
}

export {removeLastWord, replaceLastWord};
