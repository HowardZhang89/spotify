/*
 * Angular
 */

import {Component, OnInit} from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';

/*
 * Services
 */
import {SpotifyService} from '../spotify.service';
;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  results: Object;

  constructor(private spotify: SpotifyService,
              private router: Router,
              private route: ActivatedRoute) {
    // subscribe to the queryParams property 
    this.route
      .queryParams
      .subscribe(params => { this.query = params['query'] || ''; });
  }

  // hook Angular router that runs whenever the component is initialized
  // we do this in ngOnInit() to minimize side effects in constructor
  ngOnInit(): void {
    this.search();
  }

  submit(query: string): void {
    this.router.navigate(['search'], { queryParams: { query: query } })
      .then(_ => this.search() );
  }

  // use the current value of this.query to know what to search for
  search(): void {
    console.log('this.query', this.query);
    if (!this.query) {
      return;
    }
  // subscribe to the searchTrack Observable. 
  // When new results are emitted we call renderResults
    this.spotify
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }
}
