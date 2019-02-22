import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { IUser } from '../models/user.model';

interface IUsersState {
  users: IUser[];
  currentUser: IUser;
}

const initialState: IUsersState = {
  users: [],
  currentUser: null
};

const testData: IUser[] = [
  {
    id: 1,
    name: 'user 1',
  },
  {
    id: 2,
    name: 'user 2',
  },
  {
    id: 3,
    name: 'user 3',
  },
];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public state = new BehaviorSubject<IUsersState>(initialState);

  constructor() { }

  private setState(state: IUsersState) {
    this.state.next({ ...state });
  }

  loadUsers() {
    this.getUsers()
      .subscribe(data => this.setState({ ...this.state.value, users: data }));
  }

  loadUserById(id: number) {
    this.getUserById(id)
      .subscribe(user => this.setState({ ...this.state.value, currentUser: user }));
  }

  private getUsers(): Observable<IUser[]> {
    return of(testData);
  }

  private getUserById(id: number): Observable<IUser> {
    return of(testData.find(i => i.id === id));
  }
}
