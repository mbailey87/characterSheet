// main.js

import { generateStatRows, addStatEventListeners } from './stats.js';
import { generateSkillRows, calculateSkills } from './skills.js';

document.addEventListener('DOMContentLoaded', () => {
    const statTableBody = document.getElementById('stat-table-body');
    const skillTableBody = document.getElementById('skill-table-body');

    generateStatRows(statTableBody);
    generateSkillRows(skillTableBody);

    addStatEventListeners(calculateSkills);
    calculateSkills(); // Calculate skills initially
});


let profilePic = document.getElementById('profile-pic');
let inputFile = document.getElementById('input-file');
inputFile.onchange = function () {
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}