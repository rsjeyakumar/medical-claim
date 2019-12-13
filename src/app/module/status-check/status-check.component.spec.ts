import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { StatusCheckComponent } from './status-check.component';

describe('StatusCheckComponent', () => {
  let component: StatusCheckComponent;
  let fixture: ComponentFixture<StatusCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCheckComponent],
      imports: [SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
