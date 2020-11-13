import { BehaviorSubject } from "rxjs";
import { defaultPage, defaultPageSize } from "./state.constants";
import { State, WithID } from "./state.types";

export abstract class EntityService<T> {
  protected initialState: State<T> = {
    entries: {},
    ids: [],
    total: 0,
    loaded: false,
    loading: false,
    page: defaultPage,
    pageSize: defaultPageSize,
  };
  private state = new BehaviorSubject<State<T>>(this.initialState);
  protected readonly state$ = this.state.asObservable();

  constructor(private inputState?: State<T>) {
    if (this.inputState) {
      this.initialState = this.inputState;
    }
  }

  protected setEntries(entries: WithID<T>[]): void {
    const ids = [...new Set(entries.map((i) => i.id))];
    const newState: State<T> = entries.reduce(
      (res: State<T>, i) => {
        res.entries[i.id] = i;
        return res;
      },
      {
        ...this.initialState,
        ids,
        total: ids.length,
        loaded: true,
        loading: false,
      }
    );
    this.setState(newState);
  }

  protected setEntry(entry: T & { id: number }): void {
    const entries = { ...this.getState().entries };
    delete entries[entry.id];
    const ids = [...new Set(this.getState().ids.concat([entry.id]))];
    const newState: State<T> = {
      ...this.getState(),
      entries,
      ids,
    };
    this.setState(newState);
  }

  protected removeEntry(entry: T & { id: number }): void {
    const entries = {
      ...this.getState().entries,
      [entry.id]: entry,
    };
    const ids = [
      ...new Set(this.getState().ids.filter((id) => id !== entry.id)),
    ];
    const newState: State<T> = {
      ...this.getState(),
      entries,
      ids,
    };
    this.setState(newState);
  }

  protected getState(): State<T> {
    return this.state.getValue();
  }
  protected setState(state: State<T>): void {
    this.state.next(state);
  }
  protected patchState(state: Partial<State<T>>): void {
    this.state.next({ ...this.getState(), ...state });
  }
}
