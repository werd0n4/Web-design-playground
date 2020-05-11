
let available = true;
let serviceTime = 0;
let id;

function service(){
    postMessage({"command": "get"});
}

function init(letter){
    id = letter;
    service();
}

self.onmessage = function(event){
    if(event.data.command == "init"){
        init(event.data.id);
    }
    if(event.data.command == "get"){
        setTimeout("service()", event.data.serviceTime);
    }
};


// service();