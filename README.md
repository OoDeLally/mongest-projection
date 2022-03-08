# Mongest Projection (BETA)

### Delightfully-typed MongoDB Projection

This package attempts to compute a precise returned type according to a given MongoDB projection.

Note: This package only provide types. Unless you're writing your own mongodb wrapper, you may not need this package.

This package is currently used by https://github.com/OoDeLally/mongest-service, which provides a ready-to-use NestJS service wrapping mongoose methods.

## Inclusive Projection

```ts
const cat = await catService.findOne({}, { projection: { name: 1 } });
if (cat) {
  const name = cats.name; // string (projected value)
  const age = cats.age; // << TypeError: Property 'age' does not exist on type '{ name: string; _id: ObjectId; }'
}
```

## Exclusive Projection

```ts
const cat = await catService.findOne({}, { projection: { name: 0 } });
if (cat) {
  const name = cats.name; // << TypeError: Property 'name' does not exist on type '{ name: string; _id: ObjectId; }'
  const age = cats.age; // number (projected value)
}
```

