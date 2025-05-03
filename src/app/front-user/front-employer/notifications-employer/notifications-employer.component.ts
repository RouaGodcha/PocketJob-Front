import { Component, OnInit } from '@angular/core';
import { EmployerNotificationService } from '../_services/employer-notification.service';

@Component({
  selector: 'app-notifications-employer',
  standalone: false,
  templateUrl: './notifications-employer.component.html',
  styleUrl: './notifications-employer.component.scss'
})
export class NotificationsEmployerComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notifService: EmployerNotificationService) {}

  ngOnInit() {
    this.notifService.getNotifications().subscribe((res: any) => {
      this.notifications = res;
    });
  }

  markAsRead(id: number) {
    this.notifService.markAsRead(id).subscribe(() => {
      const notif = this.notifications.find(n => n.id === id);
      if (notif) notif.is_read = true;
    });
  }
}
