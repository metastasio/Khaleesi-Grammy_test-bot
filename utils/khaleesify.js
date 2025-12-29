const { vocab } = require('./vocab');

const khaleesify = (text) => {
  const vocabKeys = Object.keys(vocab);
  const modifiedText = text.split(' ').map((word) => {
    let modifiedWord = word;

    vocabKeys.forEach((key) => {
      if (modifiedWord.includes(key)) {
        modifiedWord = modifiedWord.split(key).join(vocab[key]);
      }
    });

    return modifiedWord;
  });

  return modifiedText.join(' ').replace(/ {2,}/g, ' ');
};

module.exports = { khaleesify };
