import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TambahKelasComponent } from './tambah-kelas.component';

describe('TambahKelasComponent', () => {
  let component: TambahKelasComponent;
  let fixture: ComponentFixture<TambahKelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahKelasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TambahKelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
