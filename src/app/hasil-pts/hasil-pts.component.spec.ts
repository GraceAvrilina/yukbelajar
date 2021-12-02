import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HasilPtsComponent } from './hasil-pts.component';

describe('HasilPtsComponent', () => {
  let component: HasilPtsComponent;
  let fixture: ComponentFixture<HasilPtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasilPtsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HasilPtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
