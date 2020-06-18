#!/usr/bin/env ts-node

import { spawnSync } from "child_process"

process.chdir(__dirname)

const proc = spawnSync("tsc", ["-p", "src"], { stdio: "inherit" })

process.exit(proc.status || undefined)

