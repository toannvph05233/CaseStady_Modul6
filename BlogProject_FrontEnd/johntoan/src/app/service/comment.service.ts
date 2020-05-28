import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentPost} from "../examples/model/CommentPost";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  urlGetCommentByPost: string = "http://localhost:8080/api/getcommentbypost/";
  urlSaveComment:string ="http://localhost:8080/api/savecomment/"

  constructor(private httpClient: HttpClient) {
  }

  getCommentByPost(id:number) {
   return this.httpClient.get(this.urlGetCommentByPost+id);
  }

  sendComment(comment:CommentPost,postId:number) {
    this.httpClient.post(this.urlSaveComment+postId, comment).subscribe(result => console.log(result));
  }
}
