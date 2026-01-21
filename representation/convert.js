
RepOptions = ["b10", "b16", "b2u", "b2-1", "b2-2"];
numBitsOptions = [6, 7, 8, 16, 32];
fromHex = { '0':'0000',
            '1':'0001',
            '2':'0010',
            '3':'0011',
            '4':'0100',
            '5':'0101',
            '6':'0110',
            '7':'0111',
            '8':'1000',
            '9':'1001',
            'a':'1010',
            'b':'1011',
            'c':'1100',
            'd':'1101',
            'e':'1110',
            'f':'1111'};
toHex = {   '0000':'0',
            '0001':'1',
            '0010':'2',
            '0011':'3',
            '0100':'4',
            '0101':'5',
            '0110':'6',
            '0111':'7',
            '1000':'8',
            '1001':'9',
            '1010':'a',
            '1011':'b',
            '1100':'c',
            '1101':'d',
            '1110':'e',
            '1111':'f', 
            '000':'0',
            '001':'1',
            '010':'2',
            '011':'3',
            '100':'4',
            '101':'5',
            '110':'6',
            '111':'7',
            '00':'0',
            '01':'1',
            '10':'2',
            '11':'3',}; 


const randomNumber = (numBits, includeNegative, limitToBounds) => {
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
};

const randomAll = () => {
    let fromRepChoice = Math.floor(Math.random() * RepOptions.length);
    let toRepChoice = Math.floor(Math.random() * RepOptions.length);
    let numBitsChoice = numBitsOptions[Math.floor(Math.random() * numBitsOptions.length)];
    let numChoice = 0;

    // only allow conversions between [decimal, hex] <=> [binary reps]
    if(Math.floor(Math.random() * 2) == 0) {
        // from dec and hex
        fromRepChoice = Math.floor(Math.random() * 2);
        toRepChoice = Math.floor(Math.random() * 3) + 2;
        switch(fromRepChoice) {
            case 0:
                numChoice = randomNumber(numBitsChoice, true, false);
                break;
            case 1:
                numChoice = randomNumber(12,false,true)
                numChoice = '0x'+numChoice.toString(16);
                break;
        }
    } else {
        // to dec and hex
        fromRepChoice = Math.floor(Math.random() * 3) + 2;
        toRepChoice = Math.floor(Math.random() * 2);
        numChoice = randomNumber(numBitsChoice,false,true);
        numChoice = '0b'+numChoice.toString(2)
    }

    document.forms["conversion"]["fromRep"].value = RepOptions[fromRepChoice];
    document.forms["conversion"]["toRep"].value = RepOptions[toRepChoice];
    document.forms["conversion"]["numBits"].value = numBitsChoice;
    document.forms["conversion"]["num"].value = numChoice;
    return;
}

const randomNum = () => {
    let fromRepChoice = document.forms["conversion"]["fromRep"].value
    let numBitsChoice = document.forms["conversion"]["numBits"].value
    let numChoice = 0;

    switch(fromRepChoice) {
        case 'b10':
            numChoice = randomNumber(numBitsChoice, true, false);
            break;
        case 'b16':
            numChoice = randomNumber(12, false, true);
            numChoice = '0x'+numChoice.toString(16);
            break;
        default:
            numChoice = randomNumber(numBitsChoice,false, true);
            numChoice = '0b'+numChoice.toString(2)
            break;
    }

    document.forms["conversion"]["num"].value = numChoice;
    return;
}


const decimalToUnsigned = (num) => {
    let stepsArray = [`Convert to unsigned binary from ${num}`];
    let result = 0;

    if(num < 0) {
        stepsArray.push(`Unsigned binary cannot represent negative values. This conversion fails`);
        result = 'x'
        return {stepsArray, result};
    }
    stepsArray.push(`Don't worry about the number of bits yet. This method is repeated division by 2 until we reach 0 quotient.`);
    let binarySteps = [];

    let position = 0;

    while (num > 0) {
      let remainder = num % 2;
      let quotient = Math.floor(num / 2);
      binarySteps.push(remainder);
      stepsArray.push(`Bit ${position}: ${num} / 2 = ${quotient} remainder ${remainder}`);
      num = quotient;
      position++;
    }

    binarySteps.reverse();
    result = binarySteps.join('');

    // Add table with bit positions
    stepsArray.push(`Now, read the remainders going upward`);
    stepsArray.push(`Values     : ${result.split('').join(' ')}`);

    return {stepsArray, result};
};

