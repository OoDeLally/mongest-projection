import {
  GetEntityValueTypeOrUnknown,
  PickAndUnwrapIfMatchRootKey,
  RemovePositionalMarker,
} from './projection-helpers';
import { ResolveProjectionReference } from './resolve-projection-reference';
import {
  EntityPayload,
  Falsy,
  MongoProjection,
  MongoProjectionElemMatch,
  MongoProjectionSlice,
} from './types';

type GetRootKey<Key extends string> = Key extends `${infer Prefix}.${string}` ? Prefix : Key;

type GetInclusionProjectedKeys<P extends MongoProjection, IdSpecialTreatment = false> = string &
  (IdSpecialTreatment extends true
    ? Exclude<P['_id'], Falsy> extends never
      ? Exclude<keyof P, '_id'>
      : keyof P | '_id'
    : keyof P);

// Use `' _ip': never` as a (I)nclusion (P)rojection flag, so it doesnt get shown by IDEs.

type ComputeInclusionProjectedValue<
  V,
  P extends MongoProjection,
  ResolvedRefs extends EntityPayload,
> = V extends (infer Item)[] // Embedded array
  ? ComputeInclusionProjectedValue<Item, P, ResolvedRefs>[]
  : V extends object // Embedded object
  ? InclusionProjectedRec<V, P, ResolvedRefs>
  : V; // Primitive value

type InclusionProjectedRec<
  D extends EntityPayload,
  P extends MongoProjection,
  ResolvedRefs extends EntityPayload,
  IsRootProjection = false,
> = {
  [Key in
    | (IsRootProjection extends true ? ' _ip' : never)
    | GetRootKey<GetInclusionProjectedKeys<P, IsRootProjection>>]: Key extends ' _ip'
    ? never
    : Key extends '_id' & keyof D
    ? D[Key]
    : Key extends keyof ResolvedRefs
    ? ResolvedRefs[Key]
    : P[Key] extends string
    ? P[Key] // Projection is using a direct primitive.
    : Key extends keyof D & keyof P
    ? D[Key] // The key matches exactly a key from the document.
    : ComputeInclusionProjectedValue<
        GetEntityValueTypeOrUnknown<D, Key>,
        PickAndUnwrapIfMatchRootKey<P, Key>,
        PickAndUnwrapIfMatchRootKey<ResolvedRefs, Key>
      >;
};

type SubstituteSliceOperator<P extends MongoProjection> = {
  // {myArray : {$slice: 42}} replaced by {myArray: 1}
  [Key in keyof P]: P[Key] extends MongoProjectionSlice ? true : P[Key];
};

type SubstituteElemMatchOperator<P extends MongoProjection> = {
  // {myArray : {$elemMatch: 42}} replaced by {myArray: 1}
  [Key in keyof P]: P[Key] extends MongoProjectionElemMatch ? true : P[Key];
};

export type InclusionProjected<
  D extends EntityPayload,
  P extends MongoProjection,
> = InclusionProjectedRec<
  D,
  RemovePositionalMarker<SubstituteElemMatchOperator<SubstituteSliceOperator<P>>>,
  ResolveProjectionReference<D, P>, // Resolve in advance all "$referenced.values".
  true
>;
