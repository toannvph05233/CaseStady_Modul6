import {Post} from "./Post";
import {UserPost} from "./UserPost";

export interface CommentPost {
    id?: number;
    parentId?: number;
    content?:string;
    post?:Post;
    userByUserId?:UserPost;
}
