import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataGuruComponent } from './data-guru.component';

describe('DataGuruComponent', () => {
  let component: DataGuruComponent;
  let fixture: ComponentFixture<DataGuruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataGuruComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
