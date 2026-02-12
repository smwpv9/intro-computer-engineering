/**
 * THE MANIFEST: Maps SVG components to Logic Rules
 */
const circuitManifest = {
	"sr_latch": {
		inputs: ["S", "R"],	
        outputs: [
            {id: "Q", sources: "O1" },
            {id: "NQ", sources: "O2" }
        ],	
		logic: [
            { id: "O1", type: "NOR", sources: ["R", "O2"], start_value: 0 },
            { id: "O2", type: "NOR", sources: ["S", "O1"] }
		],
		visualMap: {
			"S": ["wire-S-O2"],
            "R": ["wire-R-O1"],
            "O1": ["wire-O1-Q", "wire-O1-O2"],
            "O2": ["wire-O2-NQ", "wire-O2-O1"]
		},
        truth: ["No change in Q", "Q = 0", "Q = 1", "Problem"],
        detail: `This is an SR Latch. It is called a latch since it retains one value exactly like a latch. A latch can hold a door closed or it can hold a door open; the door does not change state without some input on it. The 'S' and 'R' are shorthand for the possible inputs. 'S' stands for set; as in set Q to 1. 'R' stands for reset; as in reset Q to 0. If both 'S' and 'R' are 0, then the latch does not have any input on it, so it holds Q to whatever value it is. If 'S' is 1, then Q is set to 1. If 'R' is 1, then Q is reset to 0. If both are 1, then the output does not make sense as Q = NOT(Q); the circuit is in a race condition. 'S' or 'R' will change back to 0 at some point and the other's effect will remain on Q.`
	},
	"d_latch": {
		inputs: ["WE", "D"],	
        outputs: [
            {id: "Q", sources: "O1" },
            {id: "NQ", sources: "O2" }
        ],	
		logic: [
            { id: "N1", type: "NOT", sources: ["D"] },
            { id: "A1", type: "AND", sources: ["N1", "WE"] },
            { id: "A2", type: "AND", sources: ["D", "WE"] },
            { id: "O1", type: "NOR", sources: ["A1", "O2"], start_value: 0 },
            { id: "O2", type: "NOR", sources: ["A2", "O1"] }
		],
		visualMap: {
			"D": ["wire-D-N1", "wire-D-A2"],
            "WE": ["wire-WE-A1", "wire-WE-A2"],
            "A1": ["wire-A1-O1"],
            "A2": ["wire-A2-O2"],
            "O1": ["wire-O1-Q", "wire-O1-O2"],
            "O2": ["wire-O2-NQ", "wire-O2-O1"],
		},
        truth: ["No change in Q", "No change in Q", "Q = 0", "Q = 1"],
        detail: `This is a D Latch. It is an extension of the SR Latch to remove the problematic inputs. D stands for Data. WE stands for Write Enable. The latch only changes if Write Enable is set to 1; otherwise, it holds onto what Q is.`
	},
	"d_flipflop": {
		inputs: ["CLK", "D"],	
        outputs: [
            {id: "M", sources: "DL1"},
            {id: "Q", sources: "DL2" }
        ],	
		logic: [
            { id: "N1", type: "NOT", sources: ["CLK"] },
            { id: "DL1", type: "DLATCH", sources: ["D", "N1"], start_value: 0 },
            { id: "DL2", type: "DLATCH", sources: ["DL1", "CLK"], start_value: 0 }
		],
		visualMap: {
			"D": ["wire-D-DL1"],
            "CLK": ["wire-CLK-N1", "wire-CLK-DL2"],
            "N1": ["wire-N1-DL1"],
            "DL1": ["wire-DL1-DL2", "wire-DL1-M"],
            "DL2": ["wire-DL2-Q"]
		},
        truth: ["No change in Q. M = 0", "No change in Q. M = 1", "Q = M. D has no effect.", "Q = M. D has no effect."],
        detail: `This is a D Flipflop. D stands for Data. CLK stands for CLocK. It uses two D Latches back to back to create a time delay; it delays D from appearing on Q by one clock cycle. In this case, the rising edge of the Clock, going from 0 to 1, is when Q will update to the value of D at that time. `
	},
	"cell": {
		inputs: ["WE", "S", "D"],	
        outputs: [
            {id: "X", sources: "A2" },
        ],	
		logic: [
            { id: "A1", type: "AND", sources: ["WE", "S"] },
            { id: "DL1", type: "DLATCH", sources: ["D", "A1"], start_value: 0 },
            { id: "A2", type: "AND", sources: ["S", "DL1"] }
		],
		visualMap: {
			"WE": ["wire-WE-A1"],
            "S": ["wire-S-A1", "wire-S-A2"],
            "D": ["wire-D-DL1"],
            "A1": ["wire-A1-DL1"],
            "DL1": ["wire-DL1-A2"],
            "A2": ["wire-A2-X"]
		},
        truth: ["Nothing happens", "Nothing happens", "The cell is read", "The cell is read", "The cell is wrote with a 0", "The cell is wrote with a 1", "The cell is read while being wrote with a 0", "The cell is read while being wrote with a 1"],
        detail: `This is a memory cell. It holds one bit and has extra gates around it to control reading and writing. WE stands for Write Enable, S stands for Select, and D stands for Data. `
	},
	"memory": {
		inputs: ["A0", ],	
        outputs: [
            {id: "O", sources: "X1" },
        ],	
		logic: [
            { id: "FAS0", type: "SUM", sources: ["A0", "B0"] },
		],
		visualMap: {
			"A0": ["wire-A0-FA0"],
		},
        truth: (inp) => [Num],
        detail: ``
	},
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
        
        // Initialize all nodes to null (Unknown)
        state.nodeValues = {};
        const config = circuitManifest[filename];
        config.inputs.forEach(id => state.nodeValues[id] = 0);
        config.outputs.forEach(output => state.nodeValues[output.id] = null);
        config.logic.forEach(gate => state.nodeValues[gate.id] = gate.start_value);
        document.getElementById('detail').innerHTML = config.detail;

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
                    case "DLATCH":  nextValues[gate.id] = inputValues[1] === 1 ? inputValues[0] : state.nodeValues[gate.id];
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
    let html = `<table><tr>${inputs.map(i => `<th>${i}</th>`).join('')}<th>Action</th><th></th></tr>`;
    
    for(let i=0; i < Math.pow(2, inputs.length); i++) {
        const bits = i.toString(2).padStart(inputs.length, '0').split('').map(Number);
        const active = bits.every((b, idx) => b === state.nodeValues[inputs[idx]]);
        html += `<tr class="${active ? 'active-row' : ''}">${bits.map(b => `<td>${b}</td>`).join('')}<td>${config.truth[i]}</td><td><button class="btn-select" onclick='selectRow([${bits}])'>select</button></td></tr>`;
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
