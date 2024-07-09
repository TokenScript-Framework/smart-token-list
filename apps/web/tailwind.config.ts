// tailwind config is required for editor support

import type { Config } from 'tailwindcss'

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./app/**/*.tsx'],
}

export default config
