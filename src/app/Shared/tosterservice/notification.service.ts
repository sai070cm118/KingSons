import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: any, title: any) {
      this.toastr.success(message, title, {closeButton: true});
  }

  showError(message: any, title: any) {
      this.toastr.error(message, title, {closeButton: true});
  }

  showInfo(message: any, title: any) {
      this.toastr.info(message, title, {closeButton: true});
  }

  showWarning(message: any, title: any) {
      this.toastr.warning(message, title, {closeButton: true});
  }

  show500Error(title: any) {
    this.toastr.warning('500! Internal server Error. Please try later.', title, {closeButton: true});
  }

  showUnableToProcess() {
    this.toastr.error('Unable to process current request.');
  }

  showMessage(data: any, title: any) {

    if (data.IsError) {
      this.toastr.error(data.Message, title, {closeButton: true});
    } else {
      this.toastr.success(data.Message, title, {closeButton: true});
    }

  }

}
