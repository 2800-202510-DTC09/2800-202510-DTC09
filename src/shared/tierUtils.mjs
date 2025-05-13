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

export function getUserTier(score) {
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
        progress = Math.min(
            100,
            Math.round(((score - tier.threshold) / range) * 100),
        );
        pointsNeeded = nextTier.threshold - score;
    }
    return {
        ...tier,
        progress,
        nextTier: nextTier ? {...nextTier, pointsNeeded} : null,
    };
}
