import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UjianComponent } from './ujian.component';

describe('UjianComponent', () => {
  let component: UjianComponent;
  let fixture: ComponentFixture<UjianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UjianComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UjianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
