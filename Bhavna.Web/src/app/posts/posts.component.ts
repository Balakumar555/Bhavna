import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts:Post[] = [];
  constructor(private postService: PostService) {}
 ngOnInit(): void {
    this.loadPosts();
  }
  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data || [];
        console.log('Posts loaded:', data);
      },
      error: (err) => {
        console.error('Error loading posts', err);
      },
      complete: () => {
        console.log('Post loading completed');
      },
    });
  }
}
