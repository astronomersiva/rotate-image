module.exports = function(imageSrc, rotation = 1) {
  const fs = require('fs');
  const Canvas = require('canvas');
  const getBoundingDimensions = require('./utils/get-bounding-dimentions');
  const { Image } = Canvas;

  const sourceImage = new Image();
  sourceImage.src = imageSrc;

  rotation = 90;
  const radians = (Math.PI/180) * rotation;

  const { width, height } = getBoundingDimensions(sourceImage.width, sourceImage.height, radians);
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext('2d');
  console.log(sourceImage.width, sourceImage.height);
  console.log(width, height);

  ctx.rotate(radians);

  ctx.drawImage(sourceImage, 0, 0);

  const out = fs.createWriteStream('./output.png');
  const writeStream = canvas.pngStream();
  writeStream.on('data', function(chunk) {
    out.write(chunk);
  });
  
  writeStream.on('end', async function() {
    console.log('saved png');
  });
}
