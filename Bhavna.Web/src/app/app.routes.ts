import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { PostsComponent } from './posts/posts.component';
import { RegistraionComponent } from './components/registraion/registraion.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';

export const routes: Routes = [
   // {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: 'products', component: ProductComponent},
    {path: 'posts', component: PostsComponent},
    {path: 'registration', component: RegistraionComponent},
    {path: 'employees', component: ListEmployeesComponent}
];
