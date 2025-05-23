import {LeaderBoard} from '../model/leader-board.mjs';
import {User} from '../model/user.mjs';

const COUNT_FROM = 1;

// eslint-disable-next-line import-x/no-anonymous-default-export
export default async () => {
    const now = Date.now();

    try {
        const [users] = await Promise.all([
            User.find({
                $or: [
                    {deletedAt: {$exists: false}},
                    {deletedAt: null},
                    {deletedAt: {$gt: now}},
                ],
            }),
            LeaderBoard.deleteMany(),
        ]);

        await LeaderBoard.insertMany(
            users
                .sort((a, b) => a.createdAt - b.createdAt)
                .sort((a, b) => b.score - a.score)
                .map((v, i) => ({
                    user: v.id,
                    rank: i + COUNT_FROM,
                    value: v.score,
                })),
        );
    } catch (error) {
        console.error(error);
    }
};
