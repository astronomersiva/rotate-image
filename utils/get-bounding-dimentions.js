module.exports = function(width, height, rotation) {
  const {
    cos,
    sin,
    abs,
  } = Math;

  /* eslint-disable max-len */
  const widthAfterRotation = abs(width * sin(rotation)) + abs(height * cos(rotation));
  const heightAfterRotation = abs(width * cos(rotation)) + abs(height * sin(rotation));
  /* eslint-enable max-len */

  return {
    height: widthAfterRotation,
    width: heightAfterRotation,
  };
};
