import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: ApiService,private router:Router) { }

  dates: any[] = [];
  headerList = [
    "Country",
    "LeagueId",
    "LeagueName",
    "MatchId",
    "MatchName",
    "KickOffUtc",
    "MatchTime",
    "MatchDate",
    "Team1Id",
    "Team1Name",
    "Team2Id",
    "Team2Name"
  ];
  matchList: any[] = [];
  filteredMatchList: any[] = [];

  ngOnInit(): void {
    this.apiService.makeGetRequest('GetFixtures').subscribe((data: any) => {
      this.matchList = data;
      // remove last 12 characters of this.matchList.MatchDate
      this.matchList.forEach(match => match.MatchDate = match.MatchDate.slice(0, -12));
      this.filterMatchesByDate(0);
    });
    this.dates = this.addNextSevenDatesToArray();
  }

  addNextSevenDatesToArray(): string[] {
    const dates = [];
    let currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      currentDate.setDate(currentDate.getDate() + 1);
      dates.push(formatDate(currentDate, 'M/dd/yyyy', 'en'));
    }
    return dates;
  }

  filterMatchesByDate(dateIndex: any): void {
    this.filteredMatchList = this.matchList.filter(match => match.MatchDate.includes(this.dates[dateIndex]));
  }

  viewDetails(match: any): void {
    console.log(match);
    
    sessionStorage.setItem('match', JSON.stringify(match));
    this.router.navigate(['/matchDetails'])
  }
}