import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-postes',
  standalone : false ,
  templateUrl: './update-postes.component.html',
  styleUrls: ['./update-postes.component.scss']
})
export class UpdatePostesComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() post: any = null;
  @Output() close = new EventEmitter<void>();

  updatePostForm!: FormGroup;
  attemptSubmission = false;
  imageUrl: any = null;

  imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updatePostForm = this.fb.group({
      description: [this.post?.description ?? '', Validators.required],
      image: ['']
    });

    if (this.post?.files?.length && this.post.files[0].path) {
      this.imageUrl = this.post.files[0].path;
    }
  }

  uploadImage(event: any): void {
    const input = event.currentTarget as HTMLInputElement;
    const fileList = input.files;

    if (fileList?.length) {
      const file = fileList[0];
      this.updatePostForm.get('image')?.setValue([file]);

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }

    input.value = '';
  }

  isBase64Image(data: string): boolean {
    const regex = /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,/;
    return regex.test(data);
  }

  checkFileUri(uri: string): boolean {
    const ext = uri?.split('.').pop()?.toLowerCase();
    return !!ext && this.imageExtensions.includes(ext);
  }

  removeImage(): void {
    this.updatePostForm.get('image')?.setValue('');
    this.imageUrl = null;
  }

  updateCategorie(): void {
    this.attemptSubmission = true;

    if (this.updatePostForm.valid && this.imageUrl) {
      // Tu peux faire ici l'appel à ton service pour modifier
      console.log('Formulaire valide:', this.updatePostForm.value);
      this.closeModal();
    }
  }

  closeModal(): void {
    this.updatePostForm.reset();
    this.imageUrl = null;
    this.close.emit();
  }
}
