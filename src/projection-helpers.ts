import { EntityPayload, IsWideValue, MongoProjection } from './types';

export type PickAndUnwrapIfMatchRootKey<Proj extends object, RootKey extends string> = {
  [Key in keyof Proj as Key extends `${RootKey}.${infer ChildKey}` ? ChildKey : never]: Proj[Key];
};

export type GetEntityValueTypeOrUnknown<D extends EntityPayload, K> = K extends keyof D
  ? D[K]
  : unknown;

// {'myArray.$': 1} => {myArray: 1}
export type RemovePositionalMarker<P extends MongoProjection> = {
  [Key in keyof P as Key extends `${infer MainKey}.$` ? MainKey : Key]: P[Key];
};

// { a: 1, b: number } => { a: 1 }
export type OmitWideValues<P> = {
  [Key in keyof P as IsWideValue<P[Key]> extends true ? never : Key]: P[Key];
};

// { a: 1, b: number } => { b: number }
export type PickWideValues<P> = {
  [Key in keyof P as IsWideValue<P[Key]> extends true ? Key : never]: P[Key];
};

// { a: 1, b: number, c: boolean } => 'b' | 'c'
export type WideValuesKeys<P> = keyof PickWideValues<P>;
