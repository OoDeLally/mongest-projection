import { RemovePositionalMarker } from './projection-helpers';
import {
  EntityPayload,
  Falsy,
  MongoProjection,
  MongoProjectionElemMatch,
  MongoProjectionSlice,
  OmitId,
} from './types';

type RecordValuesUnion<R extends EntityPayload> = R extends Record<string, infer V> ? V : never;

type IsMixedProjection<R extends EntityPayload> = Extract<RecordValuesUnion<R>, Falsy> extends never
  ? false // Exclusion projection => Not mixed => false
  : Exclude<RecordValuesUnion<R>, Falsy> extends never
  ? false // Inclusion projection => Not mixed => false
  : true;

type IsEmptyObject<T> = T extends Record<string, never> ? true : false;

type OmitOperators<P extends MongoProjection> = {
  [Key in keyof P as P[Key] extends MongoProjectionSlice | MongoProjectionElemMatch
    ? never
    : Key]: P[Key];
};

type _IsInclusionProjection<P extends MongoProjection> = IsEmptyObject<P> extends true
  ? false // e.g. {}
  : keyof OmitId<P> extends never
  ? // The projection only contains `_id` and no other field.
    P['_id'] extends Falsy
    ? false // e.g. {_id: false}
    : P['_id'] extends number | boolean | string
    ? true // e.g. {_id: true}
    : never // invalid projection e.g. {a: true, b: false}
  : IsMixedProjection<OmitId<P>> extends true
  ? never // invalid projections e.g. {a: 0, b: 1}
  : Exclude<RecordValuesUnion<OmitId<P>>, Falsy> extends never
  ? false // Exclusion projection e.g. {a: 0, b: false}
  : true; // {a: 1, b: 'foo'}

export type IsInclusionProjection<P extends MongoProjection> = _IsInclusionProjection<
  RemovePositionalMarker<OmitOperators<P>>
>;
