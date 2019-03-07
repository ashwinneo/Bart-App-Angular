import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BartStationsComponent } from './bart-stations.component';

describe('BartStationsComponent', () => {
  let component: BartStationsComponent;
  let fixture: ComponentFixture<BartStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BartStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BartStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
