
/**
 * THE MANIFEST: Maps SVG components to Logic Rules
 */
const circuitManifest = {
    "tran_pmos": {
        inputs: ["A"],
        outputs: [
            { id: "X", source: ["P1"] }
        ],
        power: ["S1"],
        ground: [],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] }
        ],
        nets: [
            { id: "wire-A-P1", source: ["A"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-P1-X", source: ["P1"] }
        ],
        truth: (inp) => [inp[0] ? null : 1]
    },
    "tran_nmos": {
        inputs: ["A"],
        outputs: [
            { id: "X", source: ["N1"] },
		],
        power: [],
        ground: ["G1"],
        logic: [
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] }
        ],
        nets: [
            { id: "wire-A-N1", source: ["A"] },
            { id: "wire-G1-N1", source: ["G1"] },
            { id: "wire-N1-X", source: ["N1"] }
        ],
        truth: (inp) => [inp[0] ? 0 : null]
    },
    "tran_not": {
        inputs: ["A"],
        outputs: [
            { id: "X", source: ["P1", "N1"] }
        ],
        power: ["S1"],
        ground: ["G1"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-G1-N1", source: ["G1"] },
            { id: "wire-C1-X", source: ["P1", "N1"] }
        ],
        truth: (inp) => [!inp[0]]
    },
    "tran_nand": {
        inputs: ["A", "B"],
        outputs: [
            {id: "X", source: ["P1", "P2", "N1"] }
        ],
        power: ["S1", "S2"],
        ground: ["G1"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["S2"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["N2"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-B", source: ["B"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-S2-P2", source: ["S2"] },
            { id: "wire-G1-N2", source: ["G1"] },
            { id: "wire-N2-N1", source: ["N2"] },
            { id: "wire-C1-X", source: ["P1", "P2", "N1"] }
        ],
        truth: (inp) => [!(inp[0] & inp[1])]
    },
    "tran_and": {
        inputs: ["A", "B"],
        outputs: [
            { id: "X", source: ["P3", "N3"] }
        ],
        power: ["S1", "S2", "S3"],
        ground: ["G1", "G2"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["S2"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["N2"] },
	        { id: "P3", type: "PMOS", gate: ["P1", "P2", "N1"], power: ["S3"] },
	        { id: "N3", type: "NMOS", gate: ["P1", "P2", "N1"], power: ["G2"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-B", source: ["B"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-S2-P2", source: ["S2"] },
            { id: "wire-G1-N2", source: ["G1"] },
            { id: "wire-N2-N1", source: ["N2"] },
            { id: "wire-C1", source: ["P1", "P2", "N1"] },
            { id: "wire-S3-P3", source: ["S3"] },
            { id: "wire-G2-N3", source: ["G2"] },
            { id: "wire-C2-X", source: ["P3", "N3"] }
        ],
        truth: (inp) => [inp[0] & inp[1]]
    },
    "tran_nor": {
        inputs: ["A", "B"],
        outputs: [
			{ id: "X", source: ["P2", "N1", "N2"] }
		],
        power: ["S1"],
        ground: ["G1", "G2"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["P1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G2"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-B", source: ["B"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-P1-P2", source: ["P1"] },
            { id: "wire-G1-N1", source: ["G1"] },
            { id: "wire-G2-N2", source: ["G2"] },
            { id: "wire-C1-X", source: ["P2", "N1", "N2"] }
        ],
        truth: (inp) => [!(inp[0] | inp[1])]
    },
    "tran_or": {
        inputs: ["A", "B"],
        outputs: [
			{ id: "X", source: ["P3", "N3"] }
		],
        power: ["S1", "S2"],
        ground: ["G1", "G2", "G3"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["P1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G2"] },
	        { id: "P3", type: "PMOS", gate: ["P2", "N1", "N2"], power: ["S2"] },
	        { id: "N3", type: "NMOS", gate: ["P2", "N1", "N2"], power: ["G3"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-B", source: ["B"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-P1-P2", source: ["P1"] },
            { id: "wire-G1-N1", source: ["G1"] },
            { id: "wire-G2-N2", source: ["G2"] },
            { id: "wire-C1", source: ["P2", "N1", "N2"] },
            { id: "wire-S2-P3", source: ["S2"] },
            { id: "wire-G3-N3", source: ["G3"] },
            { id: "wire-C2-X", source: ["P3", "N3"] }
        ],
        truth: (inp) => [inp[0] | inp[1]]
    },
    "tran_cout": { // TODO
        inputs: ["A", "B"],
        outputs: [
            { id: "X", source: ["P3", "N3"] }
		],
        power: ["S1", "S2"],
        ground: ["G1", "G2", "G3"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["P1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G2"] },
	        { id: "P3", type: "PMOS", gate: ["P2", "N1", "N2"], power: ["S2"] },
	        { id: "N3", type: "NMOS", gate: ["P2", "N1", "N2"], power: ["G3"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-B", source: ["B"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-P1-P2", source: ["P1"] },
            { id: "wire-G1-N1", source: ["G1"] },
            { id: "wire-G2-N2", source: ["G2"] },
            { id: "wire-C1", source: ["P2", "N1", "N2"] },
            { id: "wire-S2-P3", source: ["S2"] },
            { id: "wire-G3-N3", source: ["G3"] },
            { id: "wire-C2-X", source: ["P3", "N3"] }
        ],
        truth: (inp) => [(inp[0] & inp[1]) | (inp[0] & inp[2]) | (inp[1] & inp[2])]
    },
    "tran_sum": { // TODO
        inputs: ["A", "B", "Cin"],
        outputs: [
			{ id: "Sum", source: ["P3", "N3"] }
		],
        power: ["S1", "S2"],
        ground: ["G1", "G2", "G3"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["P1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G2"] },
	        { id: "P3", type: "PMOS", gate: ["P2", "N1", "N2"], power: ["S2"] },
	        { id: "N3", type: "NMOS", gate: ["P2", "N1", "N2"], power: ["G3"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-B", source: ["B"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-P1-P2", source: ["P1"] },
            { id: "wire-G1-N1", source: ["G1"] },
            { id: "wire-G2-N2", source: ["G2"] },
            { id: "wire-C1", source: ["P2", "N1", "N2"] },
            { id: "wire-S2-P3", source: ["S2"] },
            { id: "wire-G3-N3", source: ["G3"] },
            { id: "wire-C2-X", source: ["P3", "N3"] }
        ],
        truth: (inp) => [inp[0] ^ inp[1] ^ inp[2]]
    },
    "tran_ex1": {
        inputs: ["A", "B", "C"],
        outputs: [
			{ id: "X", source: ["P5", "N4", "N5"] }
		],
        power: ["S1", "S2", "S3", "S4"],
        ground: ["G1", "G2", "G3", "G4"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["S2"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["N2"] },
	        { id: "P3", type: "PMOS", gate: ["P1", "P2", "N1"], power: ["S3"] },
	        { id: "N3", type: "NMOS", gate: ["P1", "P2", "N1"], power: ["G2"] },
            { id: "P4", type: "PMOS", gate: ["P3", "N3"], power: ["S4"] },
            { id: "P5", type: "PMOS", gate: ["C"], power: ["P4"] },
            { id: "N4", type: "NMOS", gate: ["P3", "N3"], power: ["G3"] },
            { id: "N5", type: "NMOS", gate: ["C"], power: ["G4"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-B", source: ["B"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-P1-P2", source: ["P1"] },
            { id: "wire-G1-N1", source: ["G1"] },
            { id: "wire-G2-N2", source: ["G2"] },
            { id: "wire-C1", source: ["P2", "N1", "N2"] },
            { id: "wire-S2-P3", source: ["S2"] },
            { id: "wire-G3-N3", source: ["G3"] },
            { id: "wire-C2", source: ["P3", "N3"] },
            { id: "wire-S4-P4", source: ["S4"] },
            { id: "wire-P4-P5", source: ["P4"] },
            { id: "wire-G3-N4", source: ["G4"] },
            { id: "wire-G4-N5", source: ["G5"] },
            { id: "wire-C", sourece: ["C"] },
            { id: "wire-C3-X", source: ["P5", "N4", "N5"] }
        ],
        truth: (inp) => [!((inp[0] & inp[1]) | inp[2])]
    },
    "tran_ex2": {
        inputs: ["A", "B", "C"],
        outputs: [
			{ id: "X", source: ["P4", "P5", "N4"] }
		],
        power: ["S1", "S2", "S3", "S4"],
        ground: ["G1", "G2", "G3", "G4"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["P1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G2"] },
	        { id: "P3", type: "PMOS", gate: ["P2", "N1", "N2"], power: ["S2"] },
	        { id: "N3", type: "NMOS", gate: ["P2", "N1", "N2"], power: ["G3"] },
            { id: "P4", type: "PMOS", gate: ["P3", "N3"], power: ["S3"] },
            { id: "P5", type: "PMOS", gate: ["C"], power: ["S4"] },
            { id: "N5", type: "NMOS", gate: ["C"], power: ["G4"] },
            { id: "N4", type: "NMOS", gate: ["P3", "N3"], power: ["N5"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-B", source: ["B"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-P1-P2", source: ["P1"] },
            { id: "wire-G1-N1", source: ["G1"] },
            { id: "wire-G2-N2", source: ["G2"] },
            { id: "wire-C1", source: ["P2", "N1", "N2"] },
            { id: "wire-S2-P3", source: ["S2"] },
            { id: "wire-G3-N3", source: ["G3"] },
            { id: "wire-C2", source: ["P3", "N3"] },
            { id: "wire-S3-P4", source: ["S3"] },
            { id: "wire-S4-P5", source: ["S4"] },
            { id: "wire-C", source: ["C"] },
            { id: "wire-G4-N5", source: ["G4"] },
            { id: "wire-N5-N4", source: ["N5"] },
            { id: "wire-C3-X", source: ["P4", "P5", "N4"] }
        ],
        truth: (inp) => [!((inp[0] | inp[1]) & inp[2])]
    },
    "tran_ex3": {
        inputs: ["A", "B", "C"],
        outputs: [
			{ id: "X", source: ["P4", "N4"] }
        ],
        power: ["S1", "S2", "S3", "S4"],
        ground: ["G1", "G2"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["S2"] },
            { id: "P3", type: "PMOS", gate: ["C"], power: ["S3"] },
            { id: "N3", type: "NMOS", gate: ["C"], power: ["G1"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["N3"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["N2"] },
	        { id: "P4", type: "PMOS", gate: ["P1", "P2", "P3", "N3"], power: ["S4"] },
	        { id: "N4", type: "NMOS", gate: ["P1", "P2", "P3", "N3"], power: ["G2"] }
        ],
        nets: [
            { id: "wire-A", source: ["A"] },
            { id: "wire-B", source: ["B"] },
            { id: "wire-C", source: ["C"] },
            { id: "wire-S1-P1", source: ["S1"] },
            { id: "wire-S2-P2", source: ["S2"] },
            { id: "wire-S3-P3", source: ["S3"] },
            { id: "wire-G1-N3", source: ["G1"] },
            { id: "wire-N3-N2", source: ["N3"] },
            { id: "wire-N2-N1", source: ["N2"] },
            { id: "wire-C1", source: ["P1", "P2", "P3", "N3"] },
            { id: "wire-S4-P4", source: ["S4"] },
            { id: "wire-G2-N4", source: ["G2"] },
            { id: "wire-C2-X", source: ["P4", "N4"] }
        ],
        truth: (inp) => [inp[0] & inp[1] & inp[2]]
    }
};










let state = {
    currentKey: "",
    nodeValues: {} // Stores 1, 0, or null for every ID
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
        config.outputs.forEach(id => state.nodeValues[id] = null);
        config.power.forEach(sourceId => state.nodeValues[sourceId] = 1);
        config.ground.forEach(groundId => state.nodeValues[groundId] = 0);
        config.logic.forEach(tran => state.nodeValues[tran.id] = null);
        config.nets.forEach(wire => state.nodeValues[wire.id] = null);

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
 * Iterates through the manifest
 *  inputs are already set
 * as well as powers and grounds
 * then gates are calculated
 * then wires are set from the gates
 * finally, outputs are set from the gates
 */
function propagate() {
    const config = circuitManifest[state.currentKey];
    const nextValues = { ...state.nodeValues };

    for(let i = 0; i < 6; i ++)
    {
        config.logic.forEach(tran => {
            const gateValues = tran.gate.map(srcId => state.nodeValues[srcId]);
            const powerValues = tran.power.map(srcId => state.nodeValues[srcId]);
            let powerValue = null;
            if(powerValues.some(v => v === 0 || v >= 2))
                powerValue = 0;
            if(powerValues.some(v => v === 1 || v >= 2))
                powerValue = 1;
            if(powerValues.every(v => v >= 2))
                powerValue = 3

            // Only calculate if all source inputs are known (0 or 1)
            if (gateValues.every(v => v !== null)) {
                if (tran.type === "PMOS") nextValues[tran.id] = gateValues.every(v => v === 0 || v >= 2) ? powerValue : 2;
                if (tran.type === "NMOS") nextValues[tran.id] = gateValues.every(v => v === 1 || v >= 2) ? powerValue : 2;
            }
        });

        state.nodeValues = nextValues;
    }
    config.nets.forEach(wire => {
        // Get the values of all gates/inputs driving this specific net
        const driverValues = wire.source.map(dId => state.nodeValues[dId]);

        // RESOLUTION LOGIC:
        // - If any driver is 1, the net is 1 (Wired-OR behavior)
        // - If all drivers are 0, the net is 0
        // - If any driver is null and no driver is 1, the net is unknown
        let finalState = 0;
        if (driverValues.includes(1)) {
            finalState = 1;
        } else if (driverValues.includes(null)) {
            finalState = null; 
        } else if (driverValues.every(v => v === 2)) {
            finalState = null;
        }
        // OPTIONAL: Add a conflict class if multiple drivers disagree
        const activeDrivers = driverValues.filter(v => v !== null).filter(v => v !== 2).filter(v => v !== 3);
        const isConflict = new Set(activeDrivers).size > 1;

        if (isConflict) finalState = 3;
        nextValues[wire.id] = finalState;
    });
    config.outputs.forEach(output => {
        // Get the values of all gates/inputs driving this specific net
        const driverValues = output.source.map(dId => state.nodeValues[dId]);

        // RESOLUTION LOGIC:
        // - If any driver is 1, the net is 1 (Wired-OR behavior)
        // - If all drivers are 0, the net is 0
        // - If any driver is null and no driver is 1, the net is unknown
        let finalState = 0;
        if (driverValues.includes(1)) {
            finalState = 1;
        } else if (driverValues.includes(null)) {
            finalState = null; 
        } else if (driverValues.every(v => v === 2)) {
            finalState = null;
        }
        // OPTIONAL: Add a conflict class if multiple drivers disagree
        const activeDrivers = driverValues.filter(v => v !== null).filter(v => v !== 2).filter(v => v !== 3);
        const isConflict = new Set(activeDrivers).size > 1;

        if (isConflict) finalState = 3;
        nextValues[output.id] = finalState;
    });
    state.nodeValues = nextValues;
    return;
}

function updateDisplay() {
    propagate();
    const config = circuitManifest[state.currentKey];
    
    // 1. Update Input Node Visuals
    config.inputs.forEach(id => {
        const el = document.getElementById(`in-${id}`);
        if (el) el.setAttribute('fill', state.nodeValues[id] ? '#ed8936' : '#cbd5e0');
    });


    // 2. Update transistor visuals
    config.logic.forEach(tran => {
        const el = document.getElementById(`tran-${tran.id}`);
        if(el)
            if(state.nodeValues[tran.id] === null || state.nodeValues[tran.id] === 2) el.setAttribute('class', "hide");
            else if(state.nodeValues[tran.id] === 0) el.setAttribute('class', "logic-wire off");
            else if(state.nodeValues[tran.id] === 1) el.setAttribute('class', "logic-wire on");
            else if(state.nodeValues[tran.id] === 3) el.setAttribute('class', "logic-wire");
    });

    // 3. Resolve and Update Nets
    config.nets.forEach(wire => {
        const wireEl = document.getElementById(wire.id);
        if (wireEl) {
            let className = 'logic-wire';
            if (state.nodeValues[wire.id] === 1) className += ' on';
            else if (state.nodeValues[wire.id] === 0) className += ' off';
            else if (state.nodeValues[wire.id] === 3) className += ' conflict';
            
   
            wireEl.setAttribute('class', className);
        }
    });

    config.outputs.forEach(output => {
        const el = document.getElementById(`out-${output.id}`);
        let className = 'conflict';
        if (state.nodeValues[output.id] === 1) className = 'on';
        else if (state.nodeValues[output.id] === 0) className = 'off';
        if (el) el.setAttribute('class', className);
    });

    renderTruthTable();
}

function renderTruthTable() {
    const config = circuitManifest[state.currentKey];
    const inputs = config.inputs;
    const container = document.getElementById('truth-table');
    let html = `<table><tr>${inputs.map(i => `<th>${i}</th>`).join('')}${config.outputs.map(i=> `<th>${i.id}</th>`)}<th></th></tr>`;
    
    for(let i=0; i < Math.pow(2, inputs.length); i++) {
        const bits = i.toString(2).padStart(inputs.length, '0').split('').map(Number);
        const active = bits.every((b, idx) => b === state.nodeValues[inputs[idx]]);
        html += `<tr class="${active ? 'active-row' : ''}">${bits.map(b => `<td>${b}</td>`).join('')}<td>${config.truth(bits).map(Number)}</td><td><button class="btn-select" onclick='selectRow([${bits}])'>select</button></td></tr>`;
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
