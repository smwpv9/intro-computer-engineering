

RepOptions = ["b10", "b16", "b2u", "b2-1", "b2-2"];
numBitsOptions = [6, 7, 8, 16, 32];


const random = () => {
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
                numChoice = Math.floor(Math.random() * (Math.min(4096,Math.pow(2,numBitsChoice))+50) ) - (Math.min(2048,Math.pow(2,numBitsChoice)) + 25);
                break;
            case 1:
                numChoice = Math.floor(Math.random() * 4096 );
                numChoice = numChoice.toString(16);
                break;
        }
    } else {
        // to dec and hex
        fromRepChoice = Math.floor(Math.random() * 3) + 2;
        toRepChoice = Math.floor(Math.random() * 2);
        numChoice = Math.floor(Math.random() * Math.min(4096, Math.pow(2,numBitsChoice)))
        numChoice = numChoice.toString(2)
    }

    document.forms["conversion"]["fromRep"].value = RepOptions[fromRepChoice];
    document.forms["conversion"]["toRep"].value = RepOptions[toRepChoice];
    document.forms["conversion"]["numBits"].value = numBitsChoice;
    document.forms["conversion"]["num"].value = numChoice;
    return;
}

const randomNumber = () => {
    let fromRepChoice = document.forms["conversion"]["fromRep"].value
    let numBitsChoice = document.forms["conversion"]["numBits"].value
    let numChoice = 0;

    switch(fromRepChoice) {
        case 'b10':
            numChoice = Math.floor(Math.random() * (Math.min(4096,Math.pow(2,numBitsChoice))+50) ) - (Math.min(2048,Math.pow(2,numBitsChoice)) + 25);
            break;
        case 'b16':
            numChoice = Math.floor(Math.random() * 4096 );
            numChoice = numChoice.toString(16);
            break;
        default:
            numChoice = Math.floor(Math.random() * Math.min(4096, Math.pow(2,numBitsChoice)))
            numChoice = numChoice.toString(2)
            break;
    }

    document.forms["conversion"]["num"].value = numChoice;
    return;
}


