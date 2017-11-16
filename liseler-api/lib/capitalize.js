const capitalize = str => {
  const words = str.split(' ');
  const capitalizedWords = words.map(word => {
    const trimmedWord = word.trim();

    if (trimmedWord.length === 0) {
      return '';
    }

    const firstLetter = trimmedWord[0].toLocaleUpperCase('tr');
    const rest = trimmedWord.slice(1).toLocaleLowerCase('tr');

    return `${firstLetter}${rest}`;
  });

  return capitalizedWords.join(' ');
};

module.exports = capitalize;
