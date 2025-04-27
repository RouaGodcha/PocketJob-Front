import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../_services/profil.service';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  profil: any = {};
  isEditingInfo: boolean = false;
  isEditingAdresse: boolean = false;
  isEditingCv: boolean = false;
  selectedFile: File | null = null;

  constructor(private profilService: ProfilService) {}

  ngOnInit(): void {
    this.loadProfil();
  }

  loadProfil() {
    this.profilService.getFakeProfil().subscribe(data => {
      this.profil = data;
    });

    // API réelle plus tard :
    // this.profilService.getProfil().subscribe(data => { this.profil = data; });
  }

  // Infos
  modifierInfos() { this.isEditingInfo = true; }
  saveInfos() {
    this.profilService.updateProfil(this.profil).subscribe(() => {
      alert('✅ Données personnelles mises à jour.');
      this.isEditingInfo = false;
    });
  }
  annulerInfos() { this.isEditingInfo = false; this.loadProfil(); }

  // Adresse
  modifierAdresse() { this.isEditingAdresse = true; }
  saveAdresse() {
    this.profilService.updateProfil(this.profil).subscribe(() => {
      alert('✅ Adresse mise à jour.');
      this.isEditingAdresse = false;
    });
  }
  annulerAdresse() { this.isEditingAdresse = false; this.loadProfil(); }

  // CV et Qualifications
  modifierCv() { this.isEditingCv = true; }
  saveCv() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('cv', this.selectedFile);
    }
    formData.append('qualifications', this.profil.qualifications);

    this.profilService.updateCv(formData).subscribe(() => {
      alert('✅ CV et qualifications mis à jour.');
      this.isEditingCv = false;
    });
  }
  annulerCv() { this.isEditingCv = false; this.loadProfil(); }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
