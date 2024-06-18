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
