import { TeamAmount } from './shared/model/teamamount.model';
import { Team } from './shared/model/team.model';
import {Player} from './shared/model/player.model';
import { TeamRole } from './shared/model/teamrole.model';
import { MaxAmtPlayers } from './shared/model/maxamtplayers.model';
import { AmtbyRole } from '../ipl/shared/model/amtbyrole.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IplService {

    baseUrl = environment.baseUrl;
    constructor(private http:HttpClient) { }


    teamDetails():Observable<Team[]>{
        return this.http.get<Team[]>(`${this.baseUrl}/all`);
    }
    teamAmountDetails():Observable<TeamAmount[]>{
      return this.http.get<TeamAmount[]>(`${this.baseUrl}/totalamount`);
    }

    teamPlayerDetails(teamLabel):Observable<Player[]>{
      return this.http.get<Player[]>(`${this.baseUrl}/${teamLabel}`)
    }

    teamRoles(teamLabel):Observable<TeamRole[]>{
      return this.http.get<TeamRole[]>(`${this.baseUrl}/role/${teamLabel}`)
    }

    getMaxPlayers():Observable<MaxAmtPlayers[]>{
      return this.http.get<MaxAmtPlayers[]>(`${this.baseUrl}/maxamountbyrole`)
    }

    getAllPlayers():Observable<Player[]>{
      return this.http.get<Player[]>(`${this.baseUrl}/players/all`)
    }

    teamAmountbyRole(teamLabel):Observable<AmtbyRole[]>{
      return this.http.get<AmtbyRole[]>(`${this.baseUrl}/amountbyrole/${teamLabel}`)
    }

    getPlayersbyTeamandRole(teamLabel,roleName):Observable<Player[]>{
      return this.http.get<Player[]>(`${this.baseUrl}/${teamLabel}/${roleName}`)
    }
}
