import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../interfaces/iemployee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-employees',
  imports: [CommonModule],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css',
})
export class ListEmployeesComponent implements OnInit {
  employees: IEmployee | any;
  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
     this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (next) => (this.employees = next),
      (err) => console.log(err)
    );
  }
}
