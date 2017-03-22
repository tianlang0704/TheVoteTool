import {Injectable} from '@angular/core';
import {Candidate} from "../models/candidate";
import {Headers, Http, Response} from "@angular/http";
import {List} from "../models/list";
import "rxjs";
import {environment} from "../../environments/environment";
import {EM} from "../components/common/error-matcher";

enum VoteHttpMethods { GET, POST }

@Injectable()
export class VoteService {
  //base url settings for client server on different hosts/ports
  private apiBase:String;

  constructor(private http: Http) {
    if(environment.production) {
      this.apiBase = "";
    }else{
      this.apiBase = "http://" + window.location.hostname + ":3000"
    }
  }

// Mark: functions to get information
  public promiseToGetList(
    listId:string
  ): Promise<{ list: List, error: string }> {
    return this.buildJSONHttpRequestPromise(
      VoteHttpMethods.GET,
      this.apiBase + "/serve/vote/view/" + listId
    ).then((resJSON) => {
      // console.log(resJSON);
      const resultList = new List();
      resultList.listId = resJSON.listId;
      resultList.listDescription = resJSON.listDescription;
      resultList.listTitle = resJSON.listTitle;
      resultList.listCandidates = resJSON.listCandidates;
      return Promise.resolve({list: resultList});
    }, (resError) => {
      return Promise.reject({error: resError.error});
    });
  }

  public promiseToGetCandidate(
    listId: string,
    number: number
  ): Promise<{ candidate: Candidate, error: string }> {
    return this.buildJSONHttpRequestPromise(
      VoteHttpMethods.GET,
      this.apiBase + "/serve/vote/detail/" + listId + "/" + number
    ).then((resJSON) => {
      const resultCandidate = new Candidate();
      resultCandidate.name = resJSON.name;
      resultCandidate.listId = resJSON.listId;
      resultCandidate.number = resJSON.number;
      resultCandidate.thoughts = resJSON.thoughts;
      resultCandidate.imageFileString = resJSON.imageFileString;
      resultCandidate.upCount = resJSON.upCount;
      return Promise.resolve({candidate: resultCandidate})
    }, (resError) => {
      return Promise.reject({error: resError.error});
    });
  }

  public promiseToCheckListExist(listId: string): Promise<{exist: boolean, error: string}> {
    return this.buildJSONHttpRequestPromise(
      VoteHttpMethods.GET,
      this.apiBase + "/serve/vote/check/" + listId
    ).then((resJSON) => {
      return Promise.resolve({exist: resJSON.exist});
    }, (resError) => {
      return Promise.reject({error: EM.match(resError.error, EM.CNSim)});
    });
  }
// End: functions to get information

// Mark: functions to create or insert
  public promiseToCreateVote(
    listTitle,
    listDescription
  ): Promise<{ listId: string, error: string }> {
    const createVoteJSON = {
      listTitle: listTitle,
      listDescription: listDescription
    };
    return this.buildJSONHttpRequestPromise(
      VoteHttpMethods.POST,
      this.apiBase + "/serve/vote/create",
      createVoteJSON
    ).then((resJSON) => {
      return Promise.resolve({listId: resJSON.listId});
    }, (resError) => {
      return Promise.reject({error: resError.error});
    });
  }
// End: functions to create or insert

// Mark: functions to modify information
  public promiseToJoinVote(
    listId: string,
    name: string,
    thoughts: string,
    imageFileString: string
  ): Promise<{ listId: string, candidateNumber:number, error: string }> {
    const joinVoteJSON = {
      listId: listId,
      newCandidate: {
        name: name,
        thoughts: thoughts,
        imageFileString: imageFileString
      }
    };

    return this.buildJSONHttpRequestPromise(
      VoteHttpMethods.POST,
      this.apiBase + "/serve/vote/join",
      joinVoteJSON
    ).then((resJSON) => {
      return Promise.resolve({listId: resJSON.listId, candidateNumber: resJSON.candidateNumber});
    }, (resError) => {
      return Promise.reject({error: resError.error});
    });
  }

  public promiseToUpVote(
    listId: string,
    num: number
  ): Promise<{ success: boolean, error:string }> {
    return this.buildJSONHttpRequestPromise(
      VoteHttpMethods.GET,
      this.apiBase + "/serve/vote/upvote/" + listId + "/" + num
    ).then((resJSON) => {
      return Promise.resolve({success: resJSON.success});
    }, (resError) => {
      return Promise.reject({error: resError.error});
    });
  }

  private extractJSON(res: Response) {
    let resJSON;
    try{
      resJSON = res.json();
    }catch(error){
      resJSON = {};
    }
    return resJSON;
  }

  //Promise resolves with whatever server returns when server returns successfully (status == 200)
  //Promise rejects with whatever server returns when server returns error
  private buildJSONHttpRequestPromise(method: VoteHttpMethods, urlString: string, body: any = null): Promise<any> {
    const headers = new Headers();
    headers.append("Content-Type","application/json");
    let requestObs;
    if(method == VoteHttpMethods.GET) {
      requestObs = this.http.get(urlString, {headers: headers});
    }else if(method == VoteHttpMethods.POST) {
      requestObs = this.http.post(urlString, body ? body : {}, {headers: headers});
    }else {
      return Promise.reject("Invalid vote http method");
    }

    return new Promise((resolve, reject) => {
      requestObs
      .map(this.extractJSON)
      .subscribe((resJSON)=>{
        resolve(resJSON);
      }, (errorRes)=>{
        const errorJSON = this.extractJSON(errorRes);
        reject(errorJSON);
      });
    });
  }
// End: functions to modify information
}
