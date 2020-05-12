
let clientGenerator = undefined;
let queueWorker = undefined;
let officialA = undefined;
let officialB = undefined;
let officialC = undefined;
let queueOutput;
let rejectedCount = 0;
let saveArray = [];

let lambda;
let mean;
let variance;


function startClientGenerator(){
    console.log("Start client generator")

    lambda = parseFloat(document.getElementById("lambda").value);
    mean = parseFloat(document.getElementById("mean").value);
    variance = parseFloat(document.getElementById("variance").value);


    // console.log(lambda);
    clientGenerator = new Worker("./js/clientGeneratorWorker.js");

    clientGenerator.postMessage({"lambda": lambda,
                                 "mean": mean,
                                 "variance": variance 
                                });

    clientGenerator.onmessage = function(event){
        queueWorker.postMessage({"command": "push", "serviceTime": event.data.serviceTime});    
    };
}


function startQueue(){
    console.log("Start queue");

    queueWorker = new Worker("./js/queueWorker.js");

    queueWorker.postMessage({"command": "init", "rejected": rejectedCount,"saveArray":saveArray, "queueSize": parseInt(document.getElementById("queueSize").value)});

    queueWorker.onmessage = function(event){
        if(event.data.type == "pushed"){
            queueOutput.innerHTML = event.data.value;
            saveArray = event.data.value;
        }
        if(event.data.type == "rejected"){
            rejected.innerHTML = "Rejected: " + event.data.value;
            rejectedCount = event.data.value;
        }
        if(event.data.type == "poped"){
            if(event.data.id == "A"){
                officialA.postMessage({"command": "get", "serviceTime": event.data.value})
                document.getElementById("A").innerHTML = "A: " + event.data.value;
            }
            if(event.data.id == "B"){
                officialB.postMessage({"command": "get", "serviceTime": event.data.value})
                document.getElementById("B").innerHTML = "B: " + event.data.value;
            }
            if(event.data.id == "C"){
                officialC.postMessage({"command": "get", "serviceTime": event.data.value})
                document.getElementById("C").innerHTML = "C: " + event.data.value;
            }
        }
    };
}

function startOfficials(){
    console.log("Start officials");

    officialA = new Worker("./js/officialWorker.js");
    officialB = new Worker("./js/officialWorker.js");
    officialC = new Worker("./js/officialWorker.js");

    officialA.postMessage({"command": "init", "id": "A"});
    officialB.postMessage({"command": "init", "id": "B"});
    officialC.postMessage({"command": "init", "id": "C"});

    officialA.onmessage = function(event){
        if(event.data.command == "get"){
            queueWorker.postMessage({"command": "pop", "id": "A"});
        }
    };
    officialB.onmessage = function(event){
        if(event.data.command == "get"){
            queueWorker.postMessage({"command": "pop", "id": "B"});
        }
    };
    officialC.onmessage = function(event){
        if(event.data.command == "get"){
            queueWorker.postMessage({"command": "pop", "id": "C"});
        }
    };
}

function stopAll(){
    console.log("Stop All");
    clientGenerator.terminate();
    clientGenerator = undefined;
    queueWorker.terminate();
    queueWorker = undefined;
    officialA.terminate();
    officialA = undefined;
    officialB.terminate();
    officialB = undefined;
    officialC.terminate();
    officialC = undefined;
}

function simulation(){
    queueOutput = document.getElementById("queue");
    rejected = document.getElementById("rejected");
    rejectedNumb = 0;

    document.getElementById("start").addEventListener("click", function(){
        console.log("Start");
        startClientGenerator();
        startQueue();
        startOfficials();
    });

    document.getElementById("stop").addEventListener("click", function(){
        console.log("Stop");
        stopAll();
    });
}
