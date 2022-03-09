import { ExclusionProjected } from './exclusion-projection';
import { InclusionProjected } from './inclusion-projection';
import { IsInclusionProjection } from './is-inclusion-projection';
import { EntityPayload, IsEmptyObject, MongoProjection } from './types';

export type Projected<
  D extends EntityPayload,
  P extends MongoProjection,
> = IsEmptyObject<P> extends true
  ? D // e.g. {}
  : IsInclusionProjection<P> extends never
  ? never // invalid projection e.g. {a: 1, b: 0}
  : IsInclusionProjection<P> extends true
  ? InclusionProjected<D, P>
  : IsInclusionProjection<P> extends false
  ? ExclusionProjected<D, P>
  : never; // invalid projection (not sure whether that can happen)
