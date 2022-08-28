#!/usr/bin/env node
import { spawnSync } from "node:child_process"
import { dirname } from "node:path"

const top_level = dirname(fileURLToPath(new URL(import.meta.url)))

const { error, status } = spawnSync("tsc", ["--project", top_level], {
  stdio: "inherit",
})

if (error) {
  throw error
}

process.exitCode = status ?? 1
