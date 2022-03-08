import { EntityPayload, MongoProjection } from './types';

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
