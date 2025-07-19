import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
   // {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: 'products', component: ProductComponent},
    {path: 'posts', component: PostsComponent} // Assuming you want to use the same component for posts
];
