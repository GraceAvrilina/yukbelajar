import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HasilPasComponent } from './hasil-pas.component';

describe('HasilPasComponent', () => {
  let component: HasilPasComponent;
  let fixture: ComponentFixture<HasilPasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasilPasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HasilPasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
