import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostListComponent } from './pages/Post/post-list/post-list.component';
import { CreatePostComponent } from './pages/Post/create-post/create-post.component';
import { RegisterComponent } from './pages/User/register/register.component';
import { LoginComponent } from './pages/User/login/login.component';
import { TopicListComponent } from './pages/topic/topic-list/topic-list.component';
import { CommentPostComponent } from './pages/Post/comment-post/comment-post.component';
import { MeComponent } from './pages/User/me/me.component';
import { AuthGuard } from './security/authGuard';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [{ path: '', component: HomeComponent },
  {
    path: 'posts',
    component:PostListComponent,
    canActivate: [AuthGuard]
  },{
    path: 'posts/create',
    component:CreatePostComponent,
    canActivate: [AuthGuard]
  },{
    path: 'register',
    component:RegisterComponent
  },{
    path: 'login',
    component:LoginComponent
  },{
     path: '',
    component: HomeComponent
  },{
    path: 'posts',
   component: PostListComponent,
   canActivate: [AuthGuard]
 },{
  path: 'topics',
  component: TopicListComponent,
  canActivate: [AuthGuard]
 }
 ,{
  path: 'posts/:id',
  component: CommentPostComponent,
  canActivate: [AuthGuard]
 },
 {
  path: 'user/me',
  component: MeComponent,
  canActivate: [AuthGuard]
 }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
