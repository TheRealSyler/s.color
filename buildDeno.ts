import { promises, existsSync } from 'fs';
import { join } from 'path'

(async () => {
  const dir = await promises.readdir('./src')

  if (!existsSync('./deno')) {
    await promises.mkdir('./deno')
  }
  for (let i = 0; i < dir.length; i++) {
    let fileName = dir[i];
    if (!/.spec.ts$/.test(fileName)) {
      const file = await promises.readFile(join('./src', fileName), { encoding: 'utf8' })
      if (fileName === 'index.ts') {
        fileName = 'mod.ts'
      }
      await promises.writeFile(join('./deno', fileName), file.replace(/((import|export).*from.*?'.*)'/gm, '$1.ts\''))
    }
  }
})()
