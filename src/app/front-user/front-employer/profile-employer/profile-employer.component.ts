import { Component, OnInit } from '@angular/core';
import { EmployerProfileService } from '../_services/employer-profile.service';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-employer',
  standalone: false,
  templateUrl: './profile-employer.component.html',
  styleUrl: './profile-employer.component.scss'
})
export class ProfileEmployerComponent implements OnInit {
  profile: any = {};
  previewUrl: string | ArrayBuffer | null = null;
  googleMapUrl: SafeResourceUrl = '';

  constructor(private profileService: EmployerProfileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
      this.setMapUrl(); // Appeler la méthode pour construire l’URL
    });
  }

  updateProfile() {
    this.profileService.updateProfile(this.profile).subscribe(res => {
      alert(res.message || 'Profil mis à jour avec succès.');
    });
  }

  triggerLogoUpload() {
    document.getElementById('logoInput')?.click();
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);

      // API réelle :
      // this.profileService.uploadLogo(file).subscribe(...)
    }
  }

  setMapUrl() {
    const addressParts = [
      this.profile.address,
      this.profile.city,
      this.profile.state,
      this.profile.country
    ].filter(Boolean).join(', ');
    
    const query = encodeURIComponent(addressParts);
    const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDasIT4XvNTrdkXBCPDnLr1k-Oe_tE1Vtk&q=${query}`;
    this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
