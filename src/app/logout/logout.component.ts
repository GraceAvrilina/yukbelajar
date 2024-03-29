import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
// import { StorageService } from '../api/storage.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {    
    localStorage.clear()
    // this.storageService.clearStorage(() => {
      this.router.navigate(['/'])
    // })
   }

  ngOnInit() {}

}
