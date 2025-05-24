/**
 * Utility functions and data for managing user tiers based on score thresholds.
 * Provides tier definitions and a function to determine a user's current tier,
 * progress within the tier, and information about the next tier.
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

export function getUserTier(score) {
    const ONE = 1;
    let idx = TIERS.length - ONE;
    for (let i = 0; i < TIERS.length; i += ONE) {
        if (score < TIERS[i].threshold) {
            idx = i - ONE;
            break;
        }
    }
    const zeroIndex = 0;
    const tier = TIERS[Math.max(zeroIndex, idx)];
    const nextTier = TIERS[idx + ONE];
    let progress = 100;
    let pointsNeeded = null;
    if (nextTier) {
        const range = nextTier.threshold - tier.threshold;
        progress = Math.min(
            progress,
            Math.round(((score - tier.threshold) / range) * progress),
        );
        pointsNeeded = nextTier.threshold - score;
    }
    return {
        ...tier,
        progress,
        nextTier: nextTier ? {...nextTier, pointsNeeded} : null,
    };
}
