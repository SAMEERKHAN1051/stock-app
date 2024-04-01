import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuoteService } from 'src/app/service/quote.service';
import { SearchService } from 'src/app/service/search.service';
import { StockService } from 'src/app/service/stock.service';
import * as Highcharts from 'highcharts/highstock';
import { ChartService } from 'src/app/service/chart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BarChartData, chartApiModel } from 'src/app/models/barChart_model';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   title: ApexTitleSubtitle;
// }
@Component({
  selector: 'app-mainsection',
  templateUrl: './mainsection.component.html',
  styleUrls: ['./mainsection.component.scss'],
})
export class MainsectionComponent implements OnInit {
  chartOptions: any;
  areaOptions: any;
  barOptions: any;
  lineOptions: any;
  Highcharts: typeof Highcharts = Highcharts;
  searchText: string = '';
  stockDetail: any;
  quoteDetail: any;
  closeResult: string = '';
  newsDetail: any;
  newInfo: any;
  charDetail: any;
  stockSurpirseDetail: any;
  stockRecomandationDetail: any;
  quantitystockform!: FormGroup;
  wallet: any;
  isToBuy: boolean = false;
  modalRef: any;
  stockQuantity = 1;

  // Arrays to store data
  searchList: any[] = [];
  dates: Date[] = [];
  closingPrices: number[] = [];
  volumes: any[] = [];
  candleData: any[] = [];
  areaData: any[] = [];
  barData: any[] = [];
  lineData: any[] = [];
  barChartSeriesNames: any[] = [
    'buy',
    'hold',
    'sell',
    'strongBuy',
    'strongSell',
    'symbol',
  ];
  barChartData: BarChartData[] = [];

  apiData: chartApiModel[] = [];

  barChartItemList: any[] = [];

  constructor(
    private searchService: SearchService,
    private stockService: StockService,
    private quateService: QuoteService,
    private chartService: ChartService,
    private buyFormBuilder: FormBuilder,
    private elementRef: ElementRef,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getstockDetail();
    // this.renderChart();
  }

  getWallet() {
    this.userService.getWallet().subscribe((resp) => {
      console.log(resp);
      this.wallet = resp[0];
    });
  }

  openModal(isToBuy: boolean, content: any) {
    this.isToBuy = isToBuy;
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  buySellStock() {
    const body = {
      userId: '2222',
      type: this.isToBuy ? 'Buy' : 'Sell',
      quantity: this.stockQuantity,
      cruentValue: this.quoteDetail.c,
      name: this.stockDetail.name,
      ticker: this.stockDetail.ticker,
    };
    this.userService.buySellStock(body).subscribe((res: any) => {
      console.log(res);
      this.closeModal();
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
  generateSeries() {
    // Parse JSON data and populate arrays
    this.charDetail.results.forEach((result: any) => {
      // Convert timestamp to date object
      // const date = new Date(result.t);
      // Push date to dates array
      // this.dates.push(date);
      // Push closing price to closingPrices array
      // this.closingPrices.push(result.c);

      this.candleData.push([
        result.t, // the date
        result.o, // open
        result.h, // high
        result.l, // low
        result.c, // close
      ]);
      // Push volume to volumes array
      this.volumes.push([result.t, result.v]);
    });

    let groupingUnits = [
      [
        'week', // unit name
        [1], // allowed multiples
      ],
      ['month', [1, 2, 3, 4, 6]],
    ];

    this.chartOptions = {
      rangeSelector: {
        selected: 4,
      },

      title: {
        text: `${this.searchText} Historica`,
      },

      yAxis: [
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'OHLC',
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'Volume',
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2,
        },
      ],

      tooltip: {
        split: true,
      },

      series: [
        {
          type: 'candlestick',
          name: 'AAPL',
          data: this.candleData,
          dataGrouping: {
            units: groupingUnits,
          },
        },
        {
          type: 'column',
          name: 'Volume',
          data: this.volumes,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits,
          },
        },
      ],
    };
  }
  generateArea() {
    // Parse JSON data and populate arrays
    this.charDetail.results.forEach((result: any) => {
      // Convert timestamp to date object
      // const date = new Date(result.t);
      // Push date to dates array
      // this.dates.push(date);
      // Push closing price to closingPrices array
      // this.closingPrices.push(result.c);

      this.areaData.push([
        result.t, // the date
        result.o, // open
        result.h, // high
        result.l, // low
        result.c,
      ]);
      // Push volume to volumes array
      this.volumes.push([result.t, result.v]);
    });

    let groupingUnits = [
      [
        'week', // unit name
        [1], // allowed multiples
      ],
      ['month', [1, 2, 3, 4, 6]],
    ];

    this.areaOptions = {
      rangeSelector: {
        selected: 4,
      },

      title: {
        text: `${this.searchText} Historica`,
      },

      yAxis: [
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'OHLC',
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'Volume',
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2,
        },
      ],

      tooltip: {
        split: true,
      },

      series: [
        {
          name: 'AAPL Stock Price',
          data: this.areaData,
          type: 'area',
          threshold: null,
          tooltip: {
            valueDecimals: 2,
          },
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
          },
        },
      ],
    };
  }
  generateBar() {
    // Parse JSON data and populate arrays
    // this.stockRecomandationDetail.forEach((result: any) => {
    //   // Convert timestamp to date object
    //   // const date = new Date(result.t);
    //   // Push date to dates array
    //   // this.dates.push(date);
    //   // Push closing price to closingPrices array
    //   // this.closingPrices.push(result.c);

    //   this.barData.push([
    //     result.buy, // the buy
    //     result.hold, // hol
    //     result.sell, // sell
    //     result.strongBuy, // strongBuy
    //     result.strongSell, // strongSell
    //   ]);
    //   // Push volume to volumes array
    //   // this.volumes.push([result.t, result.v]);
    // });
    // console.log(this.stockRecomandationDetail);
    // this.stockRecomandationDetail.forEach((result: any) => {
    //   // Convert timestamp to date object
    //   // const date = new Date(result.t);
    //   // Push date to dates array
    //   // this.dates.push(date);
    //   // Push closing price to closingPrices array
    //   // this.closingPrices.push(result.c);

    //   this.barData.push([
    //     result.buy, // the date
    //     result.sell, // open
    //     result.period, // high
    //     result.hold, // low
    //     result.strongBuy, // close
    //     result.strongSell, // close
    //     result.symbol,
    //   ]);
    //   // Push volume to volumes array
    //   this.volumes.push([result.period, result.v]);
    // });

    // let groupingUnits = [
    //   [
    //     'week', // unit name
    //     [1], // allowed multiples
    //   ],
    //   ['month', [1, 2, 3, 4, 6]],
    // ];

    this.barOptions = {
      chart: {
        type: 'column',
      },

      title: {
        text: 'Olympic Games all-time medal table, grouped by continent',
        align: 'left',
      },

      xAxis: {
        categories: ['Sell', 'Buy', 'hold', 'strongSell', 'strongBuy'],
      },

      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Count medals',
        },
      },

