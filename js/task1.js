
function exponential_dist(x, lambda){
    return lambda * Math.exp(-lambda * x)
}

function normal_dist(x, m, delta_2){
    let numerator = Math.exp((-Math.pow(x - m, 2))/(2*delta_2))
    let denominator = Math.sqrt(2 * Math.PI * delta_2)
    return numerator/denominator
}

function simulation(){
    console.log(normal_dist(-2, -2, 0.5))    
}
