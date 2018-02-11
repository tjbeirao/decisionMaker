let win = false;
let total = 0;
let a = 0

module.exports = function (scores) {
    const runoff = function (scores) {
        console.log("in runoff")
        let winner = []
        let sorted = scores.sort(function (a, b) {
            return (b.score - a.score);
        })

        scores.forEach((item)=>{
            total += item.score;
        }) 
        console.log("scores ", scores)
        console.log("total", total)

        while (win === false && a < 10) {
            let counter = -1;
            for (let i in sorted) {
                counter++
            }
            if (win === false) {
                sorted[counter - 1].score += sorted[counter].score;
                sorted.splice(counter, 1);
            }

            for (let i in sorted) {
                if (sorted[i].score > total / 2) {
                    win = true;
                    winner = {id: sorted[i].id, score: sorted[i].score};
                    break;
                }
            }
            a++
        }
        console.log(winner)
        return winner;
    }
    return runoff(scores);
}




