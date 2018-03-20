import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  users: any;
  posts: any;
  comments: any;

  constructor() { }

  setUsers(data: any) {
    this.users = data;
  }

  getUsers(): any {
    return this.users;
  }

  setPosts(data: any) {
    this.posts = data;
  }

  getPosts(): any {
    return this.posts;
  }

  setComments(data: any) {
    this.comments = data;
  }

  getComments(): any {
    return this.comments;
  }

}
