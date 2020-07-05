import {
  spawn,
  SpawnOptions,
  SpawnOptionsWithoutStdio,
  SpawnOptionsWithStdioTuple,
} from "child_process"

export type SpawnArgs = {
  cmd: string
  args: string[]
  stdin?: any
  opts?: SpawnOptions
}

export const call = async ({ cmd, args, stdin, opts = {} }: SpawnArgs) => {
  const options: SpawnOptionsWithStdioTuple<"pipe", "inherit", "inherit"> = {
    ...opts,
    stdio: ["pipe", "inherit", "inherit"],
  }

  const stream = spawn(cmd, args, options)
  if (stdin !== undefined) {
    stream.stdin.end(stdin)
  }

  await Promise.all([
    new Promise((resolve) => stream.once("exit", resolve)),
    new Promise((resolve) => stream.once("close", resolve)),
  ])

  return stream.exitCode!
}

export const pipe = async ({ cmd, args, stdin, opts = {} }: SpawnArgs) => {
  const options: SpawnOptionsWithoutStdio = { ...opts, stdio: "pipe" }
  const stream = spawn(cmd, args, options)
  const out = (async () => {
    const buf = []
    for await (const data of stream.stdout) {
      buf.push(data)
    }
    return Buffer.concat(buf)
  })()

  const err = (async () => {
    const buf = []
    for await (const data of stream.stderr) {
      buf.push(data)
    }
    return Buffer.concat(buf)
  })()

  if (stdin !== undefined) {
    stream.stdin.end(stdin)
  }

  const [stdout, stderr] = await Promise.all([
    out,
    err,
    new Promise((resolve) => stream.once("exit", resolve)),
    new Promise((resolve) => stream.once("close", resolve)),
  ])
  return { code: stream.exitCode!, stdout, stderr }
}
