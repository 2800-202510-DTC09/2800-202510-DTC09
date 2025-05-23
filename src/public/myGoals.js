document.addEventListener('DOMContentLoaded', async () => {
    const goalList = document.getElementById('goalList');

    try {
        const res = await fetch('/api/user/profile', {
            credentials: 'include',
        });

        const user = await res.json();
        const goals = user.goals || [];

        goalList.innerHTML = goals.length
            ? ''
            : '<p class="text-neutral-500">No goals added yet.</p>';

        goals.forEach((g) => {
            const goal = g?.[0] ?? g;
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded shadow';

            card.innerHTML = `
        <h2 class="text-lg font-semibold">${goal?.name || 'Unnamed Goal'}</h2>
        <p class="text-sm text-neutral-600">${goal?.description || 'No description provided.'}</p>
        <p class="text-xs text-neutral-400 mt-1">
          Status: ${goal?.completed ? '✅ Completed' : '⏳ Ongoing'}
        </p>
        ${
            goal?.completed
                ? ''
                : `<button class="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" data-id="${goal?.id}">
                Mark as Complete
              </button>`
        }
      `;

            if (!goal?.completed) {
                const button = card.querySelector('button');
                button.addEventListener('click', async () => {
                    try {
                        const completeRes = await fetch(
                            `/api/goal/${goal.id}/complete`,
                            {
                                method: 'POST',
                                credentials: 'include',
                            },
                        );

                        if (completeRes.ok) {
                            alert(' Goal completed! Badge and score updated.');
                            location.reload();
                        } else {
                            alert(' Failed to complete goal.');
                        }
                    } catch (err) {
                        console.error('Error completing goal:', err);
                        alert('An error occurred.');
                    }
                });
            }

            goalList.appendChild(card);
        });
    } catch (err) {
        console.error('Failed to load goals:', err);
        goalList.innerHTML =
            '<p class="text-red-500">Error loading goals. Please try again later.</p>';
    }
});
