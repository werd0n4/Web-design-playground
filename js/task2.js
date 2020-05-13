
let N;
let S;
let T;
let worker = undefined;

function shuffle(arra1) {
    let ctr = arra1.length, temp, index;
    // While there are elements in the array
    while (ctr > 0) {
    // Pick a random index
        index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
        ctr--;
    // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function randomRaft(){
    let arr = []
    for(i = 1; i<=N;i++){
        for(j = 1; j<=N;j++){
            if(Math.random() < 0.25){
                arr.push(i.toString() + String.fromCharCode(j+64) );
            }
        }
    }
    arr = shuffle(arr);
    // console.log(arr);
    let s = arr.slice(0, 2/3*arr.length).join();
    let t = arr.slice(2/3*arr.length).join();
    // console.log(s);
    // console.log(t);
    return [s, t];
}

function draft(){
    let values = randomRaft();
    S = values[0];
    T = values[1];

    if(worker == undefined)
        worker = new Worker('./js/raftingWorker.js');
    else{
        worker.terminate();
        worker = new Worker('./js/raftingWorker.js');
    }
    worker.postMessage({"N": N, "S": S, "T": T});

    worker.onmessage = function(event){
        document.getElementById("barrels").innerHTML = "<p>Barrels: " + S + "</p>";
        document.getElementById("dwarfs").innerHTML = "<p>Dwarfs: " + T + "</p>";
        document.getElementById("result").innerHTML = "<p>Result: " + event.data.result + "</p>";
    };
}

function start(){
    document.getElementById("start").addEventListener("click", function(){
        console.log("Start");
        N = parseInt(document.getElementById("raftSize").value);
        draft();
    });
}