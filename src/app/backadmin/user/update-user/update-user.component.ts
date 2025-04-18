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
export class UpdateUserComponent{
  
}