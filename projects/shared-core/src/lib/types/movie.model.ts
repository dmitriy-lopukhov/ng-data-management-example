type Language = "English" | "Japanese";
type Status = "Running" | "Ended" | "To Be Determined";

export interface IMovie {
  genres: string[];
  id: number;
  image: { medium: string; original: string };
  language: Language;
  name: string;
  officialSite: string;
  premiered: string;
  rating: { average: number };
  runtime: number;
  schedule: { time: string; days: string[] };
  status: Status;
  summary: string;
  updated: number;
  url: string;
  weight: number;
}

export type MovieFilters = {
  query?: string;
};

type PropType<T, TProp extends keyof T> = T[TProp];

export type Query = PropType<MovieFilters, "query">;
