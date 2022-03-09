/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { describe } from 'mocha';
import { ObjectId } from 'mongodb';
import { IsInclusionProjection } from 'src/is-inclusion-projection';
import { Projected } from 'src/projected';
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

type Iip10 = IsInclusionProjection<{ a: number }>;
type Iip10Expected = never;
expectType<Iip10>({} as Iip10Expected);
expectType<Iip10Expected>({} as Iip10);

type Foo = {
  _id: ObjectId;
  a: number;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
};

type Proj0 = Projected<Foo, {}>;
type Proj0Expected = {
  _id: ObjectId;
  a: number;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  // It is an implicit exclusion projection, we dont use {' _ep': never}
};
expectType<Proj0>({} as Proj0Expected);
expectType<Proj0Expected>({} as Proj0);

type Proj1 = Projected<
  Foo,
  {
    _id: false;
  }
>;
type Proj1Expected = {
  a: number;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ep': never;
};
expectType<Proj1>({} as Proj1Expected);
expectType<Proj1Expected>({} as Proj1);

type Proj2 = Projected<
  Foo,
  {
    _id: true;
  }
>;
type Proj2Expected = {
  _id: ObjectId;
  ' _ip': never;
};
expectType<Proj2>({} as Proj2Expected);
expectType<Proj2Expected>({} as Proj2);

type Proj3 = Projected<
  Foo,
  {
    a: 0;
    _id: true;
  }
>;

type Proj3Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ep': never;
};

expectType<Proj3>({} as Proj3Expected);
expectType<Proj3Expected>({} as Proj3);

type Proj4 = Projected<
  Foo,
  {
    a: 1;
  }
>;
type Proj4Expected = {
  _id: ObjectId;
  a: number;
  ' _ip': never;
};
expectType<Proj4>({} as Proj4Expected);
expectType<Proj4Expected>({} as Proj4);

type Proj5 = Projected<
  Foo,
  {
    a: 1;
    _id: true;
  }
>;
type Proj5Expected = {
  _id: ObjectId;
  a: number;
  ' _ip': never;
};
expectType<Proj5>({} as Proj5Expected);
expectType<Proj5Expected>({} as Proj5);

type Proj6 = Projected<
  Foo,
  {
    a: 1;
    _id: false;
  }
>;
type Proj6Expected = {
  a: number;
  ' _ip': never;
};
expectType<Proj6>({} as Proj6Expected);
expectType<Proj6Expected>({} as Proj6);

type Proj23 = Projected<
  Foo,
  {
    _id: false;
    a: 1;
    d: 1;
  }
>;
type Proj23Expected = {
  a: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ip': never;
};
expectType<Proj23>({} as Proj23Expected);
expectType<Proj23Expected>({} as Proj23);

type Proj7 = Projected<
  Foo,
  {
    a: 0;
  }
>;
type Proj7Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ep': never;
};
expectType<Proj7>({} as Proj7Expected);
expectType<Proj7Expected>({} as Proj7);

type Proj8 = Projected<
  Foo,
  {
    a: 0;
    _id: true;
  }
>;
type Proj8Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ep': never;
};
expectType<Proj8>({} as Proj8Expected);
expectType<Proj8Expected>({} as Proj8);

type Proj9 = Projected<
  Foo,
  {
    a: 0;
    _id: false;
  }
>;
type Proj9Expected = {
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ep': never;
};
expectType<Proj9>({} as Proj9Expected);
expectType<Proj9Expected>({} as Proj9);

type Proj10 = Projected<
  Foo,
  {
    a: 1;
    extra: 1;
  }
>;
type Proj10Expected = {
  _id: ObjectId;
  a: number;
  extra: unknown;
  ' _ip': never;
};
expectType<Proj10>({} as Proj10Expected);
expectType<Proj10Expected>({} as Proj10);

type Proj11 = Projected<
  Foo,
  {
    a: 0;
    extra: 0;
  }
>;
type Proj11Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ep': never;
};
expectType<Proj11>({} as Proj11Expected);
expectType<Proj11Expected>({} as Proj11);

/** Nested fields */

/** Nested inclusion projection */

type Proj12 = Projected<
  Foo,
  {
    _id: 0;
    a: 1;
    'd.f.g': 1;
  }
>;
type Proj12Expected = {
  a: number;
  d: {
    f: {
      g: string;
    };
  }[];
  ' _ip': never;
};
expectType<Proj12>({} as Proj12Expected);
expectType<Proj12Expected>({} as Proj12);

type Proj13 = Projected<
  Foo,
  {
    a: 1;
    'd.f.g': 1;
    'd.f.i': 1;
  }
>;
type Proj13Expected = {
  _id: ObjectId;
  a: number;
  d: {
    f: {
      g: string;
      i: Date;
    };
  }[];
  ' _ip': never;
};
expectType<Proj13>({} as Proj13Expected);
expectType<Proj13Expected>({} as Proj13);

