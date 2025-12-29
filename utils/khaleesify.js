const { vocab } = require('./vocab');

const khaleesify = (text) => {
  const complexKeys = Object.keys(vocab.complex);
  const getComplexified = text.split(' ').map((word) => {
    let complexified = word;

    complexKeys.forEach((key) => {
      if (complexified.includes(key)) {
        complexified = complexified.split(key).join(vocab.complex[key]);
      }
    });

    return complexified;
  });

  return getComplexified.join(' ').replace(/ {2,}/g, ' ');
};

module.exports = { khaleesify };
