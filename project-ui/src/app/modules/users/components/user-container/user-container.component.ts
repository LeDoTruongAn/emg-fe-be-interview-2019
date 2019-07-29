import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from 'src/app/modules/login/components/register-dialog/register-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { DialogComfirmComponent } from 'src/app/modules/shared/dialog-comfirm/dialog-comfirm.component';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private userService: UsersService,
    private dialog: MatDialog
  ) { }
  displayedColumns: string[] = ['index', 'userName', 'firstName', 'lastName', 'created', 'action'];
  userModel: UserModel[];
  dataSource = new MatTableDataSource(this.userModel);

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getListUsers();
  }

  getListUsers() {
    this.userService.getListUser().subscribe(res => {
      res.map((r, index) => {
        r.index = index;
        return r = new UserModel(r);
      });
      this.dataSource = new MatTableDataSource([...res]);
      console.log(': this.dataSource', this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  actionEdit(user: UserModel): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '300px',
      data: {
        pageName: `Edit User`,
        infoUser: user
      }
    });
    dialogRef.componentInstance.addOn.subscribe(res => {
      if (res) {
        this.getListUsers();
      }
    });
  }

  actionDelete(user: UserModel): void {
    const dialogRef = this.dialog.open(DialogComfirmComponent, {
      width: '300px',
      data: { message: `Do you want to delete User Name ${user.userName} ?` }
    });
    dialogRef.componentInstance.onOk.subscribe(res => {
      if (res) {
        this.deleteUser(user.id);
      }
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(res => {
      this.getListUsers();
    });
  }


  public openDialogRegister(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '300px',
      data: { pageName: 'Add New User' }
    });
    dialogRef.componentInstance.addOn.subscribe(res => {
      if (res === 'success') {
        this.getListUsers();
      }
    });

  }

}
