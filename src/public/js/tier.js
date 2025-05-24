/**
 * This script manages the tier system for users based on their scores.
 * It determines the user's current tier, progress, and next tier,
 * and updates the UI accordingly.
 * 
 * * Resources used * *
 * [Claude 3.7]
 * 
 * @author Gurmehak Tuli
 * @version 1.1
 */
const TIERS = [
    {
        name: 'bronze',
        level: 1,
        displayName: 'Bronze I',
        badge: '/assets/Bronze-1.png',
        threshold: 0,
    },
    {
        name: 'bronze',
        level: 2,
        displayName: 'Bronze II',
        badge: '/assets/Bronze-2.png',
        threshold: 500,
    },
    {
        name: 'bronze',
        level: 3,
        displayName: 'Bronze III',
        badge: '/assets/Bronze-3.png',
        threshold: 1000,
    },
    {
        name: 'gold',
        level: 1,
        displayName: 'Gold I',
        badge: '/assets/Gold-1.png',
        threshold: 1500,
    },
    {
        name: 'gold',
        level: 2,
        displayName: 'Gold II',
        badge: '/assets/Gold-2.png',
        threshold: 2000,
    },
    {
        name: 'gold',
        level: 3,
        displayName: 'Gold III',
        badge: '/assets/Gold-3.png',
        threshold: 2500,
    },
    {
        name: 'diamond',
        level: 1,
        displayName: 'Diamond I',
        badge: '/assets/Diamond-1.png',
        threshold: 3000,
    },
    {
        name: 'diamond',
        level: 2,
        displayName: 'Diamond II',
        badge: '/assets/Diamond-2.png',
        threshold: 3500,
    },
    {
        name: 'diamond',
        level: 3,
        displayName: 'Diamond III',
        badge: '/assets/Diamond-3.png',
        threshold: 4000,
    },
];

const INDEX_OFFSET = 1;
const PERCENT_MAX = 100;
const MIN_TIER_INDEX = 0;

function getUserTier(score) {
    let idx = TIERS.length - INDEX_OFFSET;
    const INCREMENT = 1;
    for (let i = 0; i < TIERS.length; i += INCREMENT) {
        if (score < TIERS[i].threshold) {
            idx = i - INDEX_OFFSET;
            break;
        }
    }
    const tier = TIERS[Math.max(MIN_TIER_INDEX, idx)];
    const nextTier = TIERS[idx + INDEX_OFFSET];
    let progress = 100;
    let pointsNeeded = null;
    if (nextTier) {
        const range = nextTier.threshold - tier.threshold;
        progress = Math.min(
            PERCENT_MAX,
            Math.round(((score - tier.threshold) / range) * PERCENT_MAX),
        );
        pointsNeeded = nextTier.threshold - score;
    }
    return {
        ...tier,
        progress,
        nextTier: nextTier ? {...nextTier, pointsNeeded} : null,
    };
}

function setTextContentById(id, val) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = val;
    }
}

function updateBadge(id, badgeSrc, badgeAlt) {
    const badge = document.getElementById(id);
    if (badge) {
        badge.src = badgeSrc;
        badge.alt = badgeAlt;
    }
}

function updateProgressBar(id, progress) {
    const bar = document.getElementById(id);
    if (bar) {
        bar.style.width = `${progress}%`;
    }
}

function updateCurrentTierDisplay(t) {
    setTextContentById('current-tier', t.displayName);
    setTextContentById('tier-display', t.displayName);
    updateBadge('tier-badge', t.badge, `${t.displayName} Badge`);
    updateProgressBar('tier-progress-bar', t.progress);
    setTextContentById('tier-progress-text', `${t.progress}% complete`);
}

function updateNextTierDisplay(nextTier) {
    if (nextTier) {
        setTextContentById('next-tier', nextTier.displayName);
        setTextContentById('next-tier-display', nextTier.displayName);
        updateBadge(
            'next-tier-badge',
            nextTier.badge,
            `${nextTier.displayName} Badge`,
        );
        setTextContentById('points-needed', nextTier.pointsNeeded);
    } else {
        setTextContentById('next-tier', 'Max tier reached');
        setTextContentById('next-tier-display', 'Max tier reached');
    }
}

function updateTierContainerClass(name) {
    const container = document.getElementById('tier-container');
    if (container) {
        container.classList.remove('tier-bronze', 'tier-gold', 'tier-diamond');
        container.classList.add(`tier-${name}`);
    }
}

function updateTierDisplay(score) {
    try {
        const t = getUserTier(score);
        updateCurrentTierDisplay(t);
        updateNextTierDisplay(t.nextTier);
        updateTierContainerClass(t.name);
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
        updateTierDisplay(data.score);
    } catch (err) {
        console.error('Failed to load user score:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadAndDisplayUserTier();

    const testBtn = document.getElementById('test-tier-btn');
    if (testBtn) {
        testBtn.addEventListener('click', () => {
            const score = parseInt(
                document.getElementById('test-score').value,
                10,
            );
            if (!isNaN(score)) {
                updateTierDisplay(score);
            }
        });
    }

    document.querySelectorAll('.preset-btn').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const score = parseInt(event.currentTarget.dataset.score, 10);
            const scoreInput = document.getElementById('test-score');
            if (scoreInput) {
                scoreInput.value = score;
            }
            updateTierDisplay(score);
        });
    });
});
