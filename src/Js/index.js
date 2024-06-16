const stats = [
    'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'
];

const skills = [
    { skill: 'Acrobatics', stat: 'Dex' },
    { skill: 'Appraise', stat: 'Int' },
    { skill: 'Bluff', stat: 'Cha' },
    { skill: 'Climb', stat: 'Str' },
    { skill: 'Craft', stat: 'Int' },
    { skill: 'Diplomacy', stat: 'Cha' },
    { skill: 'Disable Device', stat: 'Dex' },
    { skill: 'Disguise', stat: 'Cha' },
    { skill: 'Escape Artist', stat: 'Dex' },
    { skill: 'Fly', stat: 'Dex' },
    { skill: 'Handle Animal', stat: 'Cha' },
    { skill: 'Heal', stat: 'Wis' },
    { skill: 'Intimidate', stat: 'Cha' },
    { skill: 'Knowledge (arcana)', stat: 'Int' },
    { skill: 'Knowledge (dungeoneering)', stat: 'Int' },
    { skill: 'Knowledge (engineering)', stat: 'Int' },
    { skill: 'Knowledge (geography)', stat: 'Int' },
    { skill: 'Knowledge (history)', stat: 'Int' },
    { skill: 'Knowledge (local)', stat: 'Int' },
    { skill: 'Knowledge (nature)', stat: 'Int' },
    { skill: 'Knowledge (nobility)', stat: 'Int' },
    { skill: 'Knowledge (planes)', stat: 'Int' },
    { skill: 'Knowledge (religion)', stat: 'Int' },
    { skill: 'Linguistics', stat: 'Int' },
    { skill: 'Perception', stat: 'Wis' },
    { skill: 'Perform', stat: 'Cha' },
    { skill: 'Profession', stat: 'Wis' },
    { skill: 'Ride', stat: 'Dex' },
    { skill: 'Sense Motive', stat: 'Wis' },
    { skill: 'Sleight of Hand', stat: 'Dex' },
    { skill: 'Spellcraft', stat: 'Int' },
    { skill: 'Stealth', stat: 'Dex' },
    { skill: 'Survival', stat: 'Wis' },
    { skill: 'Swim', stat: 'Str' },
    { skill: 'Use Magic Device', stat: 'Cha' },
];

function generateStatRows() {
    const tbody = document.getElementById('stat-table-body');
    stats.forEach(stat => {
        const row = document.createElement('tr');
        row.classList.add('text-center');
        row.innerHTML = `
            <td class="p-2 border border-gray-300">${stat}</td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" id="${stat}AbS" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" id="${stat}Race" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" id="${stat}Bon" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" id="${stat}Tot" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" id="${stat}Mod" type="number" value="0"></td>
        `;
        tbody.appendChild(row);
    });
}


function generateSkillRows() {
    const tbody = document.getElementById('skill-table-body');
    skills.forEach(skill => {
        const row = document.createElement('tr');
        row.classList.add('text-center');
        row.innerHTML = `
            <td class="p-2 border border-gray-300">${skill.skill}</td>
            <td class="p-2 border border-gray-300">${skill.stat}</td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" type="number" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-16 text-center border-gray-300" type="checkbox"></td>
        `;
        tbody.appendChild(row);
    });
    addEventListeners();
}

document.addEventListener('DOMContentLoaded', () => {
    generateStatRows();
    generateSkillRows();
});


function calculateStats() {
    // total = ability scores and calculate the modifier
    stats.forEach(stat => {
        const abS = document.getElementById(`${stat}AbS`).value;
        const raceS = document.getElementById(`${stat}Race`).value;
        const bonS = document.getElementById(`${stat}Bon`).value;
        const totS = document.getElementById(`${stat}Tot`);
        const modS = document.getElementById(`${stat}Mod`);
        totS.value = parseInt(abS) + parseInt(raceS) + parseInt(bonS);
        modS.value = Math.floor((parseInt(totS.value) - 10) / 2);
    });
}



function addEventListeners() {
    stats.forEach(stat => {
        document.getElementById(`${stat}AbS`).addEventListener('input', calculateStats);
        document.getElementById(`${stat}Race`).addEventListener('input', calculateStats);
        document.getElementById(`${stat}Bon`).addEventListener('input', calculateStats);
    });
}