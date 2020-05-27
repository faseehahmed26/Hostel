import { Component, OnInit,Input,ViewChild,Inject} from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hostel }  from '../shared/Hostel';
import { Comment }  from '../shared/comment';
import { HostelService } from '../services/hostel.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility,flyInOut, expand} from '../animations/app.animation';
@Component({
  selector: 'app-hosteldetail',
  templateUrl: './hosteldetail.component.html',
  styleUrls: ['./hosteldetail.component.scss'],
  host: { 
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]  
})
export class HosteldetailComponent implements OnInit {



  hostel: Hostel;
  hostelIds: number[];
  hostelcopy: Hostel;
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;
  visibility = 'shown';
  @ViewChild('cform') commentFormDirective;
  
  formErrors = {
    'author': '',
    'comment':''
    
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    
    'rating': {
      'required':      'rating is required.'
      
    },
    'comment': {
       'required':      'Comment is required.',
      
    },
  };
  constructor(private hostelservice: HostelService,
    private route: ActivatedRoute,
    private location: Location,
     private fb: FormBuilder,
      @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.createForm();
    this.hostelservice.getHostelIds().subscribe(hostelIds => this.hostelIds = hostelIds);
      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.hostelservice.getHostel(+params['id']); }))
    .subscribe(hostel => { this.hostel = hostel; this.hostelcopy = hostel; this.setPrevNext(hostel.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
  }
   setPrevNext(hostelId: number) {
    let index = this.hostelIds.indexOf(hostelId);
    this.prev = this.hostelIds[(this.hostelIds.length + index - 1) % this.hostelIds.length];
    this.next = this.hostelIds[(this.hostelIds.length + index + 1) % this.hostelIds.length];
  }

  goBack(): void {
    this.location.back();
  }
  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: ['5', [Validators.required, Validators.pattern] ],
      comment: ['',[Validators.required, Validators.minLength(2)] ],
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
     this.hostelcopy.comments.push(this.comment);
    this.hostelservice.putHostel(this.hostelcopy)
      .subscribe(hostel => {
        this.hostel = hostel; this.hostelcopy = hostel;
      },
      errmess => { this.hostel = null; this.hostelcopy = null; this.errMess = <any>errmess; });

    this.commentForm.reset({
      author: '',
      rating: '5',
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }

}