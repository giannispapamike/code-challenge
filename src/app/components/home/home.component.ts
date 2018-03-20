import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersdataService } from '../../services/usersdata.service';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Declaration
  usersData: any;
  postsData: any;
  commentsData: any;
  userNames: string[] = [];

  posts: {
    posts: number,
    id: number
  }[] = [];

  cp: {
    cp: number,
    id: number
  }[] = []; // comments / posts, per user

  comments: number[] = [];

  subsEval: boolean = false;
  nameFlag: boolean = true;
  postsFlag: boolean = true;
  cpFlag: boolean = true;

  private usersSub: any;
  private postsSub: any;
  private commentsSub: any;

  constructor(
    private usersdataService: UsersdataService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    // Fetch Data with Http requests to Backend
    this.usersSub = this.usersdataService.getData("http://jsonplaceholder.typicode.com/users")
      .subscribe(
        (data) => {
          this.usersData = data;
          this.dataService.setUsers(data);
        },
        (error) => console.log("Something went wrong, " + error),
        () => {
          console.log('Subscription 1 completed!');
          this.postsSub = this.usersdataService.getData("http://jsonplaceholder.typicode.com/posts")
            .subscribe(
              (data) => this.extractPosts(data),
              (error) => console.log("Something went wrong, " + error),
              () => {
                console.log('Subscription 2 completed!');
                this.commentsSub = this.usersdataService.getData("http://jsonplaceholder.typicode.com/comments")
                  .subscribe(
                    (data) => this.extractComments(data),
                    (error) => console.log("Something went wrong, " + error),
                    () => {
                      console.log('Subscription 3 completed!');
                      this.subsEval = true;
                    }
                  );
              }
            );
        }
      );
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.postsSub.unsubscribe();
    this.commentsSub.unsubscribe();
  }

  extractPosts(data) {
    this.postsData = data;
    this.dataService.setPosts(data);

    for (let i = 0; i < this.usersData.length; i++) {
      this.userNames.push(this.usersData[i].name);
      this.posts.push({ posts: 0, id: this.usersData[i].id });
      this.cp.push({ cp: 0, id: this.usersData[i].id });
      this.comments.push(0);
    }

    for (let j = 0; j < this.postsData.length; j++)
      this.posts.find((obj) => obj.id === this.postsData[j].userId).posts++;

    // Hardcode some data for debugging purposes
    this.posts[0].posts = 15;
    this.posts[4].posts = 5;
    this.posts[7].posts = 25;
  }

  extractComments(data) {
    this.commentsData = data;
    this.dataService.setComments(data);

    for (let i = 0; i < this.commentsData.length; i++)
      this.comments[this.postsData[this.commentsData[i].postId - 1].userId - 1]++;

    for (let i = 0; i < this.usersData.length; i++)
      this.cp[i].cp = this.comments[i] / this.posts[i].posts;

    console.log(this.dataService.getUsers());
    console.log(this.dataService.getPosts());
    console.log(this.dataService.getComments());
  }

  sortByName() {
    this.nameFlag ? this.usersData.sort((a, b) => a.name.localeCompare(b.name)) : this.usersData.reverse();
    this.nameFlag = !this.nameFlag;
  }

  sortByPosts() {
    this.postsFlag ? this.usersData.sort((a, b) => (this.posts[this.posts.findIndex((obj) => obj.id === a.id)].posts > this.posts[this.posts.findIndex((obj) => obj.id === b.id)].posts ? 1 : -1)) : this.usersData.reverse();
    this.postsFlag = !this.postsFlag;
  }

  sortByCP() {
    this.cpFlag ? this.usersData.sort((a, b) => (this.cp[this.cp.findIndex((obj) => obj.id === a.id)].cp > this.cp[this.cp.findIndex((obj) => obj.id === b.id)].cp ? 1 : -1)) : this.usersData.reverse();
    this.cpFlag = !this.cpFlag;
  }

  getUsersData(): any {
    return this.usersData;
  }

}