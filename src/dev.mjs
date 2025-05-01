import {env} from 'process';
import fs from 'fs';
import {spawn} from 'child_process';
import {bin, install} from 'cloudflared';

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
