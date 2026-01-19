
/**
 * THE MANIFEST: Maps SVG components to Logic Rules
 */
const circuitManifest = {
    "tran_pmos": {
        inputs: ["A"],
        power: ["S1"],
        ground: [],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] }
        ],
        nets: {
            "wire-A-P1": ["A"],
            "wire-S1-P1": ["S1"],
            "wire-P1-X": ["P1"]
        }
    },
    "tran_nmos": {
        inputs: ["A"],
        power: [],
        ground: ["G1"],
        logic: [
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] }
        ],
        nets: {
            "wire-A-N1": ["A"],
            "wire-G1-N1": ["G1"],
            "wire-N1-X": ["P3", "N3"]
        }
    },
    "tran_not": {
        inputs: ["A"],
        power: ["S1"],
        ground: ["G1"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] }
        ],
        nets: {
            "wire-A": ["A"],
            "wire-S1-P1": ["S1"],
            "wire-G1-N1": ["G1"],
            "wire-C1-X": ["P3", "N3"]
        }
    },
    "tran_nand": {
        inputs: ["A", "B"],
        power: ["S1", "S2"],
        ground: ["G1"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["S2"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["N2"] }
        ],
        nets: {
            "wire-A": ["A"],
            "wire-B": ["B"],
            "wire-S1-P1": ["S1"],
            "wire-S2-P2": ["S2"],
            "wire-G1-N2": ["G1"],
            "wire-N2-N1": ["N2"],
            "wire-C1-X": ["P1", "P2", "N1"]
        }
    },
    "tran_and": {
        inputs: ["A", "B"],
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
        nets: {
            "wire-A": ["A"],
            "wire-B": ["B"],
            "wire-S1-P1": ["S1"],
            "wire-S2-P2": ["S2"],
            "wire-G1-N2": ["G1"],
            "wire-N2-N1": ["N2"],
            "wire-C1": ["P1", "P2", "N1"],
            "wire-S3-P3": ["S3"],
            "wire-G2-N3": ["G2"],
            "wire-C2-X": ["P3", "N3"]
        }
    },
    "tran_nor": {
        inputs: ["A", "B"],
        power: ["S1"],
        ground: ["G1", "G2"],
        logic: [
	        { id: "P1", type: "PMOS", gate: ["A"], power: ["S1"] },
	        { id: "P2", type: "PMOS", gate: ["B"], power: ["P1"] },
	        { id: "N1", type: "NMOS", gate: ["A"], power: ["G1"] },
	        { id: "N2", type: "NMOS", gate: ["B"], power: ["G2"] }
        ],
        nets: {
            "wire-A": ["A"],
            "wire-B": ["B"],
            "wire-S1-P1": ["S1"],
            "wire-P1-P2": ["P1"],
            "wire-G1-N1": ["G1"],
            "wire-G2-N2": ["G2"],
            "wire-C1-X": ["P2", "N1", "N2"]
        }
    },
    "tran_or": {
        inputs: ["A", "B"],
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
        nets: {
            "wire-A": ["A"],
            "wire-B": ["B"],
            "wire-S1-P1": ["S1"],
            "wire-P1-P2": ["P1"],
            "wire-G1-N1": ["G1"],
            "wire-G2-N2": ["G2"],
            "wire-C1": ["P2", "N1", "N2"],
            "wire-S2-P3": ["S2"],
            "wire-G3-N3": ["G3"],
            "wire-C2-X": ["P3", "N3"]
        }
    },
    "tran_ex1": { //TODO
        inputs: ["A", "B"],
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
        nets: {
            "wire-A": ["A"],
            "wire-B": ["B"],
            "wire-S1-P1": ["S1"],
            "wire-P1-P2": ["P1"],
            "wire-G1-N1": ["G1"],
            "wire-G2-N2": ["G2"],
            "wire-C1": ["P2", "N1", "N2"],
            "wire-S2-P3": ["S2"],
            "wire-G3-N3": ["G3"],
            "wire-C2-X": ["P3", "N3"]
        }
    },
    "tran_ex2": { //TODO
        inputs: ["A", "B"],
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
        nets: {
            "wire-A": ["A"],
            "wire-B": ["B"],
            "wire-S1-P1": ["S1"],
            "wire-P1-P2": ["P1"],
            "wire-G1-N1": ["G1"],
            "wire-G2-N2": ["G2"],
            "wire-C1": ["P2", "N1", "N2"],
            "wire-S2-P3": ["S2"],
            "wire-G3-N3": ["G3"],
            "wire-C2-X": ["P3", "N3"]
        }
    },
    "tran_ex3": { //TODO
        inputs: ["A", "B"],
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
        nets: {
            "wire-A": ["A"],
            "wire-B": ["B"],
            "wire-S1-P1": ["S1"],
            "wire-P1-P2": ["P1"],
            "wire-G1-N1": ["G1"],
            "wire-G2-N2": ["G2"],
            "wire-C1": ["P2", "N1", "N2"],
            "wire-S2-P3": ["S2"],
            "wire-G3-N3": ["G3"],
            "wire-C2-X": ["P3", "N3"]
        }
    }
};










let state = {
    currentKey: "",
    nodeValues: {}, // Stores 1, 0, or null for every logic ID
    isLocked: false
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
        config.power.forEach(sourceId => state.nodeValues[sourceId] = 1);
        config.ground.forEach(groundId => state.nodeValues[groundId] = 0);
        config.logic.forEach(tran => state.nodeValues[tran.id] = null);

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
                if (state.isLocked) return;
                state.nodeValues[id] = state.nodeValues[id] === 0 ? 1 : 0;
                // Reset gate values on input change
                config.logic.forEach(g => state.nodeValues[g.id] = null);
                updateDisplay();
            };
        }
    });
}

/**
 * THE CORE LOGIC ENGINE
 * Iterates through the manifest and calculates gate outputs
 */
function propagateStep() {
    state.isLocked = true;
    const config = circuitManifest[state.currentKey];
    const nextValues = { ...state.nodeValues };

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
    updateDisplay();
}

function updateDisplay() {
    const config = circuitManifest[state.currentKey];
    
    // 1. Update Input Node Visuals
    config.inputs.forEach(id => {
        const el = document.getElementById(`in-${id}`);
        if (el) el.setAttribute('fill', state.nodeValues[id] ? '#ed8936' : '#475569');
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
    Object.keys(config.nets).forEach(netId => {
        const net = config.nets[netId];
        // Get the values of all gates/inputs driving this specific net
        const driverValues = net.map(dId => state.nodeValues[dId]);

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

        const wireEl = document.getElementById(netId);
        if (wireEl) {
            let className = 'logic-wire';
            if (finalState === 1) className += ' on';
            else if (finalState === 0) className += ' off';
            
            // OPTIONAL: Add a conflict class if multiple drivers disagree
            const activeDrivers = driverValues.filter(v => v !== null).filter(v => v !== 2).filter(v => v !== 3);
            const isConflict = new Set(activeDrivers).size > 1;
            if (isConflict) className += ' conflict'; 

            wireEl.setAttribute('class', className);
        }
    });

    renderTruthTable();
}

function renderTruthTable() {
    // Dynamic Truth Table Logic based on state.nodeValues
    // (Simplified for brevity; mirrors previous versions)
}

function resetSim() { loadCircuit(state.currentKey); }

loadCircuit("tran_pmos");
