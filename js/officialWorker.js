
let available = true;
let serviceTime = 0;

function service(){
    postMessage({"command": "get"});
}

self.onmessage = function(event){
    if(event.data.command == "get"){
        setTimeout("service()", event.data.serviceTime);
    }
};

service();