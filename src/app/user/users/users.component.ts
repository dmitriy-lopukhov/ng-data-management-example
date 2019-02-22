import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users$: Observable<IUser[]>;

  constructor(private userService: UserService) {
    this.users$ = this.userService.state.pipe(map(state => state.users));

    this.userService.loadUsers();
  }


}
