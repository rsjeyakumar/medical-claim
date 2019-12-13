import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { ENDPOINTS } from '../../shared/services/end-points.enum';
import { HttpService } from '../../shared/services/http.service';
import { CLAIMLIST, APPROVALREQUEST } from '../../models/app.models';
import { Session } from 'protractor';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
  display = false;
  approverCommentsForm: FormGroup;
  userId: number;
  claimList: CLAIMLIST[];
  claimid: number;
  constructor(private http: HttpService) { }

  ngOnInit() {

    this.userId = Number('2');
    this.approverCommentsForm = new FormGroup({
      comment: new FormControl(null, [Validators.required])
    });
    this.getClaimlist();

  }
  climeApproval(id) {
    this.display = true;
    this.claimid = id;
  }
  approve_reject(status: string) {
    this.display = false;
    const req: APPROVALREQUEST = {
      approval: status,
      approvalId: this.userId,
      comments: this.approverCommentsForm.value.comment
    };
    const endpoint = `${ENDPOINTS.APPROVAL}/${this.claimid}/approval`;
    this.http.createData(endpoint, req).subscribe(
      (res: CLAIMLIST[]) => {
        this.claimList = res;
        this.getClaimlist();
      }
    );

  }

  getClaimlist() {
    const endpoint = `${ENDPOINTS.APPROVAL}/${this.userId}`;
    this.http.readData(endpoint).subscribe(
      (res: CLAIMLIST[]) => {
        this.claimList = res;
      }
    );

  }

  referBack() {

  }
}
