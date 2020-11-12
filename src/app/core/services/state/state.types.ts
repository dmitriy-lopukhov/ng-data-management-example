export type State<T> = {
  entries: {
    [key: number]: T;
  };
  ids: number[];
  total: number;
  loading: boolean;
  loaded: boolean;
  page: number;
  pageSize: number;
};

export type Nullable<T> = T | null;

export type WithID<T> = T & { id: number };
