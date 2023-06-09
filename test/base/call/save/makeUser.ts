import _ from 'lodash'

import { readUserBasic } from '../../read.js'
import { LoadTask } from '~/call/load.js'
import { Call } from '~/call/index.js'

type MakeUser = {
  email: string
  slug: string
}

const load = ({ email, slug }: MakeUser) => ({
  move: {
    user: {
      move: {
        email,
        slug,
      },
    },
  },
  read: readUserBasic,
})

export default {
  task: LoadTask.Save,
  load,
  read: readUserBasic,
} satisfies Call
