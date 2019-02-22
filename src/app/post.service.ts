import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPost} from './post';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly URL = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  }

  getPost(count = 10): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.URL).pipe(
      map(data => data.filter((post, i) => i < count))
    );
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.URL}/${id}`);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(this.URL, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${this.URL}/${post.id}`, post);
  }
}
