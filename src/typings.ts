export type ArrayType<T> = T extends (infer U)[] ? U : never

export type PromiseType<T> = T extends Promise<infer U> ? U : never

export type Exhaustive<T> = { [K in keyof T]: T[K] }
