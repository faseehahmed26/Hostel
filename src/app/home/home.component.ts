import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Hostel } from '../shared/hostel';
import { HostelService } from '../services/hostel.service';
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  details = {destination: '', checkInDate: '',checkOutDate: '',guest : ['2', '3', '4','5', '6'],tor : ['all', 'private rooms', 'dorms']};
  checkInDate = new FormControl(new Date());
  checkOutDate = new FormControl(new Date());
  hostels: Hostel[];
  errMess: string;
  constructor(private hostelService: HostelService,
     @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
     this.hostelService.getHostels()
    .subscribe(hostels => this.hostels = hostels,
      errmess => this.errMess = <any>errmess);
  }
  onSubmit(){
  	console.log('Details: ', this.details);
  }

}


