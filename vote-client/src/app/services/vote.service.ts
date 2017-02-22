import {Injectable, Inject} from '@angular/core';
import { Candidate } from "../models/candidate";
import {Headers, Http, Response} from "@angular/http";
import {List} from "../models/list";
import "rxjs";

@Injectable()
export class VoteService {
  //base url settings for client server on different hosts/ports
  // private apiBase:String = "http://" + window.location.hostname + ":3000";
  private apiBase:String = "";

  constructor(private http: Http) { }

  private extractJSON(res: Response) {
    let resJSON;
    try{
      resJSON = res.json();
    }catch(error){
      resJSON = {};
    }
    return resJSON;
  }

  public promiseToGetList(listId:string): Promise<List> {
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBase + "/serve/vote/" + listId)
        .map(this.extractJSON)
        .subscribe((resJSON)=>{
          console.log(resJSON);
          const newList = new List();
          newList.listId = resJSON.listId;
          newList.listDescription = resJSON.listDescription;
          newList.listTitle = resJSON.listTitle;
          newList.listCandidates = resJSON.listCandidates;
          resolve(newList);
        }, (errorRes)=>{
          const error = this.extractJSON(errorRes);
          reject(error);
        });
    });
  }

  public promiseToGetCandidate(listId: string, number: number): Promise<Candidate> {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBase + "/serve/vote/detail/" + listId + "/" + number)
        .map(this.extractJSON)
        .subscribe((resJSON) => {
          console.log(resJSON);
          resolve(resJSON);
        }, (errorRes) => {
          const error = this.extractJSON(errorRes);
          reject(error);
        });
    });
  }

  public promiseToCreateVote(
    listTitle,
    listDescription,
    listCandidates: Candidate[]
  ): Promise<{success: boolean; msg: string; listId: string;}> {
    return new Promise((resolve, reject) => {
      const newList = {
        listTitle: listTitle,
        listDescription: listDescription,
        listCandidates: listCandidates
      };

      let headers = new Headers();
      headers.append("Content-Type","application/json");
      this.http.post(this.apiBase + "/serve/vote/create", newList, {headers: headers})
        .map(this.extractJSON)
        .subscribe((resJSON)=>{
          resolve({success: true, msg: "", listId: resJSON.listId});
        }, (errorRes)=>{
        const error = this.extractJSON(errorRes);
          reject(error);
      });
    });
  }

  public promiseToUpVote(listId: string, num: number): Promise<{success: boolean; error:string;}> {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type","application/json");
      this.http.get(this.apiBase + "/serve/vote/upVote/"+listId+"/"+num, {headers: headers})
        .map(this.extractJSON)
        .subscribe((resJSON) => {
          resolve(resJSON);
        }, (errorRes) => {
          console.log("error: " + errorRes);
          reject(errorRes);
        });
    });
  }
}
