import { Console, Effect } from "effect"
import * as fs from "node:fs/promises"

export const print = (value: unknown): Effect.Effect<void> =>
  Console.log(JSON.stringify(value, null, 2))

export const readFile = (path: string): Effect.Effect<unknown, Error> =>
  Effect.tryPromise({
    try: async () => JSON.parse(await fs.readFile(path, "utf8")) as unknown,
    catch: (cause) => cause instanceof Error ? cause : new Error(String(cause)),
  })
