import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateBookComponent } from './library/create-book.component';
import { ListBookComponent } from './library/list-book.component';
import { BookDetailsComponent } from './library/book-details.component';
import { BookService } from './library/book.service';
import { DisplayBookComponent } from './library/display-book.component';
import { BookListResolverService } from './library/book-list-resolver.service';
import { BookOneResolverService } from './library/book-one-resolver.service';
import { BookFilterPipe } from './library/book-filter.pipe';
import { BookEditResolverService } from './library/book-edit-resolver.service';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListBookComponent,
    resolve: { bookList: BookListResolverService }
  },  
  { path: 'create', component: CreateBookComponent },
  {
    path: 'edit/:id', component: CreateBookComponent,
    resolve: { bookEdit: BookEditResolverService }
  },
  {
    path: 'list/:id', component: BookDetailsComponent,
    resolve: { bookOne: BookOneResolverService }
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    CreateBookComponent,
    ListBookComponent,
    BookDetailsComponent,
    DisplayBookComponent,
    BookFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [BookService, BookListResolverService, BookOneResolverService, BookEditResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
