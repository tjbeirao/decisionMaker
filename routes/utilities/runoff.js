
module.exports = function (type) {

    const runoff = function (scores) {
        let win = false;
        let total = 0;
        let a = 0
        
        let sorted = scores.sort(function (a, b) {
            return (b.value - a.value); 
        })
    
        for (var i = 0; i < scores.length; i++) {
            total += scores[i].value;
        }
        
        while (win == false && a < 10) {
            let counter = -1;
            for (let i in sorted) {
                counter++
            }
            
            if (win === false) {
                sorted[counter - 1].value += sorted[counter].value
                sorted.splice(counter, 1);
            }

            for (let i in sorted) {
                if (sorted[i].value > total / 2) {
                    return win = true
                }
            }
            a++
        }

    }

}