const handleConvert = () => {
    let stepsArray = [];
    let conversionResult;

    let fromRep = document.forms["conversion"]["fromRep"].value
    let toRep = document.forms["conversion"]["toRep"].value
    let numBits = document.forms["conversion"]["numBits"].value
    let num = document.forms["conversion"]["num"].value

    console.log((fromRep + "To" + toRep))
    switch ((fromRep + "To" + toRep)) {
      case 'b10Tob2u':
        num = parseInt(num, 10);
        stepsArray.push(`Step 1: Start with ${num}.`);
        let binarySteps = [];

        const bitLength = 8;
        let position = 0;

        while (num > 0) {
          let remainder = num % 2;
          let quotient = Math.floor(num / 2);
          binarySteps.push(remainder);
          stepsArray.push(`Bit ${position}: Divide ${num} by 2, Remainder is ${remainder}, Quotient ${quotient}`);
          num = quotient;
          position++;
        }

        // Continue adding remaining bit positions with 0 remainder and 0 quotient
        while (position < bitLength) {
          binarySteps.push(0);
          stepsArray.push(`Bit ${position}: Divide 0 by 2, Remainder is 0, Quotient 0`);
          position++;
        }

        binarySteps.reverse();
        const paddedBinary = binarySteps.join('');

        // Add table with bit positions
        stepsArray.push(`Bit pos: 7 6 5 4 3 2 1 0`);
        stepsArray.push(`Values     : ${paddedBinary.split('').join(' ')}`);

        conversionResult = '0b'+paddedBinary;
        stepsArray.push(`Final Result: Binary Unsigned Integer is ${conversionResult}`);
        break;


      case 'b10Tob2-1':
        let num1 = parseInt(num, 10);
        let isNeg = num1 < 0;
        stepsArray.push(`Step 1: Start with ${num1} (Decimal).`);

        let binarySteps1 = [];
        let tempNum = Math.abs(num1);

        while (tempNum > 0) {
          binarySteps1.unshift(tempNum % 2);
          stepsArray.push(`Divide ${tempNum} by 2: Remainder is ${tempNum % 2} (Bit position ${binarySteps1.length})`);
          tempNum = Math.floor(tempNum / 2);
        }

        let paddedBinary1 = binarySteps1.join('').padStart(8, '0');
        stepsArray.push(`Step 2: Binary representation of absolute value is ${paddedBinary1}.`);

        if (isNeg) {
          const onesComplement = paddedBinary1.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
          stepsArray.push(`Step 3: Flip bits to get one's complement: ${onesComplement}.`);
          conversionResult = onesComplement;
        } else {
          conversionResult = paddedBinary1;
        }

        stepsArray.push(`Final Result: One's complement binary is ${conversionResult}.`);
        break;

      case 'b10Tob2-2':
        let num2 = parseInt(num, 10);
        const bitLength1 = 8;
        stepsArray.push(`Step 1: Start with decimal value ${num2}.`);

        if (num2 >= 0) {
          let binarySteps2 = [];
          let temp = num2;
          while (temp > 0) {
            let remainder = temp % 2;
            binarySteps2.push(remainder);
            stepsArray.push(`Divide ${temp} by 2: Remainder = ${remainder}`);
            temp = Math.floor(temp / 2);
          }

          binarySteps2.reverse();
          const binaryString2 = binarySteps2.join('').padStart(bitLength1, '0');
          stepsArray.push(`Step 2: Binary representation padded to ${bitLength1} bits is ${binaryString2}.`);

          binaryString2.split('').forEach((bit, index) => {
            const pos = bitLength1 - 1 - index;
            stepsArray.push(`Bit position ${pos}: ${bit}`);
          });

          conversionResult = binaryString2;
          stepsArray.push(`Final Result: Two's Complement Binary is ${conversionResult}`);
        } else {
          let absoluteValue = Math.abs(num2);
          stepsArray.push(`Step 2: Convert absolute value ${absoluteValue} to binary.`);

          let binarySteps2 = [];
          let temp = absoluteValue;
          while (temp > 0) {
            let remainder = temp % 2;
            binarySteps2.push(remainder);
            stepsArray.push(`Divide ${temp} by 2: Remainder = ${remainder}`);
            temp = Math.floor(temp / 2);
          }

          binarySteps2.reverse();
          const binaryString2 = binarySteps2.join('').padStart(bitLength1, '0');
          stepsArray.push(`Binary (padded to ${bitLength1} bits): ${binaryString2}`);

          let onesComp = binaryString2.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
          stepsArray.push(`Step 3: One's complement (flip bits): ${onesComp}`);

          let carry = 1;
          let twosComplement = onesComp.split('').map(Number);
          for (let i = twosComplement.length - 1; i >= 0; i--) {
            let sum = twosComplement[i] + carry;
            twosComplement[i] = sum % 2;
            carry = Math.floor(sum / 2);
          }

          const twosComplementString = twosComplement.join('');
          stepsArray.push(`Step 4: Add 1 to one's complement to get two's complement: ${twosComplementString}`);

          twosComplementString.split('').forEach((bit, index) => {
            const pos = bitLength1 - 1 - index;
            stepsArray.push(`Bit position ${pos}: ${bit}`);
          });

          conversionResult = twosComplementString;
          stepsArray.push(`Final Result: Two's Complement Binary is ${conversionResult}`);
        }
        break;


      case 'b2uTob10':
        const binaryString3 = num.toString();
        const binaryArray3 = binaryString3.split('').reverse();

        conversionResult = 0;
        stepsArray.push(`Converting binary ${binaryString3} to decimal:`);

        binaryArray3.forEach((bit, index) => {
          const powerOfTwo = Math.pow(2, index);
          const decimalValue = parseInt(bit, 10) * powerOfTwo;

          if (bit === '1') {
            stepsArray.push(`Bit Position ${index}: The bit is ${bit}. Add 2^${index} * (${bit}) = ${powerOfTwo} to the total.`);
          } else {
            stepsArray.push(`Bit Position ${index}: The bit is ${bit}. Add 2^${index} * (${bit}) = 0, so add nothing to the total.`);
          }

          conversionResult += decimalValue;
        });

        stepsArray.push(`Final Result: The decimal value is ${conversionResult}`);
        break;

      case 'b2-1Tob10':
        const binaryString4 = num.toString();
        const signBit = binaryString4[0];
        let convertedDecimal = 0;

        if (signBit === '0') {
          stepsArray.push(`Step 1: Sign bit is 0, so the number is positive.`);
          stepsArray.push(`Step 2: Convert binary ${binaryString4} to decimal directly.`);

          // Add steps for bit-by-bit conversion like in unsigned int to decimal
          let runningTotal = 0;
          for (let i = 0; i < binaryString4.length; i++) {
            const bit = binaryString4[i];
            const position = binaryString4.length - 1 - i;
            const value = bit === '1' ? Math.pow(2, position) : 0;
            const newTotal = runningTotal + value;

            stepsArray.push(`Bit position ${position}: The bit is ${bit}. Add 2^${position} * (${bit}) = ${value} to the total; total = ${newTotal}`);
            runningTotal = newTotal;
          }

          convertedDecimal = parseInt(binaryString4, 2);
        } else {
          stepsArray.push(`Step 1: Sign bit is 1, so the number is negative.`);

          let invertedBits = '';
          for (let i = 0; i < binaryString4.length; i++) {
            invertedBits += binaryString4[i] === '0' ? '1' : '0';
          }
          stepsArray.push(`Step 2: Invert all bits to get original magnitude: ${invertedBits}.`);

          let runningTotal = 0;
          for (let i = 0; i < invertedBits.length; i++) {
            const bit = invertedBits[i];
            const position = binaryString4.length - 1 - i;
            const value = bit === '1' ? Math.pow(2, position) : 0;
            const newTotal = runningTotal + value;

            stepsArray.push(`Bit position ${position}: The bit is ${bit}. Add 2^${position} * (${bit}) = ${value} to the total; total is ${newTotal}`);
            runningTotal = newTotal;
          }

          convertedDecimal = -parseInt(invertedBits, 2);
          stepsArray.push(`Step 3: Apply negative sign to get the decimal value.`);
        }

        stepsArray.push(`Final Result: The decimal value is ${convertedDecimal}`);
        conversionResult = convertedDecimal
        break;

      case 'b2-2Tob10':
        const binaryString5 = num.toString();
        const isNegative = binaryString5[0] === '1';
        stepsArray.push(`Step 1: Checking the sign bit of ${binaryString5}.`);

        if (isNegative) {
          stepsArray.push(`The sign bit is 1, so the number is negative.`);

          let invertedBinary = '';
          for (const bit of binaryString5) {
            invertedBinary += bit === '1' ? '0' : '1';
          }
          stepsArray.push(`Step 2: Invert all bits to get ${invertedBinary}.`);

          // Calculate positive binary value and ensure it has leading zeros
          let positiveBinaryValue = (parseInt(invertedBinary, 2) + 1).toString(2);
          // Ensure the binary representation has the same number of bits
          positiveBinaryValue = positiveBinaryValue.padStart(binaryString5.length, '0');
          stepsArray.push(`Step 3: Add 1 to ${invertedBinary} to get the positive magnitude: ${positiveBinaryValue}.`);

          // Add bit-by-bit conversion steps
          stepsArray.push(`Step 4: Convert ${positiveBinaryValue} to decimal:`);
          let runningTotal = 0;
          for (let i = 0; i < positiveBinaryValue.length; i++) {
            const bit = positiveBinaryValue[i];
            const position = positiveBinaryValue.length - 1 - i;
            const value = bit === '1' ? Math.pow(2, position) : 0;
            runningTotal += value;
            stepsArray.push(`Bit position ${position}: The bit is ${bit}. Add 2^${position} * (${bit}) = ${value} to the total; total = ${runningTotal}`);
          }

          conversionResult = -runningTotal;
          stepsArray.push(`Step 5: Apply the negative sign to get ${conversionResult}.`);
        } else {
          stepsArray.push(`The sign bit is 0, so the number is positive.`);

          // Add bit-by-bit conversion steps
          stepsArray.push(`Step 2: Convert binary ${binaryString5} to decimal:`);
          let runningTotal = 0;
          for (let i = 0; i < binaryString5.length; i++) {
            const bit = binaryString5[i];
            const position = binaryString5.length - 1 - i;
            const value = bit === '1' ? Math.pow(2, position) : 0;
            runningTotal += value;
            stepsArray.push(`Bit position ${position}: The bit is ${bit}. Add 2^${position} * (${bit}) = ${value} to the total; total = ${runningTotal}`);
          }

          conversionResult = runningTotal;
        }

        stepsArray.push(`Final Result: The decimal value is ${conversionResult}`);
        break;

      default:
        stepsArray.push('Invalid conversion type');
        conversionResult = 'Error';
    }

    steps = ""
    stepsArray.map((step, index) => {
        steps += "<li key="+index+" class=step>"+step+"</li>";
    })
    document.getElementById("stepsList").innerHTML = steps;
    document.getElementById("stepsContainer").style.display = "block";

    document.getElementById("resultContainer").style.display = "block";
    document.getElementById("resultContainer").innerHTML = "<span class=resultLabel>Result:</span>"+conversionResult;
  };


