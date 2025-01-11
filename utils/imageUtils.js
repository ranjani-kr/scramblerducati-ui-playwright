async function verifyImageResolution(imageLocator, expectedWidth, expectedHeight) {
    const resolution = await imageLocator.evaluate((img) => ({
        width: img.naturalWidth,
        height: img.naturalHeight
    }));

    if (resolution.width !== expectedWidth || resolution.height !== expectedHeight) {
        throw new Error(`Image resolution mismatch. Expected: ${expectedWidth}x${expectedHeight}, Got: ${resolution.width}x${resolution.height}`);
    }

    console.log('Image resolution verified:', resolution);
}

module.exports = { verifyImageResolution };
