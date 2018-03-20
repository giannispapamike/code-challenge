import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
// import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: number;
  name: string;
  email: string;
  street: string;
  suite: string;
  username: string;
  posts: any[] = [];
  comments: {
    id: number,
    comments: any[]
  }[] = [];
  commentsExpanded: {
    id: number,
    expanded: boolean
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) { }


  ngOnInit() {

    if (this.dataService.getUsers() === undefined)
      this.router.navigateByUrl('');

    this.id = +this.route.snapshot.paramMap.get('id');
    this.createData();
  }

  createData() {  
    let user = this.dataService.getUsers().find( (obj) => obj.id === this.id );
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.street = user.address.street;
    this.suite = user.address.suite;

    for (let i = 0; i < this.dataService.getPosts().length; i++) {
      // Get User's Posts
      if (this.dataService.getPosts()[i].userId == this.id) {
        this.posts.push( this.dataService.getPosts()[i] );
        this.comments.push( {id: this.dataService.getPosts()[i].id, comments: []} );
        this.commentsExpanded.push( { id: this.dataService.getPosts()[i].id, expanded: false } ) ;
      }
    }

    // For every post get it's comments
    for (let j = 0; j < this.dataService.getComments().length; j++) {
      let temp = this.comments.findIndex( (obj) => obj.id === this.dataService.getComments()[j].postId );
      if(temp >= 0) 
        this.comments[temp].comments.push( this.dataService.getComments()[j] );
    }
  }

  findComments(id): any[] {
    return this.comments.find( (obj) => obj.id === id ).comments;
  }

  findLength(id): number {
    return this.comments.find( (obj) => obj.id === id ).comments.length;
  }

  checkExpandedStatus(id): any {
    return this.commentsExpanded.find( (obj) => obj.id === id );
  }

}
