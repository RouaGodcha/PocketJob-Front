import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from '../_services/configurations.service';
import { UsersService } from '../_services/users.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-configurations',
  standalone: false,
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.scss'
})
export class ConfigurationsComponent implements OnInit {

  loading: boolean = false;
  loadingCB: boolean = false;
  submitted: boolean = false;
  time_for_acceptation: any = '';
  sms: boolean = false;
  chatbot: boolean = false;
  androidRequired: boolean = false;
  iosRequired: boolean = false;
  required: boolean = false;
  iosVersion: string = '';
  androidVersion: string = '';
  constructor(
    private configurationsService: ConfigurationsService,
    private UserServices : UsersService
  ) {
    this.getAllConfig();
  }

  ngOnInit() :void {}
  
  getAllConfig() {
    this.configurationsService.getAllConfig().subscribe((data: any) => {
      if (data.body.result === 'success') {
        const result = data.body.data;
        this.androidVersion = result.android;
        this.iosVersion = result.ios;
        this.sms = result.sms === 1 ? true : false;
        this.chatbot = result.ia === 1 ? true : false;
        this.androidRequired = result.android_required === 1 ? true : false;
        this.iosRequired = result.ios_required === 1 ? true : false;
      }
    });
  }


  onSmsStatusChange() {
    this.sms = this.sms ? true : false;
  }

  onChatBotStatusChange() {
    this.chatbot = this.chatbot ? true : false;
  }

  configSms() {
    this.loading = true;
    this.submitted = true;
    this.configurationsService
      .updateSmsConfig({ sms: this.sms ? 1 : 0 })
      .subscribe((response: any) => {
        Swal.fire({
          text: 'Configurations modifiées avec succès',
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          },
        }).then(() => {
          this.loading = false;
          this.submitted = false;
          this.getAllConfig();
        });
      });
  }
  configChatBot() {
    this.loadingCB = true;
    this.configurationsService.updateIAConfig({ ia: this.chatbot ? 1 : 0 })
      .subscribe((response: any) => {
        Swal.fire({
          text: 'Configurations modifiées avec succès',
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          },
        }).then(() => {
          this.loadingCB = false;
          this.getAllConfig();
        });
      });
  }
  updateVersions() {
    this.loading = true;
    this.submitted = true;
    const iosUpdate$ = this.configurationsService.updateIosVersion({
      ios: this.iosVersion,
    });
    const iosUpdateRequired$ =
      this.configurationsService.updateIosVersionRequired({
        ios_required: this.iosRequired,
      });

    const androidUpdate$ = this.configurationsService.updateAndroidVersion({
      android: this.androidVersion,
    });
    const androidUpdateRequired$ =
      this.configurationsService.updateAndroidVersionRequired({
        android_required: this.androidRequired,
      });

    forkJoin([
      iosUpdate$,
      androidUpdate$,
      iosUpdateRequired$,
      androidUpdateRequired$,
    ]).subscribe(
      (responses: any[]) => {
        const [
          iosResponse,
          androidResponse,
          iosRequiredResponse,
          androidRequiredResponse,
        ] = responses;
        Swal.fire({
          text: 'Configurations modifiées avec succès',
          icon: 'success',
          showCancelButton: false,
          customClass: {
            confirmButton: 'btn-primary',
          },
        }).then(() => {
          this.loading = false;
          this.submitted = false;
          this.getAllConfig();
        });
      },
      (error) => {
        console.error('Error occurred:', error);
        this.loading = false;
        this.submitted = false;
        // Handle error if either of the requests fail
      }
    );
  }


}
