import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_service/blog.service';
import { TagService } from 'src/app/_service/tag.service';


@Component({
  selector: 'app-blog-client',
  templateUrl: './blog-client.component.html',
  styleUrls: ['./blog-client.component.css']
})
export class BlogClientComponent implements OnInit {


  listTag : any;
  listBlog : any;
  listBlogNewest: any;
  showBlog: any;
  totalBlogs: any;
  paginatedListBlog: any[] = [];

  constructor(private tagService: TagService,private blogService: BlogService){

  }

  ngOnInit(): void {
    this.getListBlog();
    this.getListTag();
    this.getListNewest();
    this.paginateBlogs({ first: 0, rows: 4 });
  }

  getListTag(){
    this.tagService.getListTag().subscribe({
      next: res =>{
        this.listTag = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  getListBlog(){
    this.blogService.getList().subscribe({
      next: res =>{
        this.listBlog = res;
        console.log(this.listBlog)
      },error: err =>{
        console.log(err);
      }
    })
  }

  getListNewest(){
    this.blogService.getListNewest(3).subscribe({
      next: res=>{
        this.listBlogNewest = res;
      },error: err =>{
        console.log(err);
      }
    })
  }
  getBlogByTag(tagId: number) {
    this.blogService.blogByTag(tagId).subscribe(
      {
        next: res =>{
          this.listBlog = res;
        },error: err=>{
          console.log(err);
        }
      })
  }
  paginateBlogs(event: any) {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.paginatedListBlog = this.listBlog.slice(startIndex, endIndex);
  }



}
