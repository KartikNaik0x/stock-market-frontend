import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  filteredPrices: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  data:any;
 
 

  constructor(
    private route:ActivatedRoute,
    private http:HttpClient,
    private router:Router
  ) {
    // this.calculateStatistics();
  }

  
    public lineChartOptions: ChartOptions = {
      responsive: true,
    };
    public lineChartLabels: any[] = [];
    public lineChartType: ChartType = 'line';
    public lineChartLegend = true;
    public lineChartData: ChartDataset[] = [];
    

  avgPrice: number|undefined;
  maxPrice :number|undefined;
  minPrice : number|undefined;
  startTime: string = ''; 
  endTime: string = '';  

  
  ngOnInit(): void {
    // Initialize line chart data

    this.route.params.subscribe(params => {
      const companyCode = params['companyCode'];

      this.fetchCompanyData(companyCode);
     
    });
   
  }

  fetchCompanyData(companyCode:number): void {
    const token = localStorage.getItem("jwtToken");
    // Set up headers with Authorization Bearer token
   const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Include headers in the HTTP options
   const options = { headers: headers };
    
    const apiurl=`http://localhost:8081/v1.0/market/company/info/${companyCode}`
   
    this.http.get<any[]>(apiurl,options).subscribe(
      (data) => {
        
       this.data=data;
       this.calculateStatistics(this.data);
       this.initializeLineChartData(this.data)
        console.log(data);
        
      },
      (error) => {
        console.error('Error fetching company data:', error);
      }
    );
  }


  initializeLineChartData(modifiedData:any): void {
    
  

      // Initialize line chart labels and data
      const timestamps: string[] = [];
      // Use the latestStockPrice timestamp
      if (modifiedData.latestStockPrice) {
        timestamps.push(modifiedData.latestStockPrice.timeStamp);
      }
     
      if (modifiedData.previousStockPrices) {
        timestamps.push(...modifiedData.previousStockPrices.map((price: any) => price.timeStamp));
      }
      // Sort timestamps chronologically
      this.lineChartLabels = timestamps.sort();
   
      this.lineChartData = [
        {
          data: this.lineChartLabels.map((timestamp) => this.getStockPriceByTimestamp(timestamp,modifiedData)),
          label: 'Stock Price',
          backgroundColor: 'rgba(1, 1, 1,0.1)', 
         borderColor: 'rgba(0, 0, 0 ,1)', 
         pointBackgroundColor:'rgb(75, 192, 192)',
         borderWidth: 2, 
         pointRadius: 3,
        },
      ];


  }

  getStockPriceByTimestamp(timestamp: string,newData:any): number {
    
    const stockPrice = newData.previousStockPrices.find((price: any) => price.timeStamp === timestamp);
  
    if (!stockPrice && newData.latestStockPrice?.timeStamp === timestamp) {
      return newData.latestStockPrice.price;
    }
    return stockPrice ? stockPrice.price : 0;
  }
  
  calculateStatistics(newData:any):void{
   
    const previousStockPrices = newData.previousStockPrices || [];
    const latestStockPrice = newData.latestStockPrice ||{};
    console.log(previousStockPrices)
    console.log(latestStockPrice)
    if(previousStockPrices.length > 0){
      const prices = previousStockPrices.map((price:any)=>price.price);
        if(Object.keys(latestStockPrice).length !== 0){
        prices.push(latestStockPrice?.price)
        }
        console.log(prices,"prices")
      
     
      this.maxPrice=Math.max(...prices)
      this.minPrice=Math.min(...prices)
      const total = prices.reduce((acc: number, price: number) => acc + price, 0);
      this.avgPrice = total / prices.length;
    }
  }

  onSearchClick(): void {
    
    const startTime = new Date(this.startTime);
    const endTime = new Date(this.endTime);

    startTime.setHours(0,0,0,0)
    endTime.setHours(0,0,0,0)
    
    this.filteredPrices = new MatTableDataSource(this.data?.previousStockPrices.filter((price: any) => {
      const priceTime = new Date(price.timeStamp);
      priceTime.setHours(0,0,0,0)
      console.log(priceTime)
      return priceTime >= startTime && priceTime <= endTime;
    })) || [];
    
    const modifiedData={
        previousStockPrices:this.filteredPrices,
        latestStockPrice:{}
    }
    this.initializeLineChartData(modifiedData)
    this.calculateStatistics(modifiedData)
    console.log('Filtered Prices:', this.filteredPrices);
  }


  

  onCloseClick(): void {
    this.router.navigate(['/companydetails']);
  }

 

}
