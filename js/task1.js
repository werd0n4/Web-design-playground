
let clientGenerator = undefined;
let queue = undefined;
let officialA = undefined;
let officialB = undefined;
let officialC = undefined;


function startClientGenerator(){
    console.log("Start client generator")

    clientGenerator = new Worker("./js/clientGeneratorWorker.js");

    clientGenerator.postMessage({"lambda": parseInt(document.getElementById("lambda").value),
                                 "mean": parseInt(document.getElementById("mean").value),
                                 "variance": parseInt(document.getElementById("variance").value)
                                });

    clientGenerator.onmessage = function(event){

    };
}

function startQueue(){
    console.log("Start queue");

}

function startOfficials(){
    if(typeof(clientGenerator) == "undefined"){
        officialA = new Worker("./js/officialWorker.js");
    }
    if(typeof(clientGenerator) == "undefined"){
        officialB = new Worker("./js/officialWorker.js");
    }
    if(typeof(clientGenerator) == "undefined"){
        officialC = new Worker("./js/officicalWorker.js");
    }

}

function stopClientGenerator(){
    console.log("Stop client generator")
    clientGenerator.terminate();
    clientGenerator = undefined;
}

function simulation(){

    document.getElementById("start").addEventListener("click", function(){
        console.log("Start");
        startClientGenerator();
        startQueue();
        startOfficials();
    });

    document.getElementById("stop").addEventListener("click", function(){
        console.log("Stop");
        stopClientGenerator();
    });


}
