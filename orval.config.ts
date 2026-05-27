// orval.config.ts
import { defineConfig } from 'orval'

export default defineConfig({
    sprintHubAPI: {
        input: 'http://localhost:3333/api/docs-json',

        output: {
            target: './src/api/generated.ts',
            client: 'axios',

            override: {
                mutator: {
                    path: './src/lib/orval.ts',
                    name: 'customInstance',
                },
            },
        },
    },
})