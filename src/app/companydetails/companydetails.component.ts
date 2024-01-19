import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AddPriceDialogComponent } from '../add-price-dialog/add-price-dialog.component';
import { UpdateCompanyDialogComponent } from '../update-company-dialog/update-company-dialog.component';
import { StatisticsComponent } from '../statistics/statistics.component';

export interface StockPrice {
  price: number;
  timeStamp: string;
  id: number;
}
export interface Company {
  stockExchange: string;
  latestStockPrice: StockPrice;
  previousStockPrices: StockPrice[];
  companyCode: number;
  companyName: string;
  companyTurnover: number;
  companyCEO: string;
  companyWebsite: string;
}





@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.css'],
 
})
export class CompanydetailsComponent implements OnInit {
  COMPANY_DATA: Company[] = [];

   COMPAN_DATA: Company[] = [
    {
      "stockExchange": "BSE",
      "latestStockPrice": {
        "price": 67636.55,
        "timeStamp": "2024-01-03T23:13:56.121871",
        "id": 1
      },
      "previousStockPrices": [
        {
        "price": 67636.55,
        "timeStamp": "2024-01-03T23:13:56.121871",
        "id": 1
        }
      ],
      "companyCode": 1,
      "companyName": "tata",
      "companyTurnover": 500000000,
      "companyCEO": "ratan",
      "companyWebsite": "www.jbjb.com"
    }
  ];
  length: number=0;

  constructor(private userService : UserService , private http:HttpClient , private userAuthService:UserAuthService, private dialog:MatDialog, private router:Router) { }

 
  apiurl="http://localhost:8081/v1.0/market/company/getAll"
  ngOnInit(): void {
   this.fetchCompanyData();
  }

  openAddPriceDialog(companyCode: number): void {
    const dialogRef = this.dialog.open(AddPriceDialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((latestPrice: number) => {
      if (latestPrice !== undefined) {
        // Send API request to add the latest price
        console.log("companycode",companyCode)
        console.log("price",latestPrice)
        // this.addLatestPrice(companyCode, latestPrice);
        this.userService.addCompanyPrice(companyCode,latestPrice).subscribe(
          (data)=>{
            this.fetchCompanyData();
          },
          (error)=>{
           
            this.fetchCompanyData();
            
          }
        )
        
      }
    });
  }
 
  openUpdateDialog(rowData: any): void {
    const dialogRef = this.dialog.open(UpdateCompanyDialogComponent, {
      width: '300px',
      data: rowData, // Pass the data of the entire row to the dialog
    });
    dialogRef.afterClosed().subscribe((updatedData: any) => {
      if (updatedData !== undefined) {
        // Send API request to update the company data
        this.updateCompanyData(updatedData);
      }
    });
  }
  updateCompanyData(updatedData: any): void {
    const apiUrl = `http://localhost:8081/v1.0/market/company/put/${updatedData.companyCode}`;
    this.http.put(apiUrl, updatedData).subscribe(
      (response) => {
        // Handle success response
        console.log('Company data updated successfully:', response);
        // You may want to refresh the data or update the UI accordingly
        // For example, fetch the updated data
        this.fetchCompanyData();
      },
      (error) => {
        // Handle error response
        this.fetchCompanyData();
        console.error('Error updating company data:', error);
      }
    );
  }

  // openStatisticsDialog(previousStockPrices: any[],latestStockPrice:any): void {
   
  //   console.log({...previousStockPrices,latestStockPrice})
  //   const dataTosend={previousStockPrices,latestStockPrice}
  //   console.log(dataTosend)
  //   this.dialog.open(StatisticsComponent, {
  //     width: '900px',
  //     data: { previousStockPrices , latestStockPrice},
  //   });
  // }

  openStatistics(companyCode: number): void {
    console.log(companyCode)
    this.router.navigate(['/statistics', companyCode]);
  }

  loadData():void{
    this.userService.getAllCompanyData().subscribe((data)=>{
      console.log(data)
      this.COMPANY_DATA = data;
      console.log(this.COMPANY_DATA);
      console.log("comapan",this.COMPAN_DATA )
    })
  }

  deleteCompany(companyCode: number):void{
    const token = localStorage.getItem("jwtToken");
    // Set up headers with Authorization Bearer token
   const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Include headers in the HTTP options
   const options = { headers: headers };
    const deleteUrl = `http://localhost:8081/v1.0/market/company/delete/${companyCode}`;

    this.http.delete(deleteUrl,options).subscribe((data)=>{
      console.log("deleted");
      this.fetchCompanyData();
    })
  }


  public getRole(){
   
    return this.userAuthService.getRole();
  }
  fetchCompanyData(): void {
    const token = localStorage.getItem("jwtToken");
  // Set up headers with Authorization Bearer token
 const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  // Include headers in the HTTP options
 const options = { headers: headers };
    // Make an HTTP GET request to the API
    this.http.get<Company[]>(this.apiurl,options).subscribe(
      (data) => {
        // Assign the fetched data to the dataSource
        this.dataSource = data.map((company) => ({
          companyCode: company.companyCode,
          companyName: company.companyName,
          companyTurnover: company.companyTurnover,
          companyCEO: company.companyCEO,
          companyWebsite:company.companyWebsite,
          stockExchange:company.stockExchange,
          previousStockPrices:company.previousStockPrices,
          latestStockPrice:company.latestStockPrice
        }));
        this.length = this.dataSource.length;
      },
      (error) => {
        console.error('Error fetching company data:', error);
      }
    );
  }

  displayedColumns: string[] = ['companyCode','stockExchange','companyName','companyTurnover','companyCEO','companyWebsite','latestStockPrice','previousStockPrices','actions']
  dataSource = this.COMPANY_DATA;

}
