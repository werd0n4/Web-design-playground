
let lambda = 0;
let mean = 0;
let variance = 0;

function exponential_dist(){
    return 1000;
}

function normal_dist(m, delta_2){
    return 3000; 
}

function generateClient(){
    postMessage({"serviceTime": normal_dist()});
    
    setTimeout(generateClient(), exponential_dist());
}

self.onmessage = function(event){
    lambda = event.data.lambda;
    mean = event.data.mean;
    variance = event.data.variance;
    generateClient();    
}