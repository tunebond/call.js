import fs from 'fs'
import path from 'path'

import type { Base } from './index.js'
import make from './make/index.js'

export default async function form(headLink: string, hostLink: string) {
  fs.mkdirSync(hostLink, { recursive: true })

  const base = (await load(headLink)) as Base
  const siteHeadLink = path.relative(hostLink, headLink)
  const head = await make(base, siteHeadLink)

  fs.mkdirSync(`${hostLink}/back`, { recursive: true })
  fs.mkdirSync(`${hostLink}/site`, { recursive: true })
  fs.mkdirSync(`${hostLink}/face`, { recursive: true })
  fs.mkdirSync(`${hostLink}/call`, { recursive: true })
  fs.mkdirSync(`${hostLink}/form`, { recursive: true })

  fs.mkdirSync(`${hostLink}/site/read`, { recursive: true })
  fs.mkdirSync(`${hostLink}/face/read`, { recursive: true })

  fs.mkdirSync(`${hostLink}/site/save`, { recursive: true })
  fs.mkdirSync(`${hostLink}/face/save`, { recursive: true })

  fs.writeFileSync(`${hostLink}/call/form.ts`, head.call.form)
  fs.writeFileSync(`${hostLink}/call/load.ts`, head.call.load)

  fs.writeFileSync(`${hostLink}/form/form.ts`, head.form.form)
  fs.writeFileSync(`${hostLink}/form/load.ts`, head.form.load)

  fs.writeFileSync(`${hostLink}/back/form.ts`, head.back.form)
  fs.writeFileSync(`${hostLink}/back/load.ts`, head.back.load)

  // fs.writeFileSync(`${hostLink}/site/read/form.ts`, head.site.read.form)
  // fs.writeFileSync(`${hostLink}/site/read/load.ts`, head.site.read.load)
  // fs.writeFileSync(`${hostLink}/site/save/form.ts`, head.site.save.form)
  // fs.writeFileSync(`${hostLink}/site/save/load.ts`, head.site.save.load)

  // fs.writeFileSync(`${hostLink}/face/read/form.ts`, head.face.read.form)
  // fs.writeFileSync(`${hostLink}/face/read/load.ts`, head.face.read.load)
  // fs.writeFileSync(`${hostLink}/face/save/form.ts`, head.face.save.form)
  // fs.writeFileSync(`${hostLink}/face/save/load.ts`, head.face.save.load)
}

async function load(card: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (await import(card)).default as unknown
}
