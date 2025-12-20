

opOptions = ["add", "and", "or", "xor"];
numBitsOptions = [6, 7, 8, 16, 32];


const random = () => {
    let opChoice = Math.floor(Math.random() * opOptions.length);
    let numBitsChoice = numBitsOptions[Math.floor(Math.random() * numBitsOptions.length)];
    let num1Choice = Math.floor(Math.random() * (Math.pow(2,numBitsChoice)-1));
    let num2Choice = Math.floor(Math.random() * (Math.pow(2,numBitsChoice)-1));


    document.forms["operate"]["operation"].value = opOptions[opChoice];
    document.forms["operate"]["numBits"].value = numBitsChoice;
    document.forms["operate"]["num1"].value = '0b'+num1Choice.toString(2);
    document.forms["operate"]["num2"].value = '0b'+num2Choice.toString(2);
    return;
};


  const validLength = (value) => {
    if (value.length !== 0 && value.length !== 6 && value.length !== 8) {
      return false;
    }
    return true;
  };



const hexAdd = (binary1, binary2) => {

    let result = "";
    let steps = [];
    let carries = Array(binary1.length + 2).fill(" ");

    let initialSetup = `  ${binary1}\n+ ${binary2}\n${"-".repeat(binary1.length + 2)}`;
    //steps.push(initialSetup);

    let carry = 0;
    let carryIn = 0;
    for (let i = binary1.length - 1; i >= 0; i--) {
      const bit1 = parseInt(binary1[i], 16);
      const bit2 = parseInt(binary2[i], 16);
      const sum = bit1 + bit2 + carry;

        bin1 = bit1.toString(2).padStart(4,'0');
        bin2 = bit2.toString(2).padStart(4,'0');
        carryIn = (bin1[3]&bin2[3]) | (carry & (bin1[3] | bin2[3]));
        carryIn = (bin1[2]&bin2[2]) | (carryIn & (bin1[2] | bin2[2]));
        carryIn = (bin1[1]&bin2[1]) | (carryIn & (bin1[1] | bin2[1]));

      result = (sum % 16) + result;
      carry = Math.floor(sum / 16);

      if (carry > 0) {
        carries[i+1] = "1";
      }
    }

    if (result.length > binary1.length ) {
      result = result.slice(-binary1.length );
    } else {
      result = result.padStart(binary1.length , "0");
    }

    let carriesLine = carries.join("");
    if (carry > 0) {
      carriesLine += " (Carry out)";
    }

    let finalDisplay = `${carriesLine}\n  ${binary1} (A)\n+ ${binary2} (B)\n${"-".repeat(binary1.length  + 2)}\n  ${result} (Sum)`;
    steps.push(finalDisplay);

    result = '0x'+result;

    let msbCarryIn = carryIn;
    if(msbCarryIn === " ") msbCarryIn = '0';
    let msbCarryOut = carries[1];
    if(msbCarryOut === " ") msbCarryOut = '0';
    let remainder = parseInt(msbCarryIn, 10) ^ parseInt(msbCarryOut, 10);
    let remainderSteps = `Signed: Carry in ${msbCarryIn} XOR Carry out ${msbCarryOut}: ${remainder}<br/>Unsigned: Carry out ${msbCarryOut}: ${msbCarryOut}`;
    remainder = remainder ? "Yes singed overflow occured" : "No signed overflow"
    remainder += msbCarryOut ? "<br/>Yes unsigned overflow occured" : "<br/>No unsigned overflow"

    return { result, steps, remainder, remainderSteps };
  };


const binaryAdd = (binary1, binary2) => {

    let result = "";
    let steps = [];
    let carries = Array(binary1.length + 2).fill(" ");

    let initialSetup = `  ${binary1}\n+ ${binary2}\n${"-".repeat(binary1.length + 2)}`;
    //steps.push(initialSetup);

    let carry = 0;
    for (let i = binary1.length - 1; i >= 0; i--) {
      const bit1 = parseInt(binary1[i], 10);
      const bit2 = parseInt(binary2[i], 10);
      const sum = bit1 + bit2 + carry;

      result = (sum % 2) + result;
      carry = Math.floor(sum / 2);

      if (carry > 0) {
        carries[i+1] = "1";
      }
    }

    if (result.length > binary1.length ) {
      result = result.slice(-binary1.length );
    } else {
      result = result.padStart(binary1.length , "0");
    }

    let carriesLine = carries.join("");
    if (carry > 0) {
      carriesLine += " (Carry out)";
    }

    let finalDisplay = `${carriesLine}\n  ${binary1} (A)\n+ ${binary2} (B)\n${"-".repeat(binary1.length  + 2)}\n  ${result} (Sum)`;
    steps.push(finalDisplay);

    result = '0b'+result;

    let msbCarryIn = carries[2];
    if(msbCarryIn === " ") msbCarryIn = '0';
    let msbCarryOut = carries[1];
    if(msbCarryOut === " ") msbCarryOut = '0';
    let remainder = parseInt(msbCarryIn, 10) ^ parseInt(msbCarryOut, 10);
    let remainderSteps = `Signed: Carry in ${msbCarryIn} XOR Carry out ${msbCarryOut}: ${remainder}<br/>Unsigned: Carry out ${msbCarryOut}: ${msbCarryOut}`;
    remainder = remainder ? "Yes singed overflow occured" : "No signed overflow"
    remainder += msbCarryOut ? "<br/>Yes unsigned overflow occured" : "<br/>No unsigned overflow"

    return { result, steps, remainder, remainderSteps };
  };



  const binaryAnd = (binary1, binary2) => {
    let result = "";
    let steps = [];

    let initialSetup = `  ${binary1}\n+ ${binary2}\n${"-".repeat(binary1.length + 2)}`;
    //steps.push(initialSetup);

    for (let i = binary1.length - 1; i >= 0; i--) {
      const bit1 = parseInt(binary1[i], 10);
      const bit2 = parseInt(binary2[i], 10);
      const sum = bit1 & bit2;

      result = (sum % 2) + result;

    }

    let finalDisplay = `  ${binary1} (A)\n& ${binary2} (B)\n${"-".repeat(binary1.length + 2)}\n  ${result} (Sum)`;
    steps.push(finalDisplay);

    result = '0b'+result;
    let remainder = "No such thing as overflow for this operation";
    let remainderSteps = "";

    return { result, steps, remainder, remainderSteps };
  };



