import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  wallet: any;
  portfolio: any[] = [];
  isToBuy: boolean = false;
  modalRef: any;
  stockQuantity = 1;
  quoteDetail: any;
  stockDetail: any;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getWallet();
    this.getPortfolio();
  }
  openModal(isToBuy: boolean, content: any, stockData: any) {
    this.isToBuy = isToBuy;
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
    this.stockDetail = stockData;
    console.log(this.stockDetail);
  }
  getWallet() {
    this.userService.getWallet().subscribe((resp) => {
      console.log(resp);
      this.wallet = resp[0];
    });
  }

  getPortfolio() {
    this.userService.getPortfolio().subscribe((resp) => {
      console.log(resp);
      this.portfolio = resp;
    });
  }

  buySellStock() {
    const body = {
      userId: '2222',
      type: this.isToBuy ? 'Buy' : 'Sell',
      quantity: this.stockQuantity,
      // cruentValue: this.quoteDetail.c,
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
}
