const stats = [
    'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'
];

const skills = [
    { skill: 'Acrobatics', stat: 'Dexterity', abriv: 'Dex' },
    { skill: 'Appraise', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Bluff', stat: 'Charisma', abriv: 'Cha'},
    { skill: 'Climb', stat: 'Strength', abriv: 'Str' },
    { skill: 'Craft', stat: 'Intelligence', abriv: 'Int'},
    { skill: 'Diplomacy', stat: 'Charisma', abriv: 'Cha' },
    { skill: 'Disable Device', stat: 'Dexterity', abriv: 'Dex'},
    { skill: 'Disguise', stat: 'Charisma', abriv: 'Cha' },
    { skill: 'Escape Artist', stat: 'Dexterity', abriv: 'Dex' },
    { skill: 'Fly', stat: 'Dexterity', abriv: 'Dex' },
    { skill: 'Handle Animal', stat: 'Charisma', abriv: 'Cha'},
    { skill: 'Heal', stat: 'Wisdom', abriv: 'Wis' },
    { skill: 'Intimidate', stat: 'Charisma', abriv: 'Cha'},
    { skill: 'Knowledge (arcana)', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Knowledge (dungeoneering)', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Knowledge (engineering)', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Knowledge (geography)', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Knowledge (history)', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Knowledge (local)', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Knowledge (nature)', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Knowledge (nobility)', stat: 'Intelligence', abriv: 'Int'},
    { skill: 'Knowledge (planes)', stat: 'Intelligence', abriv: 'Int'},
    { skill: 'Knowledge (religion)', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Linguistics', stat: 'Intelligence', abriv: 'Int' },
    { skill: 'Perception', stat: 'Wisdom', abriv: 'Wis'},
    { skill: 'Perform', stat: 'Charisma', abriv: 'Cha'},
    { skill: 'Profession', stat: 'Wisdom', abriv: 'Wis'},
    { skill: 'Ride', stat: 'Dexterity', abriv: 'Dex'},
    { skill: 'Sense Motive', stat: 'Wisdom', abriv: 'Wis'},
    { skill: 'Sleight of Hand', stat: 'Dexterity', abriv: 'Dex'},
    { skill: 'Spellcraft', stat: 'Intelligence', abriv: 'Int'},
    { skill: 'Stealth', stat: 'Dexterity', abriv: 'Dex'},
    { skill: 'Survival', stat: 'Wisdom', abriv: 'Wis'},
    { skill: 'Swim', stat: 'Strength', abriv: 'Str'},
    { skill: 'Use Magic Device', stat: 'Charisma', abriv: 'Cha'},
];

function generateStatRows() {
    const tbody = document.getElementById('stat-table-body');
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

function generateSkillRows() {
    const tbody = document.getElementById('skill-table-body');
    skills.forEach(skill => {
        const row = document.createElement('tr');
        row.classList.add('text-center');
        row.innerHTML = `
            <td class="p-2 border border-gray-300">${skill.skill}</td>
            <td class="p-2 border border-gray-300">${skill.abriv}</td>
            <td class="p-2 border border-gray-300"><input class="w-10 border-gray-300" type="number" id="${skill.skill}Tot" value="0" readonly></td>
            <td class="p-2 border border-gray-300"><input class="w-10 border-gray-300" type="number" id="${skill.skill}Mod" value="0" readonly></td>
            <td class="p-2 border border-gray-300"><input class="w-10 border-gray-300" type="number" id="${skill.skill}Ranks" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-10 border-gray-300" type="number" id="${skill.skill}Misc" value="0"></td>
            <td class="p-2 border border-gray-300"><input class="w-10 border-gray-300" id="${skill.skill}Class" type="checkbox"></td>
        `;
        tbody.appendChild(row);
    });
    addSkillEventListeners();
}

function calculateStats() {
    const modifiers = {};
    stats.forEach(stat => {
        const abS = parseInt(document.getElementById(`${stat}AbS`).value) || 0;
        const raceS = parseInt(document.getElementById(`${stat}Race`).value) || 0;
        const bonS = parseInt(document.getElementById(`${stat}Bon`).value) || 0;
        const totS = document.getElementById(`${stat}Tot`);
        const modS = document.getElementById(`${stat}Mod`);
        totS.value = abS + raceS + bonS;
        modS.value = Math.floor((totS.value - 10) / 2);
        modifiers[stat] = modS.value;
    });
    return modifiers;
}

function calculateSkills() {
    const modifiers = calculateStats();  // Get the latest modifiers
    skills.forEach(skill => {
        const skillTot = document.getElementById(`${skill.skill}Tot`);
        const skillMod = document.getElementById(`${skill.skill}Mod`);
        const skillRanks = parseInt(document.getElementById(`${skill.skill}Ranks`).value) || 0;
        const skillMisc = parseInt(document.getElementById(`${skill.skill}Misc`).value) || 0;
        const classSkill = document.getElementById(`${skill.skill}Class`);
        const statModifier = parseInt(modifiers[skill.stat]) || 0;
        const classSkillBonus = classSkill.checked && skillRanks > 0 ? 3 : 0;
        skillMod.value = statModifier;
        skillTot.value = skillRanks + statModifier + skillMisc + classSkillBonus;
    });
}

function addEventListeners() {
    stats.forEach(stat => {
        document.getElementById(`${stat}AbS`).addEventListener('input', calculateSkills);
        document.getElementById(`${stat}Race`).addEventListener('input', calculateSkills);
        document.getElementById(`${stat}Bon`).addEventListener('input', calculateSkills);
    });
}

function addSkillEventListeners() {
    skills.forEach(skill => {
        document.getElementById(`${skill.skill}Ranks`).addEventListener('input', calculateSkills);
        document.getElementById(`${skill.skill}Misc`).addEventListener('input', calculateSkills);
        document.getElementById(`${skill.skill}Class`).addEventListener('input', calculateSkills);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateStatRows();
    generateSkillRows();
    addEventListeners();
    addSkillEventListeners();
});
