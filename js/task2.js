
function solution(N, S, T){
    let result = 0;
    let emptyS = false;
    let emptyT = false;
   
    if(!S)
        emptyS = true;
    if(!T)
        emptyT = true;

    S = S.split(' ');
    T = T.split(' ');

    let top_left_free = Math.pow(N/2, 2);
    let top_right_free = Math.pow(N/2, 2);
    let bot_left_free = Math.pow(N/2, 2);
    let bot_right_free = Math.pow(N/2, 2);

    let top_left_dwarfs = 0;
    let top_right_dwarfs = 0;
    let bot_left_dwarfs = 0;
    let bot_right_dwarfs = 0;

    //barrels
    if(!emptyS){
        S.forEach( (elem) => {
            let row = elem.split('')[0] - 1;
            let col = elem.split('')[1].charCodeAt() - 65;

            if(row < N/2 && col < N/2)
                --top_left_free;
            if(row < N/2 && col >= N/2)
                --top_right_free;
            if(row >= N/2 && col < N/2)
                --bot_left_free;
            if(row >= N/2 && col >= N/2)
                --bot_right_free;
        });
    }

    //dwarfs
    if(!emptyT){
        T.forEach( (elem) => {
            let row = elem.split('')[0] - 1;
            let col = elem.split('')[1].charCodeAt() - 65;

            if(row < N/2 && col < N/2){
                --top_left_free;
                ++top_left_dwarfs;
            }
            if(row < N/2 && col >= N/2){
                --top_right_free;
                ++top_right_dwarfs;
            }
            if(row >= N/2 && col < N/2){
                --bot_left_free;
                ++bot_left_dwarfs;
            }
            if(row >= N/2 && col >= N/2){
                --bot_right_free;
                ++bot_right_dwarfs;
            }
        });
    }

    
    let diag1 = Math.min(top_left_dwarfs + top_left_free, bot_right_dwarfs + bot_right_free);
    let diag2 = Math.min(top_right_dwarfs + top_right_free, bot_left_dwarfs + bot_left_free);

    if(top_left_dwarfs > diag1 || bot_right_dwarfs > diag1 || top_right_dwarfs > diag2 || bot_left_dwarfs > diag2)
        return -1

    let add_top_left = 0;
    let add_top_right = 0;
    let add_bot_left = 0;
    let add_bot_right = 0;

    add_top_left = diag1 - top_left_dwarfs;
    add_top_right = diag2 - top_right_dwarfs;
    add_bot_left = diag2 - bot_left_dwarfs;
    add_bot_right = diag1 - bot_right_dwarfs;
    console.log(top_left_free);
    return add_top_left + add_top_right + add_bot_left + add_bot_right;
}

console.log(solution(8, '1B 1A 2A', '3C 4C'));