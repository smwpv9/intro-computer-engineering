

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


  const add = (binary1, binary2) => {
    if ((!/^[01]+$/.test(binary1) || !/^[01]+$/.test(binary2))) {
      return { result: "Invalid binary input", steps: [], remainder: null };
    }

    const maxLength = Math.max(binary1.length, binary2.length);
    const paddedBinary1 = binary1.padStart(maxLength, "0");
    const paddedBinary2 = binary2.padStart(maxLength, "0");

    let result = "";
    let steps = [];
    let carries = Array(maxLength + 1).fill(" ");

    let initialSetup = `  ${paddedBinary1}\n+ ${paddedBinary2}\n${"-".repeat(maxLength + 2)}`;
    //steps.push(initialSetup);

    let carry = 0;
    for (let i = maxLength - 1; i >= 0; i--) {
      const bit1 = parseInt(paddedBinary1[i], 10);
      const bit2 = parseInt(paddedBinary2[i], 10);
      const sum = bit1 + bit2 + carry;

      result = (sum % 2) + result;
      carry = Math.floor(sum / 2);

      if (carry > 0) {
        carries[i] = "1";
      }
    }

    if (carry > 0) {
      carries.unshift("1");
      carries.pop();
    } else {
      carries.shift();
    }

    if (result.length > maxLength) {
      result = result.slice(-maxLength);
    } else {
      result = result.padStart(maxLength, "0");
    }

    let carriesLine = carries.join("");
    if (carry > 0) {
      carriesLine += " (Carry out)";
    }

    let finalDisplay = `${carriesLine}\n  ${paddedBinary1} (A)\n+ ${paddedBinary2} (B)\n${"-".repeat(maxLength + 2)}\n  ${result} (Sum)`;
    steps.push(finalDisplay);


    let firstCarry = carries.find(c => c === "1") || "0";
    let lastCarry = [...carries].reverse().find(c => c === "1") || "0";

    let remainder = (parseInt(firstCarry, 10) ^ parseInt(lastCarry, 10)).toString();
    console.log(remainder);

    let remainderSteps = `Carry in ${firstCarry} XOR Carry out ${lastCarry}: ${remainder}`;
    console.log(remainderSteps);

    return { result, steps, remainder, remainderSteps };
  };

  const handleOperation = () => {
    let operation = document.forms["operate"]["operation"].value
    let numBits = document.forms["operate"]["numBits"].value
    let num1 = document.forms["operate"]["num1"].value
    let num2 = document.forms["operate"]["num2"].value
    if (!num1 || !num2) {
      alert("Please enter both binary numbers");
      return;
    }

    let response = {};
    if (operation === "add") {
      response = add(num1, num2);
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


