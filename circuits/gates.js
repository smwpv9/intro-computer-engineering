/**
 * THE MANIFEST: Maps SVG components to Logic Rules
 */
const circuitManifest = {
	"nand": {
		inputs: ["A", "B"],
        outputs: [
            {id: "X", sources: "G1" }
        ],
		logic: [
			{ id: "G1", type: "NAND", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		},
        truth: (inp) => [!(inp[0] & inp[1])]
	},
	"and": {
		inputs: ["A", "B"],	
        outputs: [
            {id: "X", sources: "G1" }
        ],	
		logic: [
			{ id: "G1", type: "AND", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		},
        truth: (inp) => [inp[0] & inp[1]]
	},
	"or": {
		inputs: ["A", "B"],	
        outputs: [
            {id: "X", sources: "G1" }
        ],	
		logic: [
			{ id: "G1", type: "OR", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		},
        truth: (inp) => [inp[0] | inp[1]]
	},
	"nor": {
		inputs: ["A", "B"],	
        outputs: [
            {id: "X", sources: "G1" }
        ],	
		logic: [
			{ id: "G1", type: "NOR", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		},
        truth: (inp) => [!(inp[0] | inp[1])]
	},
	"not": {
		inputs: ["A"],	
        outputs: [
            {id: "X", sources: "G1" }
        ],	
		logic: [
			{ id: "G1", type: "NOT", sources: ["A"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"G1": ["wire-G1-X"]
		},
        truth: (inp) => [!inp[0]]
	},
	"yes": {
		inputs: ["A"],	
        outputs: [
            {id: "X", sources: "G1" }
        ],	
		logic: [
			{ id: "G1", type: "YES", sources: ["A"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"G1": ["wire-G1-X"]
		},
        truth: (inp) => [inp[0]]
	},
	"xor": {
		inputs: ["A", "B"],	
        outputs: [
            {id: "X", sources: "G1" }
        ],	
		logic: [
			{ id: "G1", type: "XOR", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		},
        truth: (inp) => [inp[0] ^ inp[1]]
	},
	"xnor": {
		inputs: ["A", "B"],	
        outputs: [
            {id: "X", sources: "G1" }
        ],	
		logic: [
			{ id: "G1", type: "XNOR", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		},
        truth: (inp) => [!(inp[0] ^ inp[1])]
	},
	"exploded_xor": {
		inputs: ["A", "B"],	
        outputs: [
            {id: "X", sources: "O1" }
        ],	
		logic: [
			{ id: "N1", type: "NOT", sources: ["B"] },
			{ id: "N2", type: "NOT", sources: ["A"] },
			{ id: "A1", type: "AND", sources: ["A", "N1"] },
			{ id: "A2", type: "AND", sources: ["N2", "B"] },
			{ id: "O1", type: "OR",  sources: ["A1", "A2"] }
		],
		visualMap: {
			"A": ["wire-A"],
			"B": ["wire-B"],
			"N1": ["wire-N1-A1"],
			"N2": ["wire-N2-A2"],
			"A1": ["wire-A1-O1"],
			"A2": ["wire-A2-O1"],
			"O1": ["wire-O1-X"]
		},
        truth: (inp) => [inp[0] ^ inp[1]]
	},
	"decoder": {
		inputs: ["A", "B"],	
        outputs: [
            {id: "W", sources: "A1" },
            {id: "X", sources: "A2" },
            {id: "Y", sources: "A3" },
            {id: "Z", sources: "A4" },
        ],	
		logic: [
			{ id: "N1", type: "NOT", sources: ["A"] },
			{ id: "N2", type: "NOT", sources: ["B"] },
			{ id: "A1", type: "AND", sources: ["N1", "N2"] },
			{ id: "A2", type: "AND", sources: ["N1", "B"] },
			{ id: "A3", type: "AND", sources: ["A", "N2"] },
			{ id: "A4", type: "AND", sources: ["A", "B"] }
		],
		visualMap: {
			"A": ["wire-A"],
			"B": ["wire-B"],
			"A1": ["wire-A1-W"],
			"A2": ["wire-A2-X"],
			"A3": ["wire-A3-Y"],
			"A4": ["wire-A4-Z"]
		},
        truth: (inp) => [!inp[0] & !inp[1], !inp[0] & inp[1], inp[0] & !inp[1], inp[0] & inp[1]]
	},
	"multiplexer": {
		inputs: ["A", "B", "I0", "I1", "I2", "I3"],	
        outputs: [
            {id: "X", sources: "O1" }
        ],	
		logic: [
			{ id: "N1", type: "NOT", sources: ["A"] },
			{ id: "N2", type: "NOT", sources: ["B"] },
			{ id: "A1", type: "AND", sources: ["N1", "N2"] },
			{ id: "A2", type: "AND", sources: ["N1", "B"] },
			{ id: "A3", type: "AND", sources: ["A", "N2"] },
			{ id: "A4", type: "AND", sources: ["A", "B"] },
			{ id: "A5", type: "AND", sources: ["A1", "I0"] },
			{ id: "A6", type: "AND", sources: ["A2", "I1"] },
			{ id: "A7", type: "AND", sources: ["A3", "I2"] },
			{ id: "A8", type: "AND", sources: ["A4", "I3"] },
			{ id: "O1", type: "OR", sources: ["A5", "A6", "A7", "A8"] },
		],
		visualMap: {
			"A": ["wire-A"],
			"B": ["wire-B"],
			"I0": ["wire-I0-A5"],
			"I1": ["wire-I1-A6"],
			"I2": ["wire-I2-A7"],
			"I3": ["wire-I3-A8"],
			"A1": ["wire-A1-A5"],
			"A2": ["wire-A2-A6"],
			"A3": ["wire-A3-A7"],
			"A4": ["wire-A4-A8"],
			"A5": ["wire-A5-O1"],
			"A6": ["wire-A6-O1"],
			"A7": ["wire-A7-O1"],
			"A8": ["wire-A8-O1"],
            "O1": ["wire-O1-X"]
		},
        truth: (inp) => [(!inp[0] & !inp[1] & inp[2]) |(!inp[0] & inp[1] & inp[3]) |(inp[0] & !inp[1] & inp[4]) |(inp[0] & inp[1] & inp[5])]
	},
	"full_adder": {
		inputs: ["A", "B", "Ci"],	
        outputs: [
            {id: "S", sources: "X2" },
            {id: "Co", sources: "O1" }
        ],	
		logic: [
			{ id: "X1", type: "XOR", sources: ["A", "B"] },
			{ id: "X2", type: "XOR", sources: ["X1", "Ci"] },
			{ id: "A1", type: "AND", sources: ["X1", "Ci"] },
			{ id: "A2", type: "AND", sources: ["A", "B"] },
			{ id: "O1", type: "OR",  sources: ["A1", "A2"] }
		],
		visualMap: {
			"A": ["wire-A", "wire-A-X1", "wire-A-A2"],
			"B": ["wire-B-X1", "wire-B-A2"],
            "Ci": ["wire-Ci-A1", "wire-Ci-X2"],
			"X1": ["wire-X1-X2", "wire-X1-A1"],
			"X2": ["wire-X2-S"],
			"A1": ["wire-A1-O1"],
			"A2": ["wire-A2-O1"],
			"O1": ["wire-O1-Co"]
		},
        truth: (inp) => [inp[0]^inp[1]^inp[2],(inp[0] & inp[1])|(inp[0] & inp[2])|(inp[1] & inp[2])]
	},
	"ripple_carry": {
		inputs: ["A0", "A1", "A2", "A3", "B0", "B1", "B2", "B3"],	
        outputs: [
            {id: "O", sources: "X1" },
            {id: "U", sources: "FAC3" },
            {id: "S3", sources: "FAS3" },
            {id: "S2", sources: "FAS2" },
            {id: "S1", sources: "FAS1" },
            {id: "S0", sources: "FAS0" }
        ],	
		logic: [
            { id: "FAS0", type: "SUM", sources: ["A0", "B0"] },
            { id: "FAC0", type: "CARRY", sources: ["A0", "B0"] },
            { id: "FAS1", type: "SUM", sources: ["A1", "B1", "FAC0"] },
            { id: "FAC1", type: "CARRY", sources: ["A1", "B1", "FAC0"] },
            { id: "FAS2", type: "SUM", sources: ["A2", "B2", "FAC1"] },
            { id: "FAC2", type: "CARRY", sources: ["A2", "B2", "FAC1"] },
            { id: "FAS3", type: "SUM", sources: ["A3", "B3", "FAC2"] },
            { id: "FAC3", type: "CARRY", sources: ["A3", "B3", "FAC2"] },
            { id: "X1", type: "XOR", sources: ["FAC2", "FAC3"] }
		],
		visualMap: {
			"A0": ["wire-A0-FA0"],
			"B0": ["wire-B0-FA0"],
			"A1": ["wire-A1-FA1"],
			"B1": ["wire-B1-FA1"],
			"A2": ["wire-A2-FA2"],
			"B2": ["wire-B2-FA2"],
			"A3": ["wire-A3-FA3"],
			"B3": ["wire-B3-FA3"],
            "FAS0": ["wire-FA0-S0"],
            "FAC0": ["wire-FA0-FA1"],
            "FAS1": ["wire-FA1-S1"],
            "FAC1": ["wire-FA1-FA2"],
            "FAS2": ["wire-FA2-S2"],
            "FAC2": ["wire-FA2-FA3", "wire-FA2-X1"],
            "FAS3": ["wire-FA3-S3"],
            "FAC3": ["wire-FA3-U", "wire-FA3-X1"],
			"X1": ["wire-X1-O"]
		},
        truth: (inp) => [Number((inp[0]+inp[4]+inp[1]*2+inp[5]*2+inp[2]*4+inp[6]*4+inp[3]*8+inp[7]*8) >= 16),
                        Number((inp[3] == inp[7]) & (inp[3] != Number(Math.floor((inp[0]+inp[4]+inp[1]*2+inp[5]*2+inp[2]*4+inp[6]*4+inp[3]*8+inp[7]*8)/8))%2)),
                        Number(Math.floor((inp[0]+inp[4]+inp[1]*2+inp[5]*2+inp[2]*4+inp[6]*4+inp[3]*8+inp[7]*8)/8)%2),
                        Number(Math.floor((inp[0]+inp[4]+inp[1]*2+inp[5]*2+inp[2]*4+inp[6]*4)/4)%2),
                        Number(Math.floor((inp[0]+inp[4]+inp[1]*2+inp[5]*2)/2)%2),
                        inp[0]^inp[4]]
	},
	"ex1": {
		inputs: ["A", "B", "C"],	
        outputs: [
            {id: "X", sources: "A2" }
        ],	
		logic: [
			{ id: "A1", type: "AND", sources: ["A", "B"] },
			{ id: "N1", type: "NOT", sources: ["A1"] },
			{ id: "O1", type: "NOR", sources: ["B", "C"] },
			{ id: "O2", type: "OR",  sources: ["A", "N1"] },
            { id: "A2", type: "AND", sources: ["O2", "O1"] }
		],
		visualMap: {
			"A": ["wire-A-O2", "wire-A-A1"],
			"B": ["wire-B-A1", "wire-B-O1"],
            "C": ["wire-C-O1"],
			"A1": ["wire-A1-N1"],
			"N1": ["wire-N1-O2"],
			"O1": ["wire-O1-A2"],
			"O2": ["wire-O2-A2"],
			"A2": ["wire-A2-X"]
		},
        truth: (inp) => [(inp[0] | !(inp[0] & inp[1])) & !(inp[1] | inp[2])]
	},
	"ex2": {
		inputs: ["A", "B", "C"],	
        outputs: [
            {id: "X", sources: "A2" }
        ],	
		logic: [
			{ id: "A1", type: "AND", sources: ["A", "B"] },
			{ id: "N1", type: "NOT", sources: ["A1"] },
			{ id: "O1", type: "OR", sources: ["B", "C"] },
			{ id: "O2", type: "NOR",  sources: ["A", "N1"] },
            { id: "A2", type: "AND", sources: ["O2", "O1"] }
		],
		visualMap: {
			"A": ["wire-A-O2", "wire-A-A1"],
			"B": ["wire-B-A1", "wire-B-O1"],
            "C": ["wire-C-O1"],
			"A1": ["wire-A1-N1"],
			"N1": ["wire-N1-O2"],
			"O1": ["wire-O1-A2"],
			"O2": ["wire-O2-A2"],
			"A2": ["wire-A2-X"]
		},
        truth: (inp) => [!(inp[0] | !(inp[0] & inp[1])) & (inp[1] | inp[2])]
	},
	"ex3": {
		inputs: ["A", "B", "C"],	
        outputs: [
            {id: "X", sources: "A2" }
        ],	
		logic: [
			{ id: "A1", type: "AND", sources: ["A", "B"] },
			{ id: "N1", type: "NOT", sources: ["A1"] },
			{ id: "O1", type: "OR", sources: ["B", "C"] },
			{ id: "O2", type: "OR",  sources: ["A", "N1"] },
            { id: "A2", type: "NAND", sources: ["O2", "O1"] }
		],
		visualMap: {
			"A": ["wire-A-O2", "wire-A-A1"],
			"B": ["wire-B-A1", "wire-B-O1"],
            "C": ["wire-C-O1"],
			"A1": ["wire-A1-N1"],
			"N1": ["wire-N1-O2"],
			"O1": ["wire-O1-A2"],
			"O2": ["wire-O2-A2"],
			"A2": ["wire-A2-X"]
		},
        truth: (inp) => [Number(!((inp[0] | !(inp[0] & inp[1])) & (inp[1] | inp[2])))]
	}
};



















let state = {
    currentKey: "",
    nodeValues: {}, // Stores 1, 0, or null for every ID
};

async function loadCircuit(filename) {
    try {
        const response = await fetch("./images/"+filename+".svg");
        const svgText = await response.text();
        document.getElementById('svg-host').innerHTML = svgText;
        
        state.currentKey = filename;
        state.isLocked = false;
        
        // Initialize all nodes to null (Unknown)
        state.nodeValues = {};
        const config = circuitManifest[filename];
        config.inputs.forEach(id => state.nodeValues[id] = 0);
        config.outputs.forEach(output => state.nodeValues[output.id] = null);
        config.logic.forEach(gate => state.nodeValues[gate.id] = null);

        setupInteraction();
        updateDisplay();
    } catch (e) {
        console.error("Server required to fetch SVGs. Run with Live Server.", e);
    }
}

function setupInteraction() {
    const config = circuitManifest[state.currentKey];
    config.inputs.forEach(id => {
        const el = document.getElementById(`in-${id}`);
        if (el) {
            el.style.cursor = "pointer";
            el.onclick = () => {
                state.nodeValues[id] = state.nodeValues[id] === 0 ? 1 : 0;
                updateDisplay();
            };
        }
    });
}

/**
 * THE CORE LOGIC ENGINE
 * Iterates through the manifest and calculates gate outputs
 */
function propagate() {
    const config = circuitManifest[state.currentKey];
    let nextValues = { ...state.nodeValues };

    for(let i = 0; i < 6; i ++ )
    {
        config.logic.forEach(gate => {
            const inputValues = gate.sources.map(srcId => state.nodeValues[srcId]);

            // Only calculate if all source inputs are known (0 or 1)
            if (inputValues.every(v => v !== null)) {
                switch(gate.type) {
                	case "AND":     nextValues[gate.id] = inputValues.every(v => v === 1) ? 1 : 0; break;
                	case "NAND":    nextValues[gate.id] = inputValues.every(v => v === 1) ? 0 : 1; break;
                	case "OR":      nextValues[gate.id] = inputValues.some(v => v === 1) ? 1 : 0; break;
                	case "NOR":     nextValues[gate.id] = inputValues.some(v => v === 1) ? 0 : 1; break;
                	case "NOT":     nextValues[gate.id] = inputValues[0] === 0 ? 1 : 0; break;
                	case "YES":     nextValues[gate.id] = inputValues[0]; break;
                	case "XOR":     nextValues[gate.id] = inputValues[0] ^ inputValues[1]; break;
                    case "XNOR":    nextValues[gate.id] = Number(inputValues[0] == inputValues[1]); break;
                    case "CARRY":   nextValues[gate.id] = Math.floor(( inputValues.reduce((acc,curr)=>acc+curr,0) )/2); break;
                    case "SUM":     nextValues[gate.id] = (inputValues.reduce((acc,curr)=>acc+curr,0))%2; break;
                }
            }
        });
        state.nodeValues = nextValues;
    }
}

function updateDisplay() {
    propagate();
    const config = circuitManifest[state.currentKey];
    
    // 1. Update Input Node Visuals
    config.inputs.forEach(id => {
        const el = document.getElementById(`in-${id}`);
        if (el) el.setAttribute('fill', state.nodeValues[id] ? '#ed8936' : '#cbd5e0');
    });

    // 2. Update Wires based on VisualMap
    // Every logic node (Input or Gate) can "own" multiple wires
    // ASSUMPTION: no wire is owned by multiple gates.
    Object.keys(state.nodeValues).forEach(nodeId => {
        const val = state.nodeValues[nodeId];
        const wireIds = config.visualMap[nodeId] || [];
        
        wireIds.forEach(wId => {
            const wireEl = document.getElementById(wId);
            if (wireEl) {
                wireEl.setAttribute('class', `logic-wire ${val === 1 ? 'on' : (val === 0 ? 'off' : '')}`);
            }
        });
    });

    config.outputs.forEach(output => {
        const el = document.getElementById(`out-${output.id}`);
        if (el) el.setAttribute('class', state.nodeValues[output.sources] ? 'on' : 'off');
    });

    renderTruthTable();
}

function renderTruthTable() {
    const config = circuitManifest[state.currentKey];
    const inputs = config.inputs;
    const container = document.getElementById('truth-table');
    let html = `<table><tr>${inputs.map(i => `<th>${i}</th>`).join('')}${config.outputs.map(i=> `<th>${i.id}</th>`).join('')}<th></th></tr>`;
    
    for(let i=0; i < Math.pow(2, inputs.length); i++) {
        const bits = i.toString(2).padStart(inputs.length, '0').split('').map(Number);
        const active = bits.every((b, idx) => b === state.nodeValues[inputs[idx]]);
        html += `<tr class="${active ? 'active-row' : ''}">${bits.map(b => `<td>${b}</td>`).join('')}${config.truth(bits).map(bit => `<td>${bit}</td>`).join('')}<td><button class="btn-select" onclick='selectRow([${bits}])'>select</button></td></tr>`;
    }
    container.innerHTML = html + `</table>`;
}

function random() {
    const config = circuitManifest[state.currentKey];
    config.inputs.forEach(id => {
        state.nodeValues[id] = Math.floor(Math.random()*2);
    });
    updateDisplay();
}

function zero() {
    const config = circuitManifest[state.currentKey];
    config.inputs.forEach(id => {
        state.nodeValues[id] = 0;
    });
    updateDisplay();

}
function selectRow(inputs) {
    const config = circuitManifest[state.currentKey];
    config.inputs.forEach((id, index) => {
        state.nodeValues[id] = inputs[index];
    });
    updateDisplay();
}
