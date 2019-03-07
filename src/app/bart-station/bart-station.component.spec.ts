import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BartStationComponent } from './bart-station.component';

describe('BartStationComponent', () => {
  let component: BartStationComponent;
  let fixture: ComponentFixture<BartStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BartStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BartStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
