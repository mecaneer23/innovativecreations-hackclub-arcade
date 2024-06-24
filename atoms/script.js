document.getElementById('atom-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const atomicNumber = document.getElementById('atomic-number').value;

    if (atomicNumber < 1 || atomicNumber > 118) {
        alert("Please enter a valid atomic number (1-118).");
        return;
    }

    console.log('Atomic Number:', atomicNumber);

    document.getElementById('loading').style.display = 'block';
    document.getElementById('atom-info').innerHTML = '';
    document.getElementById('orbital-svg').innerHTML = '';

    setTimeout(() => {
        const atoms = {
            1: { name: 'Hydrogen', symbol: 'H', atomicMass: 1.008, state: 'Gas', electronConfig: '1s1', orbitals: [1] },
            2: { name: 'Helium', symbol: 'He', atomicMass: 4.0026, state: 'Gas', electronConfig: '1s2', orbitals: [2] },
            3: { name: 'Lithium', symbol: 'Li', atomicMass: 6.94, state: 'Solid', electronConfig: '[He] 2s1', orbitals: [2, 1] },
            4: { name: 'Beryllium', symbol: 'Be', atomicMass: 9.0122, state: 'Solid', electronConfig: '[He] 2s2', orbitals: [2, 2] },
            5: { name: 'Boron', symbol: 'B', atomicMass: 10.81, state: 'Solid', electronConfig: '[He] 2s2 2p1', orbitals: [2, 3] },
            6: { name: 'Carbon', symbol: 'C', atomicMass: 12.011, state: 'Solid', electronConfig: '[He] 2s2 2p2', orbitals: [2, 4] },
            7: { name: 'Nitrogen', symbol: 'N', atomicMass: 14.007, state: 'Gas', electronConfig: '[He] 2s2 2p3', orbitals: [2, 5] },
            8: { name: 'Oxygen', symbol: 'O', atomicMass: 15.999, state: 'Gas', electronConfig: '[He] 2s2 2p4', orbitals: [2, 6] },
            9: { name: 'Fluorine', symbol: 'F', atomicMass: 18.998, state: 'Gas', electronConfig: '[He] 2s2 2p5', orbitals: [2, 7] },
            10: { name: 'Neon', symbol: 'Ne', atomicMass: 20.180, state: 'Gas', electronConfig: '[He] 2s2 2p6', orbitals: [2, 8] },
            11: { name: 'Sodium', symbol: 'Na', atomicMass: 22.990, state: 'Solid', electronConfig: '[Ne] 3s1', orbitals: [2, 8, 1] },
            12: { name: 'Magnesium', symbol: 'Mg', atomicMass: 24.305, state: 'Solid', electronConfig: '[Ne] 3s2', orbitals: [2, 8, 2] },
            13: { name: 'Aluminum', symbol: 'Al', atomicMass: 26.982, state: 'Solid', electronConfig: '[Ne] 3s2 3p1', orbitals: [2, 8, 3] },
            14: { name: 'Silicon', symbol: 'Si', atomicMass: 28.085, state: 'Solid', electronConfig: '[Ne] 3s2 3p2', orbitals: [2, 8, 4] },
            15: { name: 'Phosphorus', symbol: 'P', atomicMass: 30.974, state: 'Solid', electronConfig: '[Ne] 3s2 3p3', orbitals: [2, 8, 5] },
            16: { name: 'Sulfur', symbol: 'S', atomicMass: 32.06, state: 'Solid', electronConfig: '[Ne] 3s2 3p4', orbitals: [2, 8, 6] },
            17: { name: 'Chlorine', symbol: 'Cl', atomicMass: 35.45, state: 'Gas', electronConfig: '[Ne] 3s2 3p5', orbitals: [2, 8, 7] },
            18: { name: 'Argon', symbol: 'Ar', atomicMass: 39.948, state: 'Gas', electronConfig: '[Ne] 3s2 3p6', orbitals: [2, 8, 8] },
            19: { name: 'Potassium', symbol: 'K', atomicMass: 39.098, state: 'Solid', electronConfig: '[Ar] 4s1', orbitals: [2, 8, 8, 1] },
            20: { name: 'Calcium', symbol: 'Ca', atomicMass: 40.078, state: 'Solid', electronConfig: '[Ar] 4s2', orbitals: [2, 8, 8, 2] },
        };

        const atom = atoms[atomicNumber];

        if (atom) {
            document.getElementById('atom-info').innerHTML = `
                <h2>${atom.name} (${atom.symbol})</h2>
                <p>Atomic Number: ${atomicNumber}</p>
                <p>Atomic Mass: ${atom.atomicMass}</p>
                <p>State at Room Temperature: ${atom.state}</p>
                <p>Electron Configuration: ${atom.electronConfig}</p>
            `;

            visualizeOrbitals(atom.orbitals);
        } else {
            document.getElementById('atom-info').innerHTML = `
                <p>No information available for atomic number ${atomicNumber}.</p>
            `;
            document.getElementById('orbital-svg').innerHTML = '';
        }

        document.getElementById('loading').style.display = 'none';
    }, 1000);
});

function visualizeOrbitals(orbitals) {
    const svg = document.getElementById('orbital-svg');
    svg.innerHTML = '';

    const centerX = svg.clientWidth / 2;
    const centerY = svg.clientHeight / 2;

    orbitals.forEach((electronCount, orbitalIndex) => {
        const radius = (orbitalIndex + 1) * 40;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', centerX);
        circle.setAttribute('cy', centerY);
        circle.setAttribute('r', radius);
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('fill', 'none');
        svg.appendChild(circle);

        for (let i = 0; i < electronCount; i++) {
            const angle = (i / electronCount) * 2 * Math.PI;
            const electronX = centerX + radius * Math.cos(angle);
            const electronY = centerY + radius * Math.sin(angle);

            const electron = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            electron.setAttribute('cx', electronX);
            electron.setAttribute('cy', electronY);
            electron.setAttribute('r', 5);
            electron.setAttribute('fill', 'yellow');

            electron.addEventListener('mouseover', () => {
                const tooltip = document.createElement('div');
                tooltip.innerText = `Electron in orbital ${orbitalIndex + 1}`;
                tooltip.style.position = 'absolute';
                tooltip.style.left = `${electronX + 10}px`;
                tooltip.style.top = `${electronY - 10}px`;
                tooltip.style.backgroundColor = 'black';
                tooltip.style.color = 'white';
                tooltip.style.padding = '5px';
                tooltip.style.borderRadius = '5px';
                document.body.appendChild(tooltip);

                electron.addEventListener('mouseout', () => {
                    document.body.removeChild(tooltip);
                });
            });

            svg.appendChild(electron);
        }
    });
}