const binaryOr = (binary1, binary2) => {
    let result = "";
    let steps = [];

    let initialSetup = `  ${binary1}\n+ ${binary2}\n${"-".repeat(binary1.length + 2)}`;
    //steps.push(initialSetup);

    for (let i = binary1.length - 1; i >= 0; i--) {
      const bit1 = parseInt(binary1[i], 10);
      const bit2 = parseInt(binary2[i], 10);
      const sum = bit1 | bit2;

      result = (sum % 2) + result;

    }

    let finalDisplay = `  ${binary1} (A)\n| ${binary2} (B)\n${"-".repeat(binary1.length + 2)}\n  ${result} (Sum)`;
    steps.push(finalDisplay);

    result = '0b'+result;
    let remainder = "No such thing as overflow for this operation";
    let remainderSteps = "";

    return { result, steps, remainder, remainderSteps };
  };


const binaryXor = (binary1, binary2) => {
    let result = "";
    let steps = [];

    let initialSetup = `  ${binary1}\n+ ${binary2}\n${"-".repeat(binary1.length + 2)}`;
    //steps.push(initialSetup);

    for (let i = binary1.length - 1; i >= 0; i--) {
      const bit1 = parseInt(binary1[i], 10);
      const bit2 = parseInt(binary2[i], 10);
      const sum = bit1 ^ bit2;

      result = (sum % 2) + result;

    }

    let finalDisplay = `  ${binary1} (A)\n^ ${binary2} (B)\n${"-".repeat(binary1.length + 2)}\n  ${result} (Sum)`;
    steps.push(finalDisplay);

    result = '0b'+result;
    let remainder = "No such thing as overflow for this operation";
    let remainderSteps = "";

    return { result, steps, remainder, remainderSteps };
  };





  const handleOperation = () => {
    let operation = document.forms["operate"]["operation"].value
    let numBits = document.forms["operate"]["numBits"].value
    let num1 = document.forms["operate"]["num1"].value
    let num2 = document.forms["operate"]["num2"].value
    let inHex = false;
    if (!num1 || !num2) {
      alert("Please enter both numbers");
      return;
    }

    if (num1[1] === 'x') {
        if(num2[1] === 'x') {
            inHex = true;
            if(operation != 'add') {
                alert("Hex is allowed for addition only");
            }
        num1 = num1.replace('0x','').toLowerCase();
        num2 = num2.replace('0x','').toLowerCase();
      if ((!/^[0-9a-f]+$/.test(num1) || !/^[0-9a-f]+$/.test(num2))) {
            return { result: "Invalid binary input", steps: [], remainder: null };
        }
        
        num1 = num1.padStart(numBits/4, "0");
        num2 = num2.padStart(numBits/4, "0");
        } else {
            alert("Please enter numbers of the same base: binary for all operations or hex for addition only.")
            return;
        }
    }
    else {
        num1 = num1.replace('0b','');
        num2 = num2.replace('0b','')
      if ((!/^[01]+$/.test(num1) || !/^[01]+$/.test(num2))) {
            return { result: "Invalid binary input", steps: [], remainder: null };
        }
        
        num1 = num1.padStart(numBits, "0");
        num2 = num2.padStart(numBits, "0");
    }
    
    // TODO: implement trim to size as well
    let response = {};
    switch(operation) {
        case 'add':
            if(inHex) {
                response = hexAdd(num1, num2);
            } else {
                response = binaryAdd(num1, num2);
            }
            break;
        case 'and':
            response = binaryAnd(num1,num2);
            break;
        case 'or':
            response = binaryOr(num1,num2);
            break;
        case 'xor':
            response = binaryXor(num1,num2);
            break;
        default:
            alert('how did the code get here? Please alert the professor.');
            return;
    }
    

    let steps = []
    response.steps.map((step, index) => {
                steps += `<pre key=${index} style="whiteSpace: 'pre-wrap', margin: '8px 0'"">${step}</pre>`
              });

    document.getElementById("steps-list").innerHTML = steps;
    document.getElementById("result-container").style.display = "block";
    document.getElementById('result').innerHTML = response.result;
    document.getElementById('remainder').innerHTML = response.remainder+"<br/>"+response.remainderSteps;
  };


