let win = false;
let total = 0;
let a = 0

module.exports = function (scores) {
    const runoff = function (scores) {
        let winner = []
        let sorted = scores.sort(function (a, b) {
            return (b.value - a.value);
        })

        scores.forEach((item)=>{
            total += item.value;
        }) 

        while (win === false && a < 10) {
            let counter = -1;
            for (let i in sorted) {
                counter++
            }

            if (win === false) {
                sorted[counter - 1].value += sorted[counter].value;
                sorted.splice(counter, 1);
            }

            for (let i in sorted) {
                if (sorted[i].value > total / 2) {
                    win = true;
                    winner = sorted[i];
                    break;
                }
            }
            a++
        }
        return winner;
    }
    return runoff(scores);
}




