/**
 * Created by CMonk on 2/18/2017.
 */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {VoteListComponent} from "./components/vote-list/vote-list.component";
import {VoteDetailComponent} from "./components/vote-detail/vote-detail.component";
import {CreateNewListComponent} from "./components/create-new-list/create-new-list.component";
import {MenuComponent} from "./components/menu/menu.component";

const routes: Routes = [
  {path: MenuComponent.routeString, component: MenuComponent},
  {path: CreateNewListComponent.routeString, component: CreateNewListComponent},
  {path: VoteListComponent.routeIdNav, component: VoteListComponent},
  {path: VoteListComponent.routeId, component: VoteListComponent},
  {path: VoteDetailComponent.routeString, component: VoteDetailComponent},
  {path:"**", redirectTo: MenuComponent.routeString, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: []
})

export class AppRoutingModule {}
