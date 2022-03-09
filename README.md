# Mongest Projection (BETA)

### Delightfully-typed MongoDB Projection

This package attempts to compute a precise returned type according to a given MongoDB projection.

**Note: This package only provide types. Unless you're writing your own mongodb wrapper, you may not need this package.**

This package is currently used by https://github.com/OoDeLally/mongest-service, which provides a ready-to-use NestJS service wrapping mongoose methods.

# Usage

```
npm i -D mongest-projection
```

```ts
class Cat {
  _id: ObjectId;
  name: string;
  age: number;
  color: string;
  slaves: Human[];
}

type ProjectedCat = Projected<Cat, { name: 1 }>
// {
//   _id: ObjectId;
//   name: string;
// }
```

# Features

## Inclusion Projection

```ts
const cat = await catService.findOne({}, { projection: { name: 1 } });
// {
//   _id: ObjectId;
//   name: string;
// }
```

## Exclusion Projection

```ts
const cat = await catService.findOne({}, { projection: { _id: false, name: 0 } });
// {
//   age: number;
//   color: string;
//   slaves: { name: string, age: number }[];
//   _ep: never;
// }
```

## Hard-coded value

```ts
const cat = await catService.findOne({}, { projection: { name: 1, foo: 'foo' } });
// {
//   _id: ObjectId;
//   name: string;
//   foo: 'foo';
// }
```

## Reference

```ts
const cat = await catService.findOne({}, { projection: { litterCleaner: '$slaves' } });
// {
//   _id: ObjectId;
//   litterCleaner: { name: string, age: number }[];
// }
```

## Nested fields

```ts
const cat = await catService.findOne({}, { projection: { 'slaves.name': 1 } });
// {
//   _id: ObjectId;
//   slaves: { name: string}[];
// }
```

## Operators

```ts
const cat = await catService.findOne({}, { projection: { 'slaves': { $slice: [0, 2]} } });
// {
//   _id: ObjectId;
//   slaves: { name: string, age: number }[];
//   _ep: never;
// }
```

## Unknown extra fields

```ts
const cat = await catService.findOne({}, { projection: { name: 1, enemy: 1 } });
// {
//   _id: ObjectId;
//   name: string;
//   enemy: unknown; // The returned doc MAY have a `enemy` field, but the `Cat` class does not provide a type.
// }
```


# FAQ

## ` _ip`, ` _ep` flag

Documents projected with an **I**nclusion/**E**nclusion **P**rojection have an extra `{ ' _ip': never }`/`{ ' _ep': never }` field.
This flag provides the information that the projection was an exclusion projection, it is possible that the object contains more fields not documented by the type.
Knowing this information is important for further processing, in particular when casting the entity to a more specific child class.

## Support of edge cases

MongoDB projections have many edge cases with behaviors varying according to versions. It is therefore possible that the typing does not reflect exactly what your version of mongo sends you back. If you encounter a problem, and believe it is not an edge case, and should instead be addressed, do not hesitate to create a github issue.
