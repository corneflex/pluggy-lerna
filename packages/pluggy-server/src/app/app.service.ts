import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { Multer } from 'multer';
import { exec } from 'child_process';
import {join} from "path";
import { readdir, stat } from 'fs-extra';
import { NestExpressApplication } from '@nestjs/platform-express';

const execute = (cmd: string, options?: object): Promise<void> =>
  new Promise((resolve, reject) => {
    exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        // Logger.debug(stdout);
        resolve();
      } 
    });
  });

@Injectable()
export class AppService {

  async  getDirectories(path): Promise<string[]> {
    const filesAndDirectories = await readdir(path);

    const directories = [];
    await Promise.all(
        filesAndDirectories.map(name =>{
            return stat(join(path, name))
            .then(stat =>{
                if(stat.isDirectory()) directories.push(name)
            })
        })
    );
    return directories;
}

  async getPluginsList(): Promise<string[]> {
    return (await this.getDirectories(join(__dirname, 'plugins')));
  }

  async UploadedFile(file: Express.Multer.File) {

    const fileName = file.filename.substring(0, file.filename.lastIndexOf('.'));
    const pluginDir = join(__dirname, 'plugins', fileName);

    await execute(`cd ${join(__dirname, 'plugins')} && unzip -o ${file.filename} -d ${pluginDir}`);
    console.log(file);
  }
}
