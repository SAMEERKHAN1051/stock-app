import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchList: any[] = [];
  searchText: string = '';
  constructor(
    private searchService: SearchService,
    private changeDetect: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getSearch();
  }

  getSearch(): any {
    return this.searchService.getSearch(this.searchText).subscribe((data: any) => {
      this.searchList = data;
      this.changeDetect.detectChanges();
    });
  }

  // selects() {
  //   localStorage.setItem('stock', this.searchText);
  //   console.log(this.searchText);
  // }

  onSelectStock(){

  }

  displayFn(subject: any){
    return subject ? subject : undefined
  }
}
