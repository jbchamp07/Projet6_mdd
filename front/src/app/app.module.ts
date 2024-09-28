import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PostListComponent } from './pages/Post/post-list/post-list.component';
import { LoginComponent } from './pages/User/login/login.component';
import { RegisterComponent } from './pages/User/register/register.component';
import { MeComponent } from './pages/User/me/me.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreatePostComponent } from './pages/Post/create-post/create-post.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { TopicListComponent } from './pages/topic/topic-list/topic-list.component';
import { CommentPostComponent } from './pages/Post/comment-post/comment-post.component';
import { AuthInterceptor } from './security/authInterceptor';


@NgModule({
  declarations: [AppComponent, HomeComponent, PostListComponent, LoginComponent, RegisterComponent, MeComponent, CreatePostComponent, NavbarComponent, TopicListComponent, CommentPostComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
