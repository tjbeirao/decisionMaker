const randomize = require('randomatic');

module.exports = function (type) {
    function getUrl() {
        return randomize('aA0', 16)
    }
    
    if (type == user){
        const newUrl = getUrl();
        newUrl = (`http://localhost:8080/decidekick/survey/${type}`)
        return newUrl;
    } else if (type == admin) {
        const newUrl = getUrl();
        newUrl = (`http://localhost:8080/decidekick/admin/${type}`)
        return newUrl;
    }
}
