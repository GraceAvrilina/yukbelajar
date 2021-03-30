import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataKelasComponent } from './data-kelas.component';

describe('DataKelasComponent', () => {
  let component: DataKelasComponent;
  let fixture: ComponentFixture<DataKelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataKelasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataKelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
