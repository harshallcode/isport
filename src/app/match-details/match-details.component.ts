import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  matchDetails: any = {};
  matchForm = new FormGroup({
    marketId: new FormControl(''),
    selectionId: new FormControl(''),
  });
  legsDetails: any[] = [];
  marketDetails: any[] = [];
  matchResult: any

  ngOnInit(): void {
    this.matchDetails = JSON.parse(sessionStorage.getItem('match') || '{}');
    this.apiService.makeGetRequest('GetSelections').subscribe((data: any) => {
      this.legsDetails = data;
    });
    this.apiService.makeGetRequest('GetMarkets').subscribe((data: any) => {
      this.marketDetails = data;
    });
  }

  getResult() {
    var market = this.matchForm.value.marketId;
    var selection = this.matchForm.value.selectionId;
    var matchId = this.matchDetails.MatchId;
    // https://cms.bettorlogic.com/api/BetBuilder/GetBetBuilderBets?sports=1&matchId=782332&marketId=1&legs=3&language=en
    var params = `&matchId=${matchId}&marketId=${market}&legs=${selection}&language=en`;
    // var params= `&matchId=${matchId}&marketId=${market}&legs=${selection}&language=en`;

    this.apiService
      .makeGetRequest(`GetBetBuilderBets`, params)
      .subscribe((data: any) => {
        this.matchResult = data;
        console.log(this.matchResult);
      });
  }
}
