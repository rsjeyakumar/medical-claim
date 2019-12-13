import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ENDPOINTS } from '../../../shared/services/end-points.enum';
import { HttpService } from '../../../shared/services/http.service';
import { HOSPITALS, HOSPITALLIST, RAISECLAIM, RESPONSE } from '../../../models/app.models';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [DatePipe]
})
export class LandingComponent implements OnInit {
  cliamForm: FormGroup;
  hospitals: HOSPITALLIST[];
  date: Date;
  policySubmission: RESPONSE;
  constructor(private http: HttpService, private datePipe: DatePipe) { }

  ngOnInit() {
    /* Cliam Form createion */
    this.cliamForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      policynumber: new FormControl(null, [Validators.required]),
      diagnosis: new FormControl(null, [Validators.required]),
      admissiondate: new FormControl(null, [Validators.required]),
      dischargedate: new FormControl(null, [Validators.required]),
      totalclaimamount: new FormControl(null, [Validators.required]),
      hospitalname: new FormControl(null, [Validators.required]),
      dischargedetails: new FormControl(null, [Validators.required]),
      ailment: new FormControl(null, [Validators.required])

    });
    this.date = new Date();

    this.getHospitals();

  }
  /* Get hospitals */
  getHospitals() {
    this.http.readData(ENDPOINTS.HOSPITALS).subscribe(
      (res: HOSPITALS) => {
        this.hospitals = res.hospitals;
      }
    );
  }

  /* Claim Submission method */
  submitClaim() {
    const raiseclaim: RAISECLAIM = {
      admissionDate: this.datePipe.transform(this.cliamForm.value.admissiondate, 'yyyy-MM-dd'),
      ailmentDetail: this.cliamForm.value.ailment,
      claimAmount: Number(this.cliamForm.value.totalclaimamount),
      diagosis: this.cliamForm.value.diagnosis,
      dischargeDate: this.datePipe.transform(this.cliamForm.value.dischargedate, 'yyyy-MM-dd'),
      dischargeDetail: this.cliamForm.value.dischargedetails,
      hospitalId: Number(this.cliamForm.value.hospitalname),
      name: this.cliamForm.value.name,
      policyNo: this.cliamForm.value.policynumber

    };
    const endpoint = ENDPOINTS.APPROVAL;
    this.http.createData(endpoint, raiseclaim).subscribe(
      (res: RESPONSE) => {
        this.policySubmission = res;
      }
    );
  }


}
