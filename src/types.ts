/* eslint-disable @typescript-eslint/ban-types */
import { Binary, Code, ObjectId, Timestamp } from 'mongodb';

// Do NOT use EntityPayload = Record<string, unknown>. Even if in practice it is the case,
// TS considers that classes can be indexed by non-string keys.
export type EntityPayload = object;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractType<T = any> = abstract new (...args: any[]) => T;

export type ExtractIdType<EDoc extends EntityPayload> = '_id' extends keyof EDoc
  ? EDoc['_id']
  : ObjectId;

// https://www.tutorialspoint.com/mongodb/mongodb_datatype.htm
export type MongoPrimitiveObject = Timestamp | Symbol | Date | ObjectId | Binary | Code | RegExp;

export type OmitIfValueMatches<T, V> = {
  [Key in keyof T as T[Key] extends V ? never : Key]: T[Key];
};

export type OmitNeverValues<T> = OmitIfValueMatches<T, never>;

// Note: // Type `Truthy` cannot be expressed in TS because we cannot exclude a set e.g. type Truthy = ((number | boolean) \ Falsy)
// The only way to evaluate truthy is to first evaluate NOT Falsy, and then evaluate (number | boolean).
export type Falsy = 0 | false;

export type MongoProjectionSlice = { $slice: number | [number, number] };
export type MongoProjectionElemMatch = { $elemMatch: object };

export type MongoProjectionOperator = MongoProjectionSlice | MongoProjectionElemMatch;

export type MongoProjection = {
  [Key in string]: number | boolean | string | MongoProjectionOperator;
};

export type OmitId<T> = Omit<T, '_id'>;
