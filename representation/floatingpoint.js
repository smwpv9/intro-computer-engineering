/*
const [decimalValue, setDecimalValue] = useState('0');
  const [ieeeResult, setIeeeResult] = useState({
    sign: 0,
    exponent: 0,
    mantissa: 0,
    binary: '00000000000000000000000000000000',
    hex: '00000000',
    displayExponent: -126,
    displayMantissa: 0
  });
  const [storedValue, setStoredValue] = useState('0');
  const [errorValue, setErrorValue] = useState('0');
*/
 
  const convertToIEEE754 = (inputValue) => {
    const num = parseFloat(inputValue);
    
    if (isNaN(num)) {
      return {
        signb: 0,
        exponent: 255,
        mantissa: parseInt('1'.padEnd(23, '0'), 2),
        binary: '01111111110000000000000000000000',
        hex: '7FC00000',
        displayExponent: null,
        displayMantissa: null
      };
    }
    
    if (!isFinite(num)) {
      const signb = num < 0 ? 1 : 0;
      return {
        signb: signb,
        exponent: 255,
        mantissa: 0,
        binary: (sign ? '1' : '0') + '11111111' + '0'.repeat(23),
        hex: sign ? 'FF800000' : '7F800000',
        displayExponent: null,
        displayMantissa: null
      };
    }
    
    const floatView = new Float32Array(1);
    floatView[0] = num;
    const intView = new Uint32Array(floatView.buffer);
    const bits = intView[0];
    
    const signb = (bits >>> 31) & 0x1;
    const biasedExponent = (bits >>> 23) & 0xFF;
    const mantissaBits = bits & 0x7FFFFF;
    
    let displayExponent;
    let displayMantissa;
    
    if (biasedExponent === 0) {
      displayExponent = -126;
      displayMantissa = mantissaBits / Math.pow(2, 23);
    } else if (biasedExponent === 255) {
      displayExponent = null;
      displayMantissa = null;
    } else {
      displayExponent = biasedExponent - 127;
      displayMantissa = 1 + mantissaBits / Math.pow(2, 23);
    }
    
    const binary = bits.toString(2).padStart(32, '0');
    const hex = bits.toString(16).padStart(8, '0').toUpperCase();
    
    return {
      signb,
      exponent: biasedExponent,
      mantissa: mantissaBits,
      binary,
      hex,
      displayExponent,
      displayMantissa: displayMantissa === 1 ? 0 : displayMantissa
    };
  };


  const updateFromDecimal = () => {
    try {
        let decimalValue = document.forms['float']['decimal-value'].value;
      const result = convertToIEEE754(decimalValue);
      setIeeeResult(result);
      
      const inputVal = parseFloat(decimalValue);
      const floatView = new Float32Array(1);
      floatView[0] = inputVal;
      
    document.forms['float']['float-value'].value = floatView[0].toString();
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };

  const handlePlusOne = () => {
    const currentValue = parseFloat(storedValue) || 0;
    setDecimalValue((currentValue + 1).toString());
  };

const setIeeeResult = (ieeeResult) => {
    if(ieeeResult.signb == 0) {
        document.getElementById("val-sign").innerHTML = '+1';
    } else {
        document.getElementById("val-sign").innerHTML = '-1';    
    }
    if(ieeeResult.displayExponent === -126 ) {
        document.getElementById("val-exp").innerHTML = "2<sup>-126</sup>";
    } else {
        document.getElementById("val-exp").innerHTML = "2<sup>"+ieeeResult.displayExponent+"</sup>";
    }
    document.getElementById("val-man").innerHTML = ieeeResult.displayMantissa.toFixed(6);

    document.getElementById("enc-sign").innerHTML = ieeeResult.signb;
    document.getElementById("enc-exp").innerHTML = ieeeResult.exponent;
    document.getElementById("enc-man").innerHTML = ieeeResult.mantissa;

    renderBinaryCells(ieeeResult);

    document.forms['float']['binary-value'].value = '0b'+ieeeResult.binary;
    document.forms['float']['hex-value'].value = '0x'+ieeeResult.hex;
    return;
}

  // Renders the three groups of bits (sign, exponent, mantissa)
  const renderBinaryCells = (ieeeResult) => {
    const bits = ieeeResult.binary;
    // children[0] => sign bits, children[1] => exponent bits, children[2] => mantissa bits
    document.getElementById("bin-sign").innerHTML = `<div style="display: flex; justifyContent: center">
          <div class=fp-binaryCell}>${bits[0]}</div>
        </div>`
        let expBits = ""
        Array.from({ length: 8 }, (_, i) => (
            expBits += `<div key="e${i}" class=fp-binaryCell>${bits[i + 1]}</div>`
          ));
document.getElementById("bin-exp").innerHTML = `<div style="display: flex; justifyContent: center">
          ${expBits}
        </div>`
        let manBits = ""
        Array.from({ length: 23 }, (_, i) => (
            manBits += `<div key=m${i} class=fp-binaryCell>${bits[i + 9]}</div>`
          ))
document.getElementById("bin-man").innerHTML = `<div style="display: flex; justifyContent: center; flexWrap: wrap ">
          ${manBits}
        </div>`

  };


const setup = () => {
    document.forms["float"]["decimal-value"].value = 1;
    console.log('called')
    updateFromDecimal();
    return;
}


const random = () => {
    document.forms['float']['decimal-value'].value = (Math.floor(Math.random() *  256) - 128) / 16
    return;
}


