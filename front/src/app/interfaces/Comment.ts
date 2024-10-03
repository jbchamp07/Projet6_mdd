import { Post } from "./Post";
import { User } from "./User";

export interface Comment{
    id?: number;
    user?: User;
    message: string;
    post?: Post;
    createdAt?: string;
}