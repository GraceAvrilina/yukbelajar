import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NilaiSikapComponent } from './nilai-sikap.component';

describe('NilaiSikapComponent', () => {
  let component: NilaiSikapComponent;
  let fixture: ComponentFixture<NilaiSikapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NilaiSikapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NilaiSikapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
