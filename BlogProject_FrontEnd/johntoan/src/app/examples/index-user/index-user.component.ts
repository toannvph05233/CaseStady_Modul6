import {Component, OnInit} from '@angular/core';
import {Post} from '../model/Post';
import {HttpClient} from '@angular/common/http';
import {PostServiceService} from '../service/post-service.service';


@Component({
    selector: 'app-index-user',
    templateUrl: './index-user.component.html',
    styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {
    listPost: Post[];
    introduce: string[];

    constructor(private http: HttpClient, private postService: PostServiceService) {
    }

    ngOnInit() {
        this.getAllBook();
    }

    sliceConten(conten: string) {
        if (conten.length > 400) {
            return conten.slice(0, 400) + '...';
        } else {
            return conten;
        }
    }

    getAllBook() {
        const url = 'http://localhost:8080/posts/';
        this.http.get<Post[]>(url).subscribe((resJson) => {
            this.listPost = resJson;
            console.log(this.listPost);
        });
    }

    addPostToService(post: Post) {
        // this.postService.setPost(post);
    }

    deletePost(post: Post) {
        if (confirm('Bạn muốn xóa chứ')) {
            const url = 'http://localhost:8080/posts/' + post.id;
            this.http.delete(url).subscribe((resJson) => {
                alert('delete thành công');
                this.getAllBook();
            }, error => {
                alert('delete lỗi');
            });
        }
    }
}
