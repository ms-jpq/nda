#!/usr/bin/env ts-node

import { spawnSync } from "child_process"

spawnSync("tsc", ["-p", "src"], { stdio: ["inherit", "inherit", "inherit"] })