/** Nested exclusion projection */

type Proj14 = Projected<
  Foo,
  {
    a: 0;
    'd.f.g': 0;
  }
>;
type Proj14Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      h: string;
      i: Date;
    };
  }[];
  ' _ep': never;
};
expectType<Proj14>({} as Proj14Expected);
expectType<Proj14Expected>({} as Proj14);

/** Unecessary projection */

type Proj15 = Projected<
  Foo,
  {
    a: 0;
    d: 0;
    'd.f.g': 0;
  }
>;
type Proj15Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  ' _ep': never;
};
expectType<Proj15>({} as Proj15Expected);
expectType<Proj15Expected>({} as Proj15);

/** Multiple projection with shared path prefix */
type Proj16 = Projected<
  Foo,
  {
    a: 0;
    'd.f.g': 0;
    'd.f.i': 0;
  }
>;

type Proj16Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      h: string;
    };
  }[];
  ' _ep': never;
};
expectType<Proj16>({} as Proj16Expected);
expectType<Proj16Expected>({} as Proj16);

/** Multiple projection with shared path prefix */

type Proj17 = Projected<
  Foo,
  {
    a: 0;
    'd.f.g': 0;
    'd.f.i': 0;
  }
>;
type Proj17Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      h: string;
    };
  }[];
  ' _ep': never;
};
expectType<Proj17>({} as Proj17Expected);
expectType<Proj17Expected>({} as Proj17);

/** Inclusion projection with string value */

type Proj18 = Projected<
  Foo,
  {
    a: 1;
    'd.f.g': 1;
    'd.f.foo': 'yay';
  }
>;
type Proj18Expected = {
  _id: ObjectId;
  a: number;
  d: {
    f: {
      foo: 'yay';
      g: string;
    };
  }[];
  ' _ip': never;
};
expectType<Proj18>({} as Proj18Expected);
expectType<Proj18Expected>({} as Proj18);

/** Exclusion projection with string value */

// Direct value in an exclusion projection is forbidden.
type Proj19 = Projected<
  Foo,
  {
    a: 0;
    'd.f.foo': 'yay';
  }
>;

type Proj19Expected = never;
expectType<Proj19>({} as Proj19Expected);
expectType<Proj19Expected>({} as Proj19);

/** Field reference */

type Proj20 = Projected<
  Foo,
  {
    a: 1;
    'd.f.g': '$d.f.i';
  }
>;
type Proj20Expected = {
  _id: ObjectId;
  a: number;
  d: {
    f: {
      g: Date;
    };
  }[];
  ' _ip': never;
};
expectType<Proj20>({} as Proj20Expected);
expectType<Proj20Expected>({} as Proj20);

/** Operators $slice */

type Proj21 = Projected<
  Foo,
  {
    a: 1;
    d: { $slice: 43 };
  }
>;

type Proj21Expected = {
  _id: ObjectId;
  a: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ip': never;
};
expectType<Proj21>({} as Proj21Expected);
expectType<Proj21Expected>({} as Proj21);

type Proj22 = Projected<
  Foo,
  {
    a: 0;
    d: { $slice: 43 };
  }
>;
type Proj22Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ep': never;
};
expectType<Proj22>({} as Proj22Expected);
expectType<Proj22Expected>({} as Proj22);

type Proj24 = Projected<
  Foo,
  {
    a: 0;
    d: { $elemMatch: { name: 'foo' } };
  }
>;
type Proj24Expected = {
  _id: ObjectId;
  b: string;
  c: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ep': never;
};
expectType<Proj24>({} as Proj24Expected);
expectType<Proj24Expected>({} as Proj24);

type Proj25 = Projected<
  Foo,
  {
    a: 1;
    d: { $elemMatch: { name: 'foo' } };
  }
>;

type Proj25Expected = {
  _id: ObjectId;
  a: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ip': never;
};
expectType<Proj25>({} as Proj25Expected);
expectType<Proj25Expected>({} as Proj25);

type Proj26 = Projected<
  Foo,
  {
    a: 1;
    'd.$': 1;
  }
>;

type Proj26Expected = {
  _id: ObjectId;
  a: number;
  d: {
    e: string;
    f: {
      g: string;
      h: string;
      i: Date;
    };
  }[];
  ' _ip': never;
};
expectType<Proj26>({} as Proj26Expected);
expectType<Proj26Expected>({} as Proj26);

type Proj27 = Projected<
  Foo,
  {
    a: number;
    b: number;
  }
>;
type Proj27Expected = never;
expectType<Proj27>({} as Proj27Expected);
expectType<Proj27Expected>({} as Proj27);

describe('Projection typing tests', () => {
  it('runs the typing without error', () => {
    // Nothing to do here, we just want this module to be read.
  });
});
