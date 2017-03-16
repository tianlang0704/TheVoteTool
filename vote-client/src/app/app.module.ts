import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { VoteListComponent } from "./components/vote-list/vote-list.component";
import { VoteDetailComponent } from "./components/vote-detail/vote-detail.component";
import { BotbarComponent } from './components/botbar/botbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CreateNewListComponent } from './components/create-new-list/create-new-list.component';
import { VoteListJoinComponent } from './components/vote-list/vote-list-join/vote-list-join.component';
import { VoteListInfoComponent } from './components/vote-list/vote-list-info/vote-list-info.component';
import { VoteListRankingComponent } from './components/vote-list/vote-list-ranking/vote-list-ranking.component';
import { VoteListControlComponent } from './components/vote-list/vote-list-control/vote-list-control.component';
import { ButtonRadio } from "./components/common/button-radio.component";

import { VoteService } from "./services/vote.service";

@NgModule({
  declarations: [
    AppComponent,
    VoteListComponent,
    VoteDetailComponent,
    BotbarComponent,
    TopbarComponent,
    CreateNewListComponent,
    VoteListJoinComponent,
    VoteListInfoComponent,
    VoteListRankingComponent,
    VoteListControlComponent,
    ButtonRadio
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
