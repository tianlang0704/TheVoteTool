import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { VoteListComponent } from "./components/vote-list/vote-list.component";
import { VoteDetailComponent } from "./components/vote-list/vote-detail/vote-detail.component";

import { VoteService } from "./services/vote.service";
import { BotbarComponent } from './components/botbar/botbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CreateNewListComponent } from './components/create-new-list/create-new-list.component';


@NgModule({
  declarations: [
    AppComponent,
    VoteListComponent,
    VoteDetailComponent,
    BotbarComponent,
    TopbarComponent,
    CreateNewListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [VoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
