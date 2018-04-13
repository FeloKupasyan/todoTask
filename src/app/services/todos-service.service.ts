import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TodosServiceService {

  apiURL: string = 'https://avetiq-test.firebaseapp.com';
  username = 'sona_avagyan';

  constructor(private http: HttpClient) {
  }

  getUserId(): Observable<any> {
    return this.http.get(`${this.apiURL}/user/${this.username}`);
  }

  getGroupId(): Observable<any> {
    return this.http.get(`${this.apiURL}/group/${this.username}`);
  }


  getTodoList(userId: string, groupId: string): Observable<any> {
    return this.http.get(`${this.apiURL}/todos/group/${groupId}/user/${userId}`);
  }

  editTodoList(userId: string, groupId: string, todoList: Array<any>): Observable<any> {
    console.log(userId, groupId, todoList);
    return this.http.put(`${this.apiURL}/todos/group/${groupId}/user/${userId}`, todoList);
  }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);
  }
}
