module.exports = function({ src, dest, rotation = 0 }) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    const Canvas = require('canvas');
    const getBoundingDimensions = require('./utils/get-bounding-dimentions');
    const { Image } = Canvas;

    const sourceImage = new Image();
    sourceImage.src = src;

    const radians = (Math.PI/180) * rotation;
    const {
      width: imageWidth,
      height: imageHeight,
    } = sourceImage;
    const {
      width,
      height,
    } = getBoundingDimensions(imageWidth, imageHeight, radians);

    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.translate(width/2, height/2);
    ctx.rotate(radians);
    ctx.translate(-width/2, -height/2);
    ctx.drawImage(
      sourceImage,
      (width/2) - (imageWidth/2),
      (height/2) - (imageHeight/2),
      imageWidth,
      imageHeight
    );

    dest = dest ? dest : `rotated-${src}`;
    const out = fs.createWriteStream(dest);
    const writeStream = canvas.pngStream();
    writeStream.on('data', (chunk) => {
      out.write(chunk);
    });

    writeStream.on('end', resolve());

    writeStream.on('error', reject(error));
  });
};
