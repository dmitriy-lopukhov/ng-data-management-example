import { BehaviorSubject } from "rxjs";
import { Nullable } from "./state.types";

export abstract class StateService<T> {
  private initialState: Nullable<T> = null;
  private state = new BehaviorSubject<Nullable<T>>(this.initialState);
  protected readonly state$ = this.state.asObservable();

  constructor(private inputState?: T) {
    if (inputState) {
      this.initialState = inputState;
    }
  }

  protected setState(state: T): void {
    this.state.next({ ...state });
  }

  protected updateState(state: T): void {
    const newState: T = { ...this.getState(), ...state };
    this.state.next(newState);
  }

  protected getState(): Nullable<T> {
    return this.state.getValue();
  }
}
