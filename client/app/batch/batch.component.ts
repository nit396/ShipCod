import { Component, OnInit } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastComponent } from '../shared/toast/toast.component';
import { BatchService } from '../services/batch.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  file: any;
  batchs: any[] = [];
  batchInfo: any[] = [];
  isLoading = true;
  verifyMessage: String;

  batchForm: FormGroup;
  batch = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);
  stage = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);
  xmlFile = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private ngxXml2jsonService: NgxXml2jsonService,
    private batchService: BatchService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
    private modalService: NgbModal
  ) { }

  setClassBatch() {
    return { 'has-danger': !this.batch.pristine && !this.batch.valid };
  }

  setClassStage() {
    return { 'has-danger': !this.stage.pristine && !this.stage.valid };
  }

  setClassXML() {
    return { 'has-danger': !this.xmlFile.pristine && !this.xmlFile.valid };
  }

  ngOnInit() {
    this.getBatchs();
    this.batchForm = this.formBuilder.group({
      batch: this.batch,
      stage: this.stage,
      xmlFile: this.xmlFile
    });
  }

  uploadDocument(e) {
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = () => {
      this.convertXML2JSON(fileReader.result);
    };
  }

  convertXML2JSON(file: any) {
    const parser = new DOMParser();
    const xmlData = parser.parseFromString(file, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xmlData);
    this.batchForm.value.xmlFile = obj;
  }

  getdata(content, batch) {
    this.batchService.getData(batch).subscribe(
      res => {
        this.batchInfo.length = 0;
        this.batchInfo.push(res);
        this.modalService.open(content, { centered: true });
      },
      error => console.log(error)
    );
  }

  verifydata(verifyContent, batch) {
    this.isLoading = true;
    this.batchService.verifyData(batch).subscribe(
      res => {
        if (res === true) {
          this.verifyMessage = 'This data is valid';
        } else {
          this.verifyMessage = 'This data is invalid';
        }
        this.isLoading = false;
        this.modalService.open(verifyContent, { centered: true });
      },
      error => console.log(error)
    );
  }

  addBatch() {
    this.isLoading = true;
    this.batchService.addBatch(this.batchForm.value).subscribe(
      res => {
        this.batchs.push(res);
        this.batchForm.reset();
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getBatchs() {
    this.batchService.getBatchs().subscribe(
      data => {
        this.batchs = data;
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteBatch(stage: any) {
    if (window.confirm('Are you sure you want to permanently delete this batch?')) {
      this.batchService.deleteBatch(stage).subscribe(
        () => {
          const pos = this.batchs.map(elem => elem._id).indexOf(stage._id);
          this.batchs.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
