import { Topic } from "./Topic";
import { User } from "./User";
import { Comment } from "./Comment";

export interface Post{
    id?: number;
    title: string;
    description: string;
    user?: User;
    comments?: Comment[];
    topics: Topic[];
    subscribers?: User[];
    createdAt?: string;
}