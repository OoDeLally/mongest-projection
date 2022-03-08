import { EntityPayload, MongoPrimitiveObject, MongoProjection, OmitNeverValues } from './types';

type GetByPath<V, Path extends string> = V extends (infer Item)[]
  ? GetByPath<Item, Path>
  : V extends MongoPrimitiveObject
  ? never
  : Path extends keyof V
  ? V[Path]
  : Path extends `${infer RootKey}.${infer ChildKey}`
  ? RootKey extends keyof V
    ? GetByPath<V[RootKey], ChildKey>
    : never
  : never;

export type ResolveProjectionReference<
  D extends EntityPayload,
  P extends MongoProjection,
> = OmitNeverValues<{
  [Key in keyof P]: P[Key] extends `$${infer Path}` ? GetByPath<D, Path> : never;
}>;
