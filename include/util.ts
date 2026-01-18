

function randomNumber(numBits: number, includeNegative: boolean, limitToBounds: boolean): number {
    let subtract = 0;
    let randomValue = 0;
    if(limitToBounds) {
        randomValue = Math.floor(Math.random() * Math.min(4096,Math.pow(2, numBits)));
        subtract = Math.min(2048,Math.pow(2, numBits - 1));
    } else {
        randomValue = Math.floor(Math.random() * (Math.min(4096, Math.pow(2, numBits)) + 50) );
        subtract = Math.min(2048, Math.pow(2, numBits - 1)) + 25 ;
    }
    if(includeNegative) {
        randomValue -= subtract;
    }
    return randomValue;
}
