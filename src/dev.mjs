import {env} from 'process';
import {bin, install} from 'cloudflared';
import fs from 'node:fs';
import {spawn} from 'child_process';

if (env.NODE_ENV === 'dev') {
   (async () => {
      if (!fs.existsSync(bin)) {
         await install(bin);
      }

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
   })();
}
