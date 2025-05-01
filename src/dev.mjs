import {env} from 'process';
import {existsSync, readdirSync, rmSync, statSync} from 'fs';
import {exec, execFileSync, spawn} from 'child_process';
import {bin, install} from 'cloudflared';
import {connect} from 'mongoose';
import {join} from 'path';

(async () => {
   if (!existsSync(bin)) {
      await install(bin);
   }

   const config = join(env.HOME ?? env.USERPROFILE, '.cloudflared');
   if (existsSync(config) && statSync(config).isDirectory()) {
      readdirSync(config)
         .filter((v) => v.endsWith('-token.lock'))
         .forEach((v) => rmSync(join(config, v)));
   }

   execFileSync(
      bin,
      [
         'access',
         'login',
         '--quiet',
         env.MONGO_SERVER,
      ],
      {stdio: 'inherit'},
   );

   spawn(
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

   console.log('lloll');

   await connect(`mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/sustain-me`);
})();
