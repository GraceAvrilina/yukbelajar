import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public username = null;
  public position = null;
  public open = false

  fileName= 'ExcelSheet.xlsx';  
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private menu: MenuController,) {
      if(!localStorage.getItem("name")){
        let navigationExtras: NavigationExtras = {
          state: {
            reload: true
          }
        }
        this.router.navigate(['/'], navigationExtras)

      }
    }

  ionViewWillEnter(){    
    this.menu.open('end');
  }

  ngOnInit() {
    this.username = localStorage.getItem("name")
    this.position = localStorage.getItem("position")
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  openFirst() {
    this.menu.enable(true, 'first')
    this.menu.open('first')
    this.open = true
  }

  closeFirst() {
    this.menu.enable(true, 'first')
    this.menu.close('first')
    this.open = false
  }

  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
}
