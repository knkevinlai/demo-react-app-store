/* eslint-disable no-console */
import path from 'path'
import chalk from 'chalk'
import favicons from 'favicons'
import write from 'write'

const source = path.resolve(__dirname, '../../src/assets/favicons/favicon.png')

function toBase64(content) {
  return Buffer.from(content).toString('base64')
}

const debugPrefix = '[Favicons]'

const publicFolderName = 'public'

const config = {
  path: '/assets/favicons',
  appName: 'App Store Demo (by Kevin)',
  appDescription: `App Store Demo (by Kevin)`,
  background: '#000',
  theme_color: '#000',
  start_url: '/',
}

const createFavicons = async () => {
  const {
    html,
    images,
    files,
  } = await favicons(source, config)

  return {
    tags: html,
    assets: [
      ...images,
      ...files,
    ].map(({ name, contents }) => ({
      name: path.join(config.path, name),
      contents: toBase64(contents),
    })),
  }
}

const outputAssets = async assets => {
  await Promise.all(assets.map(({ name, contents }) => {
    const outputPath = path.resolve(process.cwd(), publicFolderName, `.${name}`)
    console.log(chalk.cyan(`${debugPrefix} writing output to "${outputPath}"`))
    return write(outputPath, Buffer.from(contents, 'base64'))
  }))
}

export default async () => {
  console.log(chalk.cyan(`${debugPrefix} start creating...`))

  const response = await createFavicons()
  await outputAssets(response.assets || [])
  return response
}