const fitToSize = (binary, numBits, trim) => {
    let stepsArray = [`Fit to the desired bit length.`]
    let result;
    if(binary.length > numBits && !trim) {
        stepsArray.push(`The number of bits already exceeds what is desired. This conversion fails.`);
        result = 'x'.repeat(numBits);
        return {stepsArray, result};
    }

    if(binary.length > numBits) {
        result = binary.slice(-numBits);
        stepsArray.push(`The number of bits is above what is desired.`)
        stepsArray.push(`Trim the excess: 0b${result}`)
        return {stepsArray, result}
    }
    result = binary.padStart(numBits, '0');
    stepsArray.push(`Pad the left side with 0s until desired number of bits: 0b${result}`);
    return {stepsArray, result};
};

const onesComplement = (binary, isNeg, ignoreSign) => {
    let stepsArray = [`Apply the one's complement rules`];
    let result = binary;

    if (isNeg) {
      result = binary.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
        stepsArray.push(`Since, the number started as negative, flip the bits: 0b${result}`)
    } else {
        stepsArray.push(`Since, the number started as positive, do nothing: 0b${result}`)
    }
    if(isNeg & result[0] !== `1` && !ignoreSign) {
        stepsArray.push(`One's complement uses the MSB as a sign bit so it must be the desired value at the end of this step: Neg is 1 and Pos is 0.`, `This conversion fails.`)
        result =  binary.replaceAll(/./g,'x')
     }

    return {stepsArray, result}
};

const twosComplement = (binary, isNeg, ignoreSign) => {
    let stepsArray = [`Apply the two's complement rules`]
    let result = binary;

    /*if(binary[0] === `1` && !ignoreSign) {
        
        return {stepsArray, result}
     }*/
    if (isNeg) {
        result = result.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
        stepsArray.push(`Since, the number started as negative, flip the bits: 0b${result}`)
        let carry = 1;
          result = result.split('').map(Number);
          for (let i = result.length - 1; i >= 0; i--) {
            let sum = result[i] + carry;
            result[i] = sum % 2;
            carry = Math.floor(sum / 2);
          }

          result = result.join('');
          stepsArray.push(`And add 1 to get: 0b${result}`);
    } else {
        stepsArray.push(`Since, the number started as positive, do nothing: 0b${result}`)
    }
    if(isNeg && result[0] !== `1` && !ignoreSign) {
        stepsArray.push(`Two's complement uses the MSB as a sign bit so it must be the desired value at the end of this step: Neg is 1 and Pos is 0.`, `This conversion fails.`)
        result =  result.replaceAll(/./g,'x')
    }


    return {stepsArray, result};
};

const unsignedToDecimal = (binary) => {
        let result = 0;
        stepsArray= [`Convert unsigned binary 0b${binary} to decimal`];

        binary.split('').reverse().forEach((bit, index) => {
          const powerOfTwo = Math.pow(2, index);
          const decimalValue = parseInt(bit, 10) * powerOfTwo;

          stepsArray.push(`Bit ${index}: The bit is ${bit}. Add 2^${index} * (${bit}) = ${powerOfTwo * bit} to the total.`);
          result += decimalValue;
        });

        stepsArray.push(`The decimal value is ${result}`);
        return {stepsArray, result};
};

