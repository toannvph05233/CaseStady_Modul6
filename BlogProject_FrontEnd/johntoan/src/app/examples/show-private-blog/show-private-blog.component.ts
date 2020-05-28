import {Component, OnInit} from '@angular/core';
import {PostServiceService} from '../service/post-service.service';
import {Post} from '../model/Post';
import {UserPost} from '../model/UserPost';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryEntity} from "../model/CategoryEntity";
import {CommentPost} from "../model/CommentPost";
import {PostLikes} from "../model/PostLikes";
import {TagEntity} from "../model/TagEntity";
import {PostService} from "../../service/post.service";
import {HttpClient} from "@angular/common/http";
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";
import {UserService} from "../../service/user.service";
import {CommentService} from "../../service/comment.service";
@Component({
  selector: 'app-show-private-blog',
  templateUrl: './show-private-blog.component.html',
  styleUrls: ['./show-private-blog.component.css']
})
export class ShowPrivateBlogComponent implements OnInit {

  postList: Post[]=[];
  commentList: CommentPost[]= [];
  commentForm:any = FormGroup;
  createdAt:any="";
  updatedAt:any="";
  public Editor = DecoupledEditor;

  private post: Post = new class implements Post {
    categoryEntityList: CategoryEntity[];
    commentsById: CommentPost[];
    content: string;
    createdAt: number;
    id: number;
    postLikesById: PostLikes[];
    publishTime: number;
    publishedStatus: number;
    tagEntityList: TagEntity[];
    title: string;
    updatedAt: number;
    userByUserId: UserPost;
  };

  private comment:CommentPost= new class implements CommentPost {
    content: string;
  }

  constructor(private postService: PostService,
              private postServiceService:PostServiceService,
              private route:ActivatedRoute,
              private router: Router,
              private httpClient:HttpClient,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private commentService: CommentService) {
  }


  private id:number;

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      //Xu ly refresh page du lieu bi mat
      this.id = param['id'];
      this.commentService.getCommentByPost(this.id).subscribe((c:CommentPost[]) =>{
        this.commentList = c;
        console.log(this.commentList[0].userByUserId.userName);
      },error => console.log(error))
      this.postServiceService.setPost(this.id.toString());
      this.postServiceService.getPost().subscribe(p => {this.post = p;
        this.createdAt=this.postService.timeConverter(this.post.createdAt);
        this.updatedAt=this.postService.timeConverter(this.post.updatedAt);
      });
      // this.post = this.postService.getOnePost(this.id);
      // if(this.post===undefined){
      //   this.postService.fetchAllPostFromAPI().subscribe((resJson) => {
      //     this.postService.postList = resJson;
      //     this.post = this.postService.getOnePost(this.id);
      //     console.log(this.post);
      //     this.createdAt=this.postService.timeConverter(this.post.createdAt);
      //     this.updatedAt=this.postService.timeConverter(this.post.updatedAt);
      //   });
      // }
      //Xu ly hien time sau khi back page

    });

    this.commentForm = this.formBuilder.group({
      content: new FormControl('',[Validators.required])
    });
  }

  editPost(post:Post){
    this.router.navigate(['editPost',post.id]);
  }

  deletePost(post:Post){
    alert("Do you want to delete this Post?")
    console.log("postId"+ post.id);
    this.postService.deletePost(post.id).subscribe(result => {
      console.log("delete successfully");
      this.postService.getAllPost();
    }, error => {
      console.log("delete not successfully");
    });
//Cap nhat lai list of post sau khi sua
    this.postService.getAllPost();

    this.router.navigate(['home']);
  }
  viewChangeOfContentOfComment({ editor }: ChangeEvent){

    const data = editor.getData();
    this.commentForm.controls.content.value= data;
    console.log( this.commentForm.controls.content.value);
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }
  sendComment(){
    this.comment.content = (document.getElementById('inputPassword5') as HTMLInputElement).value;
    this.commentService.sendComment(this.comment, this.id);
  }


}

