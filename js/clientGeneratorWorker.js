
let lambda = 0.0;
let mean = 0.0;
let variance = 0.0;
let timeBetweenNewClients = 0.0;
let serviceTime = 0.0;

function exponential_dist(){
    let result = -Math.log(1 - Math.random())/lambda;
    return result;
}

function normal_dist(){
    let u1 = Math.random();
    let u2 = Math.random();

    let z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    
    return Math.floor(z1 * Math.sqrt(variance) + mean);
}

function generateClient(){
    timeBetweenNewClients = exponential_dist();
    serviceTime = normal_dist();

    postMessage({"serviceTime": serviceTime});
    setTimeout(generateClient, timeBetweenNewClients);//or "generateClient()"
}

self.onmessage = function(event){
    lambda = event.data.lambda;
    mean = event.data.mean;
    variance = event.data.variance;
    generateClient();    
}