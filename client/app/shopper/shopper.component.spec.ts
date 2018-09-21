import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ShopperComponent } from './shopper.component';

describe('Component: About', () => {
  let component: ShopperComponent;
  let fixture: ComponentFixture<ShopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "About" in h4', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('About');
  });

});
