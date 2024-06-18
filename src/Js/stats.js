// stats.js

export const stats = [
    'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'
];

export const statAbbreviations = {
    'Strength': 'Str',
    'Dexterity': 'Dex',
    'Constitution': 'Con',
    'Intelligence': 'Int',
    'Wisdom': 'Wis',
    'Charisma': 'Cha'
};

export function generateStatRows(tbody) {
    stats.forEach(stat => {
        const row = document.createElement('tr');
        row.classList.add('text-center');
        row.innerHTML = `
            <td class="p-2 border border-gray-300">${stat}</td>
            <td class="p-2 border border-gray-300"><input class="w-10 text-center border-gray-300" id="${stat}AbS" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-10 text-center border-gray-300" id="${stat}Race" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-10 text-center border-gray-300" id="${stat}Bon" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-10 text-center border-gray-300" id="${stat}Tot" type="number" value="0" readonly></td>
            <td class="p-2 border border-gray-300"><input class="w-10 text-center border-gray-300" id="${stat}Mod" type="number" value="0" readonly></td>
        `;
        tbody.appendChild(row);
    });
}

export function calculateStats() {
    const modifiers = {};
    stats.forEach(stat => {
        const abS = parseInt(document.getElementById(`${stat}AbS`).value) || 0;
        const raceS = parseInt(document.getElementById(`${stat}Race`).value) || 0;
        const bonS = parseInt(document.getElementById(`${stat}Bon`).value) || 0;
        const totS = document.getElementById(`${stat}Tot`);
        const modS = document.getElementById(`${stat}Mod`);
        if (totS && modS) {
            totS.value = abS + raceS + bonS;
            modS.value = Math.floor((totS.value - 10) / 2);
            modifiers[stat] = modS.value;
        }
    });
    return modifiers;
}

export function addStatEventListeners(callback) {
    stats.forEach(stat => {
        document.getElementById(`${stat}AbS`).addEventListener('input', callback);
        document.getElementById(`${stat}Race`).addEventListener('input', callback);
        document.getElementById(`${stat}Bon`).addEventListener('input', callback);
    });
}