      tooltip: {
        format:
          '<b>{key}</b><br/>{series.name}: {y}<br/>' +
          'Total: {point.stackTotal}',
      },

      plotOptions: {
        column: {
          stacking: 'normal',
        },
      },

      series: this.barChartData,

      // [{
      //     name: 'Norway',
      //     data: [148, 133, 124],
      //     stack: 'Europe'
      // }, {
      //     name: 'Germany',
      //     data: [102, 98, 65],
      //     stack: 'Europe'
      // }, {
      //     name: 'United States',
      //     data: [113, 122, 95],
      //     stack: 'North America'
      // }, {
      //     name: 'Canada',
      //     data: [77, 72, 80],
      //     stack: 'North America'
      // }]
    };
  }
  generateLine() {
    // Parse JSON data and populate arrays
    this.charDetail.results.forEach((result: any) => {
      // Convert timestamp to date object
      // const date = new Date(result.t);
      // Push date to dates array
      // this.dates.push(date);
      // Push closing price to closingPrices array
      // this.closingPrices.push(result.c);

      this.lineData.push([
        result.t, // the date
        result.o, // open
        result.h, // high
        result.l, // low
        result.c,
      ]);
      // Push volume to volumes array
      this.volumes.push([result.t, result.v]);
    });

    let groupingUnits = [
      [
        'week', // unit name
        [1], // allowed multiples
      ],
      ['month', [1, 2, 3, 4, 6]],
    ];

    this.lineOptions = {
      rangeSelector: {
        selected: 4,
      },

      title: {
        text: `${this.searchText} Historica`,
      },

      yAxis: [
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'OHLC',
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: 'right',
            x: -3,
          },
          title: {
            text: 'Volume',
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2,
        },
      ],

      tooltip: {
        split: true,
      },

      series: [
        {
          name: 'AAPL Stock Price',
          data: this.lineData,
          type: 'spline',
          threshold: null,
          tooltip: {
            valueDecimals: 2,
          },
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
          },
        },
      ],
    };
  }
  getStockSurprice() {
    return this.stockService
      .getStockSurprise(this.searchText)
      .subscribe((data: any) => {
        this.stockSurpirseDetail = data;
        console.log(this.stockSurpirseDetail);
      });
  }
  getStockRecomandation() {
    let buy: number[] = [];
    let hold: number[] = [];
    let sell: number[] = [];
    let strongBuy: number[] = [];
    let strongSell: number[] = [];
    return this.stockService
      .getStockRecomondation(this.searchText)
      .subscribe((data: any) => {
        this.apiData = data;
        console.log('barchart data' + data);

        for (let item of this.apiData) {
          buy.push(item.buy);
          hold.push(item.hold);
          sell.push(item.sell);
          strongBuy.push(item.strongBuy);
          strongSell.push(item.strongSell);
        }

        this.barChartItemList = [buy, hold, sell, strongBuy, strongSell];

        for (let i = 0; i < this.barChartItemList.length; i++) {
          var barChartObj = new BarChartData(
            this.barChartSeriesNames[i],
            this.barChartItemList[i],
            'xyz'
          );
          this.barChartData.push(barChartObj);
        }

        // this.barChartData = data;

        // console.log("barchart data"+ this.barChartData![0].buy)

        // var dat = new BarChartData('dsd', [2, 23], 'sdasd');
        // this.barChartData!.push(dat);
        // console.log(this.stockRecomandationDetail);
      });
  }
  getstockDetail(): any {
    return this.searchService
      .getSearch(this.searchText)
      .subscribe((data: any) => {
        this.searchList = data;
        console.log(this.searchList);
      });
  }
  onSelectStock() {
    this.stockDetail = [];
    this.getStockDetail();
    this.getQuote();
    this.getNewsDetail();
    this.getStockRecomandation();
    this.getChartDetail();
  }
  getChartDetail(): any {
    return this.chartService
      .getChart(this.searchText)
      .subscribe((data: any) => {
        this.charDetail = data;
        this.generateSeries();
        this.generateArea();
        this.generateBar();
        // this.generateLine();
        this.getStockSurprice();
      });
  }
  getNewsDetail(): any {
    return this.quateService.getNews(this.searchText).subscribe((data: any) => {
      this.newsDetail = data;
      console.log(this.newsDetail);
    });
  }
  getStockDetail(): any {
    return this.stockService
      .getStock(this.searchText)
      .subscribe((data: any) => {
        this.stockDetail = data;
        console.log(this.stockDetail);
      });
  }
  getQuote(): any {
    return this.quateService
      .getQuote(this.searchText)
      .subscribe((data: any) => {
        this.quoteDetail = data;
        // console.log(this.quoteDetail);
      });
  }
  buyButtons() {
    this.wallet -= 10;
    console.log(this.wallet);
    console.log('buy');
  }
  selButtons() {
    this.wallet += 10;
    console.log(this.wallet);
    console.log('sel');
  }
  model(action: boolean) {
    action ? this.buyButtons() : this.selButtons();
  }
  newsmodel(news: any) {
    this.newInfo = news;
    console.log(this.newInfo);
  }

  //   Highcharts: typeof Highcharts = Highcharts; // required
  //   chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  //   chartOptions: Highcharts.Options = {
  //     series: [
  //       {
  //         data: [1, 2, 3],
  //         type: 'line',
  //       },
  //     ],
  //   }; // required
  //   chartCallback: Highcharts.ChartCallbackFunction = function (chart) {}; // optional function, defaults to null
  //   updateFlag: boolean = false; // optional boolean
  //   oneToOneFlag: boolean = true; // optional boolean, defaults to false
  //   runOutsideAngular: boolean = false;

  //   // @ViewChild('modal') mychart: any;
  // }

  // getPostUsage() {
  //   this.dashboardService.getDashboardModels().subscribe((resp: any) => {
  //     this.isLoadingModels = false;
  //     this.postUsageOptions = {
  //       animationEnabled: true,
  //       title: {
  //         text: "Posts"
  //       },
  //       data: [{
  //         type: "pie",
  //         startAngle: -90,
  //         indexLabel: "{name}: {y}",
  //         yValueFormatString: "#,###.##'%'",
  //         dataPoints: [
  //           { y: resp.data.postPercentage == 0 ? 20 : resp.data.postPercentage, name: "Post" },
  //           { y: resp.data.wishListPercentage == 0 ? 20 : resp.data.wishListPercentage, name: "Wish List" },
  //           { y: resp.data.favouritePercentage == 0 ? 20 : resp.data.favouritePercentage, name: "Favorite" }
  //         ],
  //       }]
  //     };
  //     this.cdr.detectChanges();
  //   });
  // }

  // getServiceUsageList() {
  //   this.dashboardService.getDashboardServiceUsageList().subscribe((result: any) => {
  //     console.log(result);
  //     this.serviceUsageList = result.data;
  //     console.log(this.serviceUsageList);
  //     this.isLoadingService = false;
  //     const dataPoints: any[] = this.serviceUsageList.map((service: { percentage: any; service: any; }) => ({
  //       y: service.percentage == 0 ? 20 : service.percentage,
  //       name: service.service
  //     }));

  //     this.serviceUsageOptions = {
  //       animationEnabled: true,
  //       title: {
  //         text: "Services"
  //       },
  //       data: [{
  //         type: "doughnut",
  //         yValueFormatString: "#,###.##'%'",
  //         indexLabel: "{name}",
  //         dataPoints: dataPoints,
  //       }]
  //     }
  //     this.cdr.detectChanges();
  //   });
  // }
}
