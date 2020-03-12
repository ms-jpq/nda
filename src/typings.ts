export type ArrayParam<T> = T extends (infer U)[] ? U : never

export type PromiseParam<T> = T extends Promise<infer U> ? U : never

export type Exhaustive<T> = { [K in keyof T]: T[K] }
