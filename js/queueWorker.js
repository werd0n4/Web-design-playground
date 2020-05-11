
let slots = 0;
let rejected = 0;
let array = []

function pop(){
    let poped = array.shift();
    postMessage({"type": "poped", "value": poped});
}

function push(serviceTime){
    if(array.length < slots){
        array.push(serviceTime);
        postMessage({"type": "pushed", "value": array});
    }
    else{
        ++rejected;
        postMessage({"type": "rejected", "value": rejected});
    }
}

self.onmessage = function(event){
    if(event.data.command == "init"){
        slots = event.data.queueSize;
        rejected = event.data.rejected;
        return;
    }

    if(event.data.command == "push"){
        push(event.data.serviceTime);
    }

    if(event.data.command == "pop"){
        pop();
    }

    if(event.data.command == "getQueue"){
        postMessage({"type": "getQueue", "value": array});
    }

    if(event.data.command == "getRejected"){
        postMessage({"type": "getRejected", "value": rejected});
    }
}