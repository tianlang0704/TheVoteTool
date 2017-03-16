/**
 * Created by CMonk on 2/18/2017.
 */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {VoteListComponent} from "./components/vote-list/vote-list.component";
import {VoteDetailComponent} from "./components/vote-detail/vote-detail.component";
import {CreateNewListComponent} from "./components/create-new-list/create-new-list.component";

const routes: Routes = [
  // {path:"", redirectTo: "new", pathMatch: "full"},
  {path: CreateNewListComponent.routeString, component: CreateNewListComponent},
  {path: VoteListComponent.routeString, component: VoteListComponent},
  {path: VoteDetailComponent.routeString, component: VoteDetailComponent},
  {path:"**", redirectTo: CreateNewListComponent.routeString, pathMatch: "full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})

export class AppRoutingModule {}
