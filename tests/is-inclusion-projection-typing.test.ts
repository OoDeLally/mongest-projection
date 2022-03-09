/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { IsInclusionProjection } from 'src/is-inclusion-projection';
import { expectType } from 'tsd';

type Iip0 = IsInclusionProjection<{}>;
type Iip0Expected = false;
expectType<Iip0>({} as Iip0Expected);
expectType<Iip0Expected>({} as Iip0);

type Iip1 = IsInclusionProjection<{ _id: true }>;
type Iip1Expected = true;
expectType<Iip1>({} as Iip1Expected);
expectType<Iip1Expected>({} as Iip1);

type iip2 = IsInclusionProjection<{ _id: false }>;
type Iip2Expected = false;
expectType<iip2>({} as Iip2Expected);
expectType<Iip2Expected>({} as iip2);

type Iip3 = IsInclusionProjection<{ extraA: 1; extraB: 1 }>;
type Iip3Expected = true;
expectType<Iip3>({} as Iip3Expected);
expectType<Iip3Expected>({} as Iip3);

type Iip4 = IsInclusionProjection<{ extraA: 0; extraB: 0 }>;
type Iip4Expected = false;
expectType<Iip4>({} as Iip4Expected);
expectType<Iip4Expected>({} as Iip4);

type Iip5 = IsInclusionProjection<{ a: 1; b: 0 }>;
type Iip5Expected = never;
expectType<Iip5>({} as Iip5Expected);
expectType<Iip5Expected>({} as Iip5);

type Iip6 = IsInclusionProjection<{ _id: true; a: 0 }>;
type Iip6Expected = false;
expectType<Iip6>({} as Iip6Expected);
expectType<Iip6Expected>({} as Iip6);

type Iip7 = IsInclusionProjection<{ _id: false; a: 1 }>;
type Iip7Expected = true;
expectType<Iip7>({} as Iip7Expected);
expectType<Iip7Expected>({} as Iip7);

type Iip8 = IsInclusionProjection<{ a: { $slice: 1 } }>;
type Iip8Expected = false;
expectType<Iip8>({} as Iip8Expected);
expectType<Iip8Expected>({} as Iip8);

type Iip9 = IsInclusionProjection<{ a: { $slice: 1 }; b: 1 }>;
type Iip9Expected = true;
expectType<Iip9>({} as Iip9Expected);
expectType<Iip9Expected>({} as Iip9);

// Since we dont have info, we ignore widden types, and only consider the narrow types.
type Iip10 = IsInclusionProjection<{ a: 1; b: number }>;
type Iip10Expected = true;
expectType<Iip10>({} as Iip10Expected);
expectType<Iip10Expected>({} as Iip10);

type Iip11 = IsInclusionProjection<{ a: 0; b: number }>;
type Iip11Expected = false;
expectType<Iip11>({} as Iip11Expected);
expectType<Iip11Expected>({} as Iip11);

type Iip12 = IsInclusionProjection<{ b: number }>;
type Iip12Expected = false;
expectType<Iip12>({} as Iip12Expected);
expectType<Iip12Expected>({} as Iip12);

describe('IsInclusion typing tests', () => {
  it('runs the typing without error', () => {
    // Nothing to do here, we just want this module to be read.
  });
});
