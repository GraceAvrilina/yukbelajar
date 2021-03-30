import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AbsensiSiswaComponent } from './absensi-siswa.component';

describe('AbsensiSiswaComponent', () => {
  let component: AbsensiSiswaComponent;
  let fixture: ComponentFixture<AbsensiSiswaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsensiSiswaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbsensiSiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
