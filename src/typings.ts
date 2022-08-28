export type ArrayType<T> = T extends (infer U)[] ? U : never

export type Exhaustive<T> = { [K in keyof T]: T[K] }
