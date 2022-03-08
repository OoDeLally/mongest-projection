import { GetEntityValueTypeOrUnknown, PickAndUnwrapIfMatchRootKey } from './projection-helpers';
import {
  EntityPayload,
  Falsy,
  MongoPrimitiveObject,
  MongoProjection,
  MongoProjectionElemMatch,
  MongoProjectionSlice,
} from './types';

type GetExclusionProjectedKeys<
  D extends EntityPayload,
  P extends MongoProjection,
  IsRootProjection = false,
> = string &
  (
    | (IsRootProjection extends true ? ' _ep' : never)
    | (IsRootProjection extends true
        ? Exclude<P['_id'], Falsy> extends never // _id is Falsy
          ? Exclude<keyof D, '_id' | keyof P>
          : Exclude<keyof D, keyof P> | '_id'
        : Exclude<keyof D, keyof P>)
  );

type ComputeExclusionProjectedValue<V, P extends MongoProjection> = V extends (infer Item)[] // Embedded array
  ? ComputeExclusionProjectedValue<Item, P>[]
  : V extends object // Embedded object
  ? ExclusionProjectedRec<V, P>
  : V; // Primitive value

type ExclusionProjectedRec<
  D extends EntityPayload,
  P extends MongoProjection,
  IsRootProjection = false,
> = {
  [Key in GetExclusionProjectedKeys<D, P, IsRootProjection>]: Key extends ' _ep'
    ? never
    : P[Key] extends string
    ? never // Projection is using a direct primitive, but this is fobidden in an exclusion projection.
    : GetEntityValueTypeOrUnknown<D, Key> extends MongoPrimitiveObject
    ? GetEntityValueTypeOrUnknown<D, Key>
    : ComputeExclusionProjectedValue<
        GetEntityValueTypeOrUnknown<D, Key>,
        PickAndUnwrapIfMatchRootKey<P, Key>
      >;
};

// Use `' _ep': never` as a (E)xclusion (P)rojection flag, so it doesnt get shown by IDEs.

type OmitSliceOperator<P extends MongoProjection> = {
  // {myArray : {$slice: 42}} replaced by {}
  // Since we are in a exclusion projection, omitting the field will provide the value.
  [Key in keyof P as P[Key] extends MongoProjectionSlice ? never : Key]: P[Key];
};

type OmitElemMatchOperator<P extends MongoProjection> = {
  // {myArray : {$elemMatch: {name: 'Bobo'}}} replaced by {}
  // Since we are in a exclusion projection, omitting the field will provide the value.
  [Key in keyof P as P[Key] extends MongoProjectionElemMatch ? never : Key]: P[Key];
};

export type ExclusionProjected<
  D extends EntityPayload,
  P extends MongoProjection,
> = ExclusionProjectedRec<D, OmitElemMatchOperator<OmitSliceOperator<P>>, true>;
