import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListUjianComponent } from './list-ujian.component';

describe('ListUjianComponent', () => {
  let component: ListUjianComponent;
  let fixture: ComponentFixture<ListUjianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUjianComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListUjianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
