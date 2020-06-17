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
  const done = Promise.all([
    new Promise((resolve) => stream.once("exit", resolve)),
    new Promise((resolve) => stream.once("close", resolve)),
  ])

  if (stdin !== undefined) {
    await new Promise((resolve, reject) => {
      stream.stdin.write(stdin, (err) => (err ? reject(err) : resolve()))
    })
    stream.stdin.end()
  }

  await done
  return stream.exitCode!
}

export const pipe = async ({ cmd, args, stdin, opts = {} }: SpawnArgs) => {
  const options: SpawnOptionsWithoutStdio = { ...opts, stdio: "pipe" }
  const stream = spawn(cmd, args, options)
  const done = Promise.all([
    new Promise((resolve) => stream.once("exit", resolve)),
    new Promise((resolve) => stream.once("close", resolve)),
  ])

  const out_buf: any = []
  const err_buf: any = []
  let stdout: Buffer | undefined = undefined
  let stderr: Buffer | undefined = undefined

  stream.stdout.on("data", (chunk) => out_buf.push(chunk))
  stream.stdout.once("close", () => (stdout = Buffer.concat(out_buf)))

  stream.stderr.on("data", (chunk) => err_buf.push(chunk))
  stream.stderr.once("close", () => (stderr = Buffer.concat(err_buf)))

  if (stdin !== undefined) {
    await new Promise((resolve, reject) => {
      stream.stdin.write(stdin, (err) => (err ? reject(err) : resolve()))
    })
    stream.stdin.end()
  }

  await done
  return { code: stream.exitCode!, stdout: stdout!, stderr: stderr! }
}