const handleConvert = () => {
    let result;
    let stepsArray = [];
    let groups = [];
    let isNeg;
    let fromRep = document.forms["conversion"]["fromRep"].value
    let toRep = document.forms["conversion"]["toRep"].value
    let numBits = document.forms["conversion"]["numBits"].value
    let num = document.forms["conversion"]["num"].value
    num = num.replaceAll('_','');
    let conversionResult = "0b"+'x'.repeat(numBits);


    switch ((fromRep + "To" + toRep)) {
      case 'b10Tob2u':
        num = parseInt(num, 10);
        result = decimalToUnsigned(num);
        stepsArray.push(result.stepsArray);
        if(result.result[0] === 'x') break;
        
        result = fitToSize(result.result, numBits);
        stepsArray.push(result.stepsArray);
        conversionResult = '0b'+result.result;
        break;


      case 'b10Tob2-1':
        num = parseInt(num, 10);
        isNeg = num < 0;
        
        stepsArray.push([`Start with ${num} and put the sign aside`]);
        result = decimalToUnsigned(Math.abs(num))
        stepsArray.push(result.stepsArray);
        if(result.result[0] === 'x') break;

        result = fitToSize(result.result, numBits);
        stepsArray.push(result.stepsArray);
        if(result.result[0] === 'x') break;
        
        result = onesComplement(result.result, isNeg, false)
        stepsArray.push(result.stepsArray);
        conversionResult = '0b'+result.result;
        break;

      case 'b10Tob2-2':
        num = parseInt(num, 10);
        isNeg = num < 0;
        
        stepsArray.push([`Start with ${num} and put the sign aside`]);
        result = decimalToUnsigned(Math.abs(num))
        stepsArray.push(result.stepsArray);
        if(result.result[0] === 'x') break;

        result = fitToSize(result.result, numBits);
        stepsArray.push(result.stepsArray);
        if(result.result[0] === 'x') break;

        result = twosComplement(result.result, isNeg, false)
        stepsArray.push(result.stepsArray);
        conversionResult = '0b'+result.result;
        break;


      case 'b2uTob10':
        result = fitToSize(num.replace('0b',''), numBits)
        stepsArray.push(result.stepsArray)
        
        result = unsignedToDecimal(result.result)
        stepsArray.push(result.stepsArray)
        conversionResult = result.result;
        break;

      case 'b2-1Tob10':
        result = fitToSize(num.replace('0b',''), numBits)
        stepsArray.push(result.stepsArray)

        isNeg = result.result[0] == "1";
        result = onesComplement(result.result, isNeg, true);
        stepsArray.push(result.stepsArray)
        
        result = unsignedToDecimal(result.result)
        stepsArray.push(result.stepsArray)
        conversionResult = result.result;

        if(isNeg) {
            conversionResult *= -1
            stepsArray.push([`Apply the negative sign`, `Bring back the sign from the MSB resulting in: ${conversionResult}`])
        }
        break;

      case 'b2-2Tob10':
        result = fitToSize(num.replace('0b',''), numBits)
        stepsArray.push(result.stepsArray)

        isNeg = result.result[0] == "1";
        result = twosComplement(result.result, isNeg, true);
        stepsArray.push(result.stepsArray)

        result = unsignedToDecimal(result.result)
        stepsArray.push(result.stepsArray)
        conversionResult = result.result;

        if(isNeg) {
            conversionResult *= -1
            stepsArray.push([`Apply the negative sign`, `Bring back the sign from the MSB resulting in: ${conversionResult}`])
        }
        break;

        case 'b16Tob2u':
        case 'b16Tob2-1':
        case 'b16Tob2-2':
            // convert each digit, then apply size
            result = num.toLowerCase().replace('0x','');
            groups = []
            result = result.split('').reverse().join('')
            result = result.replace(/[0-9a-f]/gi, d => {
                groups.push(`${d} = ${fromHex[d]}`)
                return fromHex[d].split('').reverse().join('')
            });
            result = result.split('').reverse().join('')
            groups.push(`Be careful with the ordering: 0b${result}`)
            stepsArray.push([`Convert each hex digit`].concat(groups));
            
            result = fitToSize(result,numBits, true)
            stepsArray.push(result.stepsArray)
            conversionResult = '0b'+result.result;
            break;
        case 'b2uTob16':
        case 'b2-1Tob16':
        case 'b2-2Tob16':
            result = fitToSize(num.replace('0b',''), numBits, true)
            stepsArray.push(result.stepsArray)
            if(result.result === 'x') break;

            result = result.result.split('').reverse().join('')
            result = result.replace(/[0-1][0-1][0-1][0-1]/gi, m => m+'_')
            result = result.split('').reverse().join('')
            
            stepsArray.push([`Group by 4 starting with the right`, `0b${result}`]);
            
            groups = []
            result = result.split('').reverse().join('')
            result = result.replace(/[0-1][0-1][0-1]?[0-1]?_?/gi, d => {
                d = d.replace('_','').split('').reverse().join('')
                groups.push(`${d} = ${toHex[d]}`)
                return toHex[d];
            });
            result = result.split('').reverse().join('')
            groups.push(`Be careful with the ordering`)
            conversionResult = '0x'+result

            stepsArray.push(['Convert each group to 1 hex digit individually'].concat(groups))
            break;
      default:
        stepsArray.push(['This conversion is not tested in this class.']);
        conversionResult = 'Not shown';
    }

    steps = ""
    stepsArray.map((step, index) => {
        steps += `<section><h4>${step[0]}</h4>`
        step.slice(1).map((s,i) => {
            steps += "<li key="+i+" class=step>"+s+"</li>";
        })
        steps += `</section>`
    })
    document.getElementById("stepsList").innerHTML = steps;
    document.getElementById("stepsContainer").style.display = "block";

    document.getElementById("resultContainer").style.display = "block";
    document.getElementById("resultContainer").innerHTML = "<span class=result-label>Result:</span>"+conversionResult;
  };


