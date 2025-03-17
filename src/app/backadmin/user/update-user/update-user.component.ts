import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { UsersService } from '../../_services/users.service';
interface career {
  title: string;
  from: string;
  to: string;
  image: string;
  min?: any;
  max?: any;
}
interface graduationType {
  level: any;
  university: string;
  date: string | Date;
  name: string;
}

@Component({
  selector: 'app-update-user',
  standalone:false,
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  
  @ViewChild('dialog', { static: false }) dialog!: any;
  @Input() show = false;
  @Input() user: any = false;
  @Input() diplomas: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() success: EventEmitter<any> = new EventEmitter();
  careers: career[] = [];
  imagesUrl: string[] = [];
  minDate: Date = new Date(); // Current date (so the "from" date can't be in the future)
  graduationsList: graduationType[] = [];
  graduationLevel = [
    { name: 'Post Bac', index: 0 },
    { name: 'Niveau Bac', index: 1 },
    { name: 'Bac +2', index: 2 },
    { name: 'Bac +3', index: 3 },
    { name: 'Bac +4', index: 4 },
    { name: 'Bac +5', index: 5 },
    { name: 'Bac +8', index: 6 },
  ];

  updateUserForm: UntypedFormGroup = this.generateForm();
  attemptSubmission: boolean = false;
  emailExists: boolean = false;
  phoneExists: boolean = false;
  showSuccess: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UsersService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.minDate = new Date();
  }
  ngOnDestroy() {
    this.careers = [];
    this.imagesUrl = [];
  }
  addCareer(): void {
    this.careers.push({
      title: '',
      from: '',
      to: '',
      image: '',
    });
  }
  addDeplome(): void {
    this.graduationsList.push({
      level: '',
      university: '',
      date: '',
      name: '',
    });
  }
  parseDate(dateString: string): Date {
    if (!dateString) return this.minDate;
    const parts = dateString.split('-');
    if (parts.length !== 3) return this.minDate;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-based
    const year = parseInt(parts[2], 10);
    const resutl = new Date(year, month, day);
    return resutl;
  }
  getFormattedDate(date: string | Date): Date {
    return typeof date === 'string' ? new Date(date) : date;
  }

  checkDatePattern(data: string): boolean {
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    return datePattern.test(data);
  }
  private compareDates(date1: Date | null, date2: Date | null): boolean {
    return date1 && date2 ? date1.getTime() < date2.getTime() : false;
  }

  getMaxDate(career: any): Date | null {
    if (career.to) {
      return new Date(career.to.split('-').reverse().join('-'));
    }
    return null;
  }
  checkOlder(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
  }

  validateDateRange(from: Date, to: Date): boolean {
    return this.isDateValid(from) && !this.compareDates(to, from);
  }
  private isDateValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  onInputChange(event: any, field: string, index: number): void {
    const selectedData = event;
    if (field === 'title') {
      const target = event.target as HTMLInputElement;
      this.careers[index].title = target.value;
      return;
    }
    if (field === 'from') {
      this.careers[index].from = this.formatDate(selectedData);
      this.careers[index].min = event;
    }

    if (field === 'to') {
      this.careers[index].to = this.formatDate(selectedData);
      this.careers[index].max = event;
    }
    this.cdr.detectChanges();
  }

  onGraduationInputChange(event: any, field: string, index: number): void {
    let target = event.target as HTMLInputElement;
    if (field === 'level') {
      const value = event.value;
      this.graduationsList[index].level = this.graduationLevel[value].name;
    }
    if (field === 'university') {
      this.graduationsList[index].university = target.value;
    }
    if (field === 'date') {
      const value = new Date(event).toLocaleDateString();
      this.graduationsList[index].date = value;
    }
    if (field === 'name') {
      this.graduationsList[index].name = target.value;
    }
    this.cdr.detectChanges();
  }

  removeCareer(index: number): void {
    this.careers.splice(index, 1);
    this.imagesUrl.splice(index, 1); // Remove corresponding image URL
  }
  removeDeplome(index: number): void {
    this.graduationsList.splice(index, 1);
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagesUrl[index] = reader.result as string;
        this.careers[index].image = file;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number, event: any) {
    event.preventDefault();
    this.imagesUrl.splice(index, 1);
    this.careers[index].image = '';
  }
  toDate(dateString: string): Date {
    const date = new Date(dateString.split('-').reverse().join('-')); // Convert 'dd-mm-yyyy' to Date
    return date;
  }
  parseCareers() {
    const career = this.user.career;
    this.careers = [];
    this.imagesUrl = [];

    if (career.length) {
      let careerData = JSON.parse(career);
      if (careerData && careerData.length) {
        careerData.forEach((element: career) => {
          if (element.to) {
            element.max = this.checkOlder(this.toDate(element.to))
              ? this.toDate(element.to)
              : new Date();
          }
          if (element.from) {
            element.min = this.toDate(element.from);
          }
          this.careers.push(element);
          this.imagesUrl.push(element.image);
        });
      }
    } else {
      this.addCareer();
    }
  }
  parseGraduatuions() {
    const niveau = this.user.niveau;
    this.graduationsList = [];
    if (niveau.length) {
      let niveauData = JSON.parse(niveau);
      if (niveauData) {
        niveauData.forEach((element: graduationType) => {
          const level = this.graduationLevel.find((grad: any) => {
            return grad.name === element.level;
          });
          element.level = level;
          this.graduationsList.push(element);
        });
      }
    } else {
      this.addDeplome();
    }
  }
  setUser() {
    this.parseCareers();
    this.parseGraduatuions();
    this.updateUserForm.setValue({
      lastname: this.user.lastname,
      firstname: this.user.firstname,
      email: this.user.email,
      display_email: this.user.is_email == 1 ? true : false,
      diploma_id: this.user.diploma.id,
      site_web: this.user.site_web,
      post: this.user.post,
      strength1: this.user.points[0] ?? '',
      strength2: this.user.points[1] ?? '',
      strength3: this.user.points[2] ?? '',
      facebook: this.user.networks.facebook ?? '',
      instagram: this.user.networks.instagram ?? '',
      youtube: this.user.networks.youtube ?? '',
      tiktok: this.user.networks.tiktok ?? '',
      linkedIn: this.user.networks.linkedIn ?? '',
    });
  }

  generateForm() {
    return this.formBuilder.group({
      lastname: [this.user.lastname, [Validators.required]],
      firstname: [this.user.firstname, [Validators.required]],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      display_email: [false], // Set initial value to false (unchecked)
      diploma_id: [this.user.diploma?.id, [Validators.required]],
      post: [''],
      strength1: [''],
      strength2: [''],
      strength3: [''],
      facebook: [''],
      linkedIn: [''],
      instagram: [''],
      youtube: [''],
      tiktok: [''],
      site_web: [''],
    });
  }
  cancel() {
    this.showSuccess = false;
    this.loading = false;
    this.close.emit();
  }

  convertToFormData(
    data: any,
    formData: FormData = new FormData(),
    parentKey: string = ''
  ): FormData {
    const socialNetworks = [
      'facebook',
      'linkedIn',
      'instagram',
      'youtube',
      'tiktok',
      'web',
    ];

    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        this.convertToFormData(item, formData, `${parentKey}[${index}]`);
      });
    } else if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        const value = data[key];
        let newKey = parentKey ? `${parentKey}.${key}` : key;
        if (socialNetworks.includes(key)) {
          newKey = `networks[${key}]`;
        }
        if (key === 'graduation' && Array.isArray(value)) {
          if (
            value.length &&
            value[0].level &&
            value[0].university &&
            value[0].date &&
            value[0].name
          ) {
            value.forEach((item, index) => {
              Object.keys(item).forEach((gradKey) => {
                const value =
                  item[gradKey] == null
                    ? ''
                    : typeof item[gradKey] === 'string'
                    ? item[gradKey]
                    : item[gradKey].name;
                formData.append(`niveau[${index}][${gradKey}]`, value);
              });
            });
          } else {
            formData.append(`niveau`, '');
          }
        } else if (key === 'display_email') {
          formData.append('is_email', value ? '1' : '0');
        } else if (key === 'strength1') {
          formData.append('points[0]', value);
        } else if (key === 'strength2') {
          formData.append('points[1]', value);
        } else if (key === 'strength3') {
          formData.append('points[2]', value);
        } else if (key === 'career' && Array.isArray(value)) {
          if (value.length && value[0].title && value[0].from && value[0].to) {
            value.forEach((item, index) => {
              Object.keys(item).forEach((careerKey) => {
                if (careerKey != 'max' && careerKey != 'min') {
                  formData.append(
                    `career[${index}][${careerKey}]`,
                    item[careerKey] == null ? '' : item[careerKey]
                  );
                }
              });
            });
          } else {
            formData.append(`career`, '');
          }
        } else if (typeof value === 'object' && value !== null) {
          this.convertToFormData(value, formData, newKey);
        } else {
          formData.append(newKey, value == null ? '' : value);
        }
      });
    } else {
      formData.append(parentKey, data == null ? '' : data);
    }
    return formData;
  }

  attemptUpdateUser(event: any) {
    this.attemptSubmission = true;
    if (this.updateUserForm.valid) {
      let form = this.updateUserForm.value;
      form.career = this.careers;
      form.graduation = this.graduationsList;
      const formData: FormData = this.convertToFormData(form);
      this.loading = true;
      this.userService.updateUser(formData, this.user.id).subscribe(
        (res: any) => {
          if (res.status === 200) {
            if (res.body.result === 'success') {
              this.show = false;
              Swal.fire({
                text: this.translate.instant('USERS.USER_EDITED'),
                icon: 'success',
                showCancelButton: false,
                customClass: {
                  confirmButton: 'btn-primary',
                },
              }).then(() => {
                this.loading = false;
                this.updateUserForm = this.generateForm();
                this.showSuccess = false;
                this.success.emit();
              });
            }
          }
        },
        (res: any) => {
          this.loading = false;
          if (res.status === 422) {
            if (res.error.error.data.email) {
              this.emailExists = true;
            }
            if (res.error.error.data.phone) {
              this.phoneExists = true;
            }
          }
        }
      );
    }
  }
}
