import {Injectable} from '@angular/core';
import {Post} from '../model/Post';
import {BehaviorSubject} from 'rxjs';
import {CommentPost} from '../model/CommentPost';
import {CategoryEntity} from '../model/CategoryEntity';
import {PostLikes} from '../model/PostLikes';
import {TagEntity} from '../model/TagEntity';
import {UserPost} from '../model/UserPost';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class PostServiceService {
    urlGetPostByUser: string = "http://localhost:8080/api/getpostbyuser";
    urlCreateLink: string = "http://localhost:8080/api/createlink/";
    urlGetPrivatePostByUser: string = "http://localhost:8080/api/getprivatepostbyuser";
    urlSavePostWithNoChangeFile: string = "http://localhost:8080/api/savepostnochangefile";
    posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
    post: BehaviorSubject<Post> = new BehaviorSubject<Post>(new class implements Post {
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
    });

    constructor(private httpClient:HttpClient,private router:Router) {
    }

    getPostByUser() {
        console.log(this.urlGetPostByUser);
        this.httpClient.get(this.urlGetPostByUser).subscribe((u: Post[]) => {
                this.posts.next(u);
                // alert(this.posts.value.length);
            }, error => console.log(error)
        );
        return this.posts;
    }

    savePost(post: Post) {
        this.httpClient.post(this.urlSavePostWithNoChangeFile, post).subscribe(result => console.log(result), error => console.log(error));
        this.router.navigate(["/profile"]);
    }

    createLink(id: number, name: string) {
        return this.httpClient.post(this.urlCreateLink + id, name);
    }

    getPost() {
        return this.post;
    }

    setPost(postId: string) {
        this.httpClient.post(this.urlGetPrivatePostByUser,postId).subscribe((u:Post) => {
            console.log(u);
            this.post.next(u);

        },error => console.log(error));
    }

    getAllPostByUser() {

    }
}
