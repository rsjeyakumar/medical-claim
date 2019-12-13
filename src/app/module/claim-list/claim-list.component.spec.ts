import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { ClaimListComponent } from './claim-list.component';

describe('ClaimListComponent', () => {
  let component: ClaimListComponent;
  let fixture: ComponentFixture<ClaimListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimListComponent],
      imports: [SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimListComponent);
    component = fixture.componentInstance;
    component.userId = 2;
    fixture.detectChanges();
  });

  it('should create', () => {
    // component.userId = 2;
    expect(component.userId).toBe(2);
  });
});
