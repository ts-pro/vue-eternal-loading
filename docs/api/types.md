# Types

## LoadAction
```ts
type LoadAction = {
  loaded(count?: number, pageSize?: number): void;
  noMore(): void;
  noResults(): void;
  error(): void;
};
```
Describes possible actions in `loaded` prop callback.

## LoadPayload
```ts
type LoadPayload = {
  isFirstLoad: boolean;
};
```
Describes payload what we get in `loaded` prop callback.

## Position
```ts
type Position = 'top' | 'left' | 'default';
```
Describes possible loader positions.
