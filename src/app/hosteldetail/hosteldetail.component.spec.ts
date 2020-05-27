import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HosteldetailComponent } from './hosteldetail.component';

describe('HosteldetailComponent', () => {
  let component: HosteldetailComponent;
  let fixture: ComponentFixture<HosteldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HosteldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HosteldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
