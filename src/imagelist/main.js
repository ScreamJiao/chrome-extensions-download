// [].map.call(document.getElementsByTagName('img'),function (img) {
//     return img.src;
// });

Array.prototype.map.call(document.getElementsByTagName('img'),function (img) {
    return img.src;
});
