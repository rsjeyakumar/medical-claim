import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { ENDPOINTS } from '../../shared/services/end-points.enum';
import { HttpService } from '../../shared/services/http.service';
import { POLICY, POLICYSTATUS } from '../../models/app.models';

@Component({
  selector: 'app-status-check',
  templateUrl: './status-check.component.html',
  styleUrls: ['./status-check.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class StatusCheckComponent implements OnInit {
  statuscheck: FormGroup;
  items: MenuItem[];
  policydetails: POLICY;
  activeIndex = 0;
  getPolicyspin = false;
  constructor(private messageService: MessageService, private http: HttpService) { }

  ngOnInit() {
    this.items = [{
      label: 'Claim Generated'
    }
    ];
    /* Cliam Form createion */
    this.statuscheck = new FormGroup({
      policynumber: new FormControl(null, [Validators.required])
    });
  }


  /* Get hospitals */
  getPolicy() {
    this.getPolicyspin = true;
    const endpoint = `${ENDPOINTS.POLICIES}/${this.statuscheck.value.policynumber}`;
    this.http.readData(endpoint).subscribe(
      (res: POLICY) => {
        this.getPolicyspin = false;
        this.policydetails = res;
        this.activeIndex = this.policydetails.policyStatus.length;
      }
    );
  }


}
