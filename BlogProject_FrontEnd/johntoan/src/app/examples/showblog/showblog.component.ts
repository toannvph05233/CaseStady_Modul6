import {Component, OnInit} from '@angular/core';
import {PostServiceService} from '../service/post-service.service';
import {Post} from '../model/Post';
import {UserPost} from '../model/UserPost';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
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
import {filter, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CommentService} from "../../service/comment.service";
@Component({
    selector: 'app-showblog',
    templateUrl: './showblog.component.html',
    styleUrls: ['./showblog.component.css']
})
export class ShowblogComponent implements OnInit {

    postList: Post[]=[];
    commentList: CommentPost[]= [];
    userName:string;
    commentForm:any = FormGroup;
    createdAt:any;
    updatedAt:any;
    userNameOfUserWroteCurrentPost:string;
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
                private route: ActivatedRoute,
                private router: Router,
                private httpClient: HttpClient,
                private formBuilder: FormBuilder,
                private userService: UserService,
                private commentService: CommentService) {
    }

    private id:number;
    ngOnInit(): void {
        //Lay thong tin user dang dang nhap de hien thi hay nut edit va delete khi xem chi tiet bai viet
        this.userName=localStorage.getItem('currentUserName');
        this.route.params.subscribe(b => {
            this.id = b['id'];
            this.commentService.getCommentByPost(this.id).subscribe((c:CommentPost[]) =>{
                this.commentList = c;
                console.log(this.commentList[0].userByUserId.userName);
            },error => console.log(error));
        });
        this.route.paramMap.subscribe(param => {
            //Xu ly refresh page du lieu bi mat
            this.id = +param.get('id');
            this.post = this.postService.getOnePost(this.id);
            if(this.post===undefined){
                this.postService.fetchAllPostFromAPI().subscribe((resJson) => {
                    this.postService.postList = resJson;
                    this.post = this.postService.getOnePost(this.id);
                    console.log(this.post);
                    this.createdAt=this.postService.timeConverter(this.post.createdAt);
                    this.updatedAt=this.postService.timeConverter(this.post.updatedAt);
                });
            }
            //Xu ly hien time sau khi back page
            this.createdAt=this.postService.timeConverter(this.post.createdAt);
            this.updatedAt=this.postService.timeConverter(this.post.updatedAt);
            console.log(this.post.updatedAt);
        });

        this.commentForm = this.formBuilder.group({
            content: new FormControl('',[Validators.required])
        });

        this.getUserWroteCurrentPost();
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

    getUserWroteCurrentPost() {
        this.userService.getUserWroteCurrentPost(this.id).subscribe(result=>{
            this.userNameOfUserWroteCurrentPost = result.userName;
            console.log("Da ly duoc user viet post nat" + this.userNameOfUserWroteCurrentPost);
        })
    }
}
