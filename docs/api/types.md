# Types

## LoadAction
```ts
type LoadAction = {
  loaded(count?: number, pageSize?: number): State;
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

## State
Added in `v1.2.0`
```ts
type State = 'loading' | 'error' | 'no-more' | 'no-results';
```
Describes possible state for loader.
