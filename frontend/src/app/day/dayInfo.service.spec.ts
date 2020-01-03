/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DayInfoService } from './dayInfo.service';

describe('Service: DayInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayInfoService]
    });
  });

  it('should ...', inject([DayInfoService], (service: DayInfoService) => {
    expect(service).toBeTruthy();
  }));
});
