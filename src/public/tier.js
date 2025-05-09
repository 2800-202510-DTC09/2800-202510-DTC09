const TIERS = [
    { name: 'bronze', level: 1, displayName: 'Bronze I', badge: '/assets/Bronze-1.png', threshold: 0 },
    { name: 'bronze', level: 2, displayName: 'Bronze II', badge: '/assets/Bronze-2.png', threshold: 500 },
    { name: 'bronze', level: 3, displayName: 'Bronze III', badge: '/assets/Bronze-3.png', threshold: 1000 },
    { name: 'gold', level: 1, displayName: 'Gold I', badge: '/assets/Gold-1.png', threshold: 1500 },
    { name: 'gold', level: 2, displayName: 'Gold II', badge: '/assets/Gold-2.png', threshold: 2000 },
    { name: 'gold', level: 3, displayName: 'Gold III', badge: '/assets/Gold-3.png', threshold: 2500 },
    { name: 'diamond', level: 1, displayName: 'Diamond I', badge: '/assets/Diamond-1.png', threshold: 3000 },
    { name: 'diamond', level: 2, displayName: 'Diamond II', badge: '/assets/Diamond-2.png', threshold: 3500 },
    { name: 'diamond', level: 3, displayName: 'Diamond III', badge: '/assets/Diamond-3.png', threshold: 4000 }
];

function getUserTier(score) {
    let idx = TIERS.length - 1;
    for (let i = 0; i < TIERS.length; i++) {
        if (score < TIERS[i].threshold) {
            idx = i - 1;
            break;
        }
    }
    const tier = TIERS[Math.max(0, idx)];
    const nextTier = TIERS[idx + 1];
    let progress = 100;
    let pointsNeeded = null;
    if (nextTier) {
        const range = nextTier.threshold - tier.threshold;
        progress = Math.min(100, Math.round(((score - tier.threshold) / range) * 100));
        pointsNeeded = nextTier.threshold - score;
    }
    return {
        ...tier,
        progress,
        nextTier: nextTier ? { ...nextTier, pointsNeeded } : null
    };
}

function updateTierDisplay(score) {
    try {
        const t = getUserTier(score);
        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = val;
            }
        };
        set('current-tier', t.displayName);
        set('tier-display', t.displayName);
        const badge = document.getElementById('tier-badge');
        if (badge) {
            badge.src = t.badge; badge.alt = `${t.displayName} Badge`;
        }
        const bar = document.getElementById('tier-progress-bar');
        if (bar) {
            bar.style.width = `${t.progress}%`;
        }
        set('tier-progress-text', `${t.progress}% complete`);
        if (t.nextTier) {
            set('next-tier', t.nextTier.displayName);
            set('next-tier-display', t.nextTier.displayName);
            const nextBadge = document.getElementById('next-tier-badge');
            if (nextBadge) {
                nextBadge.src = t.nextTier.badge; nextBadge.alt = `${t.nextTier.displayName} Badge`;
            }
            set('points-needed', t.nextTier.pointsNeeded);
        } else {
            set('next-tier', "Max tier reached");
            set('next-tier-display', "Max tier reached");
        }
        const container = document.getElementById('tier-container');
        if (container) {
            container.classList.remove('tier-bronze', 'tier-gold', 'tier-diamond');
            container.classList.add(`tier-${t.name}`);
        }
    } catch (e) {
        console.error('Error updating tier display:', e);
    }
}

async function loadAndDisplayUserTier() {
    try {
        const res = await fetch('/api/tier');
        if (!res.ok) {
            console.error('Failed to fetch tier data:', res.status);
            throw new Error('Failed to fetch tier data');
        }
        const data = await res.json();
        console.log('Received tier data:', data);
        updateTierDisplay(data.score);
    } catch (err) {
        console.error('Failed to load user score:', err);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadAndDisplayUserTier();

    const testBtn = document.getElementById('test-tier-btn');
    if (testBtn) {
        testBtn.addEventListener('click', function () {
            const score = parseInt(document.getElementById('test-score').value, 10);
            if (!isNaN(score)) {
                updateTierDisplay(score);
            }
        });
    }

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const score = parseInt(this.dataset.score, 10);
            const scoreInput = document.getElementById('test-score');
            if (scoreInput) {
                scoreInput.value = score;
            }
            updateTierDisplay(score);
        });
    });
});