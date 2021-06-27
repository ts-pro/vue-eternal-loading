export type LoadAction = {
  loaded(count?: number, pageSize?: number): void;
  noMore(): void;
  noResults(): void;
  error(): void;
};

export type LoadPayload = {
  isFirstLoad: boolean;
};

export type State = 'loading' | 'error' | 'no-more' | 'no-results';

export type Position = 'top' | 'left' | 'default';
