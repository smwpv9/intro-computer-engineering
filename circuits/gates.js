/**
 * THE MANIFEST: Maps SVG components to Logic Rules
 */
const circuitManifest = {
	"nand": {
		inputs: ["A", "B"],
		logic: [
			{ id: "G1", type: "NAND", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		}
	},
	"and": {
		inputs: ["A", "B"],		
		logic: [
			{ id: "G1", type: "AND", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		}
	},
	"or": {
		inputs: ["A", "B"],		
		logic: [
			{ id: "G1", type: "OR", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		}
	},
	"nor": {
		inputs: ["A", "B"],		
		logic: [
			{ id: "G1", type: "NOR", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		}
	},
	"not": {
		inputs: ["A"],		
		logic: [
			{ id: "G1", type: "NOT", sources: ["A"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"G1": ["wire-G1-X"]
		}
	},
	"yes": {
		inputs: ["A"],		
		logic: [
			{ id: "G1", type: "YES", sources: ["A"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"G1": ["wire-G1-X"]
		}
	},
	"xor": {
		inputs: ["A", "B"],		
		logic: [
			{ id: "G1", type: "XOR", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		}
	},
	"xnor": {
		inputs: ["A", "B"],		
		logic: [
			{ id: "G1", type: "XNOR", sources: ["A", "B"] },
		],
		visualMap: {
			"A": ["wire-A-G1"],
			"B": ["wire-B-G1"],
			"G1": ["wire-G1-X"]
		}
	},
	"exploded_xor": {
		inputs: ["A", "B"],		
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
		}
	},
	"ex1": { //TODO
		inputs: ["A", "B"],		
		logic: [
			{ id: "N1", type: "NOT", sources: ["A"] },
			{ id: "N2", type: "NOT", sources: ["B"] },
			{ id: "A1", type: "AND", sources: ["A", "N1"] },
			{ id: "A2", type: "AND", sources: ["N2", "B"] },
			{ id: "O1", type: "OR",  sources: ["A1", "A2"] }
		],
		visualMap: {
			"A": ["wire-A-N2", "wire-A-A1"],
			"B": ["wire-B-N1", "wire-B-A2"],
			"N1": ["wire-N1-A1"],
			"N2": ["wire-N2-A2"],
			"A1": ["wire-A1-O1"],
			"A2": ["wire-A2-O1"],
			"O1": ["wire-O1-X"]
		}
	},
	"ex2": { //TODO
		inputs: ["A", "B"],		
		logic: [
			{ id: "N1", type: "NOT", sources: ["A"] },
			{ id: "N2", type: "NOT", sources: ["B"] },
			{ id: "A1", type: "AND", sources: ["A", "N1"] },
			{ id: "A2", type: "AND", sources: ["N2", "B"] },
			{ id: "O1", type: "OR",  sources: ["A1", "A2"] }
		],
		visualMap: {
			"A": ["wire-A-N2", "wire-A-A1"],
			"B": ["wire-B-N1", "wire-B-A2"],
			"N1": ["wire-N1-A1"],
			"N2": ["wire-N2-A2"],
			"A1": ["wire-A1-O1"],
			"A2": ["wire-A2-O1"],
			"O1": ["wire-O1-X"]
		}
	},
	"ex3": { //TODO
		inputs: ["A", "B"],		
		logic: [
			{ id: "N1", type: "NOT", sources: ["A"] },
			{ id: "N2", type: "NOT", sources: ["B"] },
			{ id: "A1", type: "AND", sources: ["A", "N1"] },
			{ id: "A2", type: "AND", sources: ["N2", "B"] },
			{ id: "O1", type: "OR",  sources: ["A1", "A2"] }
		],
		visualMap: {
			"A": ["wire-A-N2", "wire-A-A1"],
			"B": ["wire-B-N1", "wire-B-A2"],
			"N1": ["wire-N1-A1"],
			"N2": ["wire-N2-A2"],
			"A1": ["wire-A1-O1"],
			"A2": ["wire-A2-O1"],
			"O1": ["wire-O1-X"]
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

    config.logic.forEach(gate => {
        const inputValues = gate.sources.map(srcId => state.nodeValues[srcId]);

        // Only calculate if all source inputs are known (0 or 1)
        if (inputValues.every(v => v !== null)) {
            if (gate.type === "AND") nextValues[gate.id] = inputValues.every(v => v === 1) ? 1 : 0;
            if (gate.type === "NAND") nextValues[gate.id] = inputValues.every(v => v === 1) ? 0 : 1;
            if (gate.type === "OR")  nextValues[gate.id] = inputValues.some(v => v === 1) ? 1 : 0;
            if (gate.type === "NOR")  nextValues[gate.id] = inputValues.some(v => v === 1) ? 0 : 1;
            if (gate.type === "NOT") nextValues[gate.id] = inputValues[0] === 0 ? 1 : 0;
            if (gate.type === "YES") nextValues[gate.id] = inputValues[0];
            if (gate.type === "XOR") nextValues[gate.id] = inputValues[0] ^ inputValues[1];
            if (gate.type === "XNOR") nextValues[gate.id] = inputValues[0] == inputValues[1];
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

    renderTruthTable();
}

function renderTruthTable() {
    // Dynamic Truth Table Logic based on state.nodeValues
    // (Simplified for brevity; mirrors previous versions)
}

function resetSim() { loadCircuit(state.currentKey); }

loadCircuit("and");
