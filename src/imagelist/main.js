//[].map.call等同于array.prototype.map.call

[].map.call(document.getElementsByTagName('img'),function (img) {
    return img.src;
});
