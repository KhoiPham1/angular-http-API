import {Component, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {IPost} from '../post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogList: IPost[] = [];
  blogForm: FormGroup;

  constructor(private postService: PostService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.postService
      .getPost()
      .subscribe(next => (this.blogList = next), error => (this.blogList = []));
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const {value} = this.blogForm;
      this.postService.createPost(value)
        .subscribe(next => {
          this.blogList.unshift(next);
          this.blogForm.reset({
            title: '',
            body: ''
          });
        }, error => console.log(error));
    }
  }

  deletePost(i) {
    const post = this.blogList[i];
    this.postService.deletePost(post.id).subscribe(() => {
      this.blogList = this.blogList.filter(t => t.id !== post.id);
    });
  }
}
