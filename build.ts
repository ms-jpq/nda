#!/usr/bin/env ts-node

import { spawnSync } from "child_process"

process.chdir(__dirname)

spawnSync("tsc", ["-p", "src"], { stdio: "inherit" })

