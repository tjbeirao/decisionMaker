const randomize = require('randomatic');

module.exports = function () {
    function getUrl() {
        return randomize('aA0', 16)
    }
    
    const newUrl = getUrl();
    return newUrl;
}
