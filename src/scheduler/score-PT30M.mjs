import {parse, toSeconds} from 'iso8601-duration';
import {toMillisecond} from '../helper.mjs';
import {Record} from '../model/record.mjs';
import {User} from '../model/user.mjs';

const MIN_SCORE_PER_RECORD = 1;
const SCORE_LOG_FACTOR = 10;

// eslint-disable-next-line import-x/no-anonymous-default-export
export default async () => {
    const now = Date.now();

    try {
        const [users, records] = await Promise.all([
            User.find({
                $or: [
                    {deletedAt: {$exists: false}},
                    {deletedAt: null},
                    {deletedAt: {$gt: now}},
                ],
            }),
            Record.find({
                $or: [
                    {deletedAt: {$exists: false}},
                    {deletedAt: null},
                    {deletedAt: {$gt: now}},
                ],
            }),
        ]);

        await Promise.all(
            users.map((v) => {
                const baseScore = records.filter((w) =>
                    w.user.equals(v.id),
                ).length;
                v.score = Math.round(
                    (Math.max(
                        Math.log10(baseScore) * SCORE_LOG_FACTOR,
                        MIN_SCORE_PER_RECORD,
                    ) *
                        baseScore *
                        toMillisecond(toSeconds(parse('P1M')))) /
                        (now - v.createdAt),
                );
                return v.save();
            }),
        );
    } catch (error) {
        console.error(error);
    }
};
