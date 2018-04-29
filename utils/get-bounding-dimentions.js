module.exports = function(width, height, rotation) {
  const {
    cos,
    sin,
    abs
  } = Math;

  const widthAfterRotation = abs(width * sin(rotation)) + abs(height * cos(rotation));
  const heightAfterRotation = abs(width * cos(rotation)) + abs(height * sin(rotation));
  return {
    height: widthAfterRotation,
    width: heightAfterRotation
  };
}
