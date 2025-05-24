import {execFileSync, spawn} from 'child_process';
import {existsSync, readdirSync, rmSync, statSync} from 'fs';
import {join} from 'path';
import {env} from 'process';
import {bin, install} from 'cloudflared';
import {connect} from 'mongoose';

(async () => {
    // Check if cloudflared is installed
    if (!existsSync(bin)) {
        await install(bin);
    }

    // Check if cloudflared is running
    const config = join(env.HOME ?? env.USERPROFILE, '.cloudflared');
    if (existsSync(config) && statSync(config).isDirectory()) {
        readdirSync(config)
            .filter((v) => v.endsWith('-token.lock'))
            .forEach((v) => {
                rmSync(join(config, v));
            });
    }

    // Check if the token is valid
    execFileSync(bin, ['access', 'login', '--quiet', env.MONGO_SERVER], {
        stdio: 'inherit',
    });

    // Start the tunnel
    const cloudflared = spawn(
        bin,
        [
            'access',
            'tcp',
            '--hostname',
            env.MONGO_SERVER,
            '--url',
            `${env.MONGO_HOST}:${env.MONGO_PORT}`,
        ],
        {stdio: 'inherit'},
    );

    // Handle exit signals
    process.on('SIGUSR2', () => {
        cloudflared.kill();
        process.kill(process.pid, 'SIGTERM');
    });

    // Wait for the database to be ready
    await connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/sustain-me`);
})();
