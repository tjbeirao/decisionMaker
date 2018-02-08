const randomize = require('randomatic');

module.exports = function (type) {
    function getUrl() {
        return randomize('aA0', 16)
    }
    
    if (type == 'user'){
        let newUrl = (`http://localhost:8080/survey/${getUrl()}`)
        return newUrl;
    } else if (type == 'admin') {
        let newUrl = (`http://localhost:8080/admin/${getUrl()}`)
        return newUrl;
    }
}
