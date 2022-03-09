/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { describe } from 'mocha';
import { ObjectId } from 'mongodb';
import { Projected } from 'src/projected';
import { expectType } from 'tsd';

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
    a: 0;
    b: number;
    _id: false;
  }
>;
type Proj27Expected = {
  b: string | undefined; // Cannot be sure whether the field was projected.
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
expectType<Proj27>({} as Proj27Expected);
expectType<Proj27Expected>({} as Proj27);

type Proj28 = Projected<
  Foo,
  {
    a: 1;
    b: number;
    d: boolean;
    _id: false;
  }
>;
type Proj28Expected = {
  a: number;
  b: string | undefined; // Cannot be sure whether the field was projected.
  d:
    | {
        e: string;
        f: {
          g: string;
          h: string;
          i: Date;
        };
      }[]
    | undefined; // Cannot be sure whether the field was projected.
  ' _ip': never;
};
expectType<Proj28>({} as Proj28Expected);
expectType<Proj28Expected>({} as Proj28);

type Proj29 = Projected<
  Foo,
  {
    a: 1;
    b: number;
    'd.e': boolean;
    _id: false;
  }
>;
type Proj29Expected = {
  a: number;
  b: string | undefined; // Cannot be sure whether the field was projected.
  d: {
    e: string | undefined; // Cannot be sure whether the field was projected.
  }[];
  ' _ip': never;
};
expectType<Proj29>({} as Proj29Expected);
expectType<Proj29Expected>({} as Proj29);

type Proj30 = Projected<
  Foo,
  {
    b: number;
    _id: false;
  }
>;
type Proj30Expected = {
  a: number;
  b: string | undefined; // Cannot be sure whether the field was projected.
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
expectType<Proj30>({} as Proj30Expected);
expectType<Proj30Expected>({} as Proj30);

describe('Projection typing tests', () => {
  it('runs the typing without error', () => {
    // Nothing to do here, we just want this module to be read.
  });
});
