
let clientGenerator = undefined;
let queueWorker = undefined;
let officialA = undefined;
let queueOutput;
let rejectedCount = 0;


function startClientGenerator(){
    console.log("Start client generator")

    clientGenerator = new Worker("./js/clientGeneratorWorker.js");

    clientGenerator.postMessage({"lambda": parseInt(document.getElementById("lambda").value),
                                 "mean": parseInt(document.getElementById("mean").value),
                                 "variance": parseInt(document.getElementById("variance").value)
                                });

    clientGenerator.onmessage = function(event){
        queueWorker.postMessage({"command": "push", "serviceTime": event.data.serviceTime});    
    };
}


function startQueue(){
    console.log("Start queue");

    queueWorker = new Worker("./js/queueWorker.js");

    queueWorker.postMessage({"command": "init", "rejected": rejectedCount, "queueSize": parseInt(document.getElementById("queueSize").value)});

    queueWorker.onmessage = function(event){
        if(event.data.type == "pushed"){
            queueOutput.innerHTML = event.data.value;
        }
        if(event.data.type == "rejected"){
            rejected.innerHTML = "Rejected: " + event.data.value;
            rejectedCount = event.data.value;
        }
        if(event.data.type == "poped"){
            officialA.postMessage({"command": "get", "serviceTime": event.data.value})
            document.getElementById("A").innerHTML = "A: " + event.data.value;
        }
    };
}

function startOfficials(){
    console.log("Start officials");

    officialA = new Worker("./js/officialWorker.js");

    officialA.onmessage = function(event){
        if(event.data.command == "get"){
            queueWorker.postMessage({"command": "pop"});
        }
    };
}


function stopAll(){
    console.log("Stop All")
    clientGenerator.terminate();
    clientGenerator = undefined;
    queueWorker.terminate();
    queueWorker = undefined;
    officialA.terminate();
    officialA = undefined;
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
