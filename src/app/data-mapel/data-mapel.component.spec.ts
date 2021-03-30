import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataMapelComponent } from './data-mapel.component';

describe('DataMapelComponent', () => {
  let component: DataMapelComponent;
  let fixture: ComponentFixture<DataMapelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataMapelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataMapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
