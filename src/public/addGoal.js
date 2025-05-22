import { goalTemplates } from './goalTemplates.js';

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('goalSelect');
    const nameInput = document.getElementById('goalName');
    const descInput = document.getElementById('goalDescription');
    const startInput = document.getElementById('goalStartDate');
    const endInput = document.getElementById('goalEndDate');
    const form = document.getElementById('goalForm');
    const emissionDiffOutput = document.getElementById('goalEmissionDiff');
    const scoreOutput = document.getElementById('goalScorePoints');

    let selectedGoal = null;

    goalTemplates.forEach((goal, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = goal.name;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', (e) => {
        selectedGoal = goalTemplates[e.target.value];
        if (!selectedGoal) return;
        nameInput.value = selectedGoal.name;
        descInput.value = selectedGoal.description;
        const [startDatePart] = new Date(selectedGoal.emissionDiffStart)
            .toISOString()
            .split('T');
        startInput.value = startDatePart;
        const [endDatePart] = new Date(selectedGoal.emissionDiffEnd)
            .toISOString()
            .split('T');
        endInput.value = endDatePart;
        emissionDiffOutput.textContent = `${selectedGoal.emissionDiff} kg CO₂ saved`;
        scoreOutput.textContent = `${selectedGoal.scorePoints} points`;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!selectedGoal) return alert('Choose a goal');

        const res = await fetch('/api/goal', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: selectedGoal.name,
                description: selectedGoal.description,
                icon: selectedGoal.icon,
                emissionDiff: selectedGoal.emissionDiff,
                emissionDiffStart: startInput.value,
                emissionDiffEnd: endInput.value,
                scorePoints: selectedGoal.scorePoints,
                durationDays: selectedGoal.durationDays,
                badge: selectedGoal.badge,
            }),
        });

        if (res.ok) {
            alert('Goal added!');
            window.location.href = '/achievements.html';
        } else {
            const errorText = await res.text();
            alert(errorText || 'Error adding goal.');
        }
    });
});
