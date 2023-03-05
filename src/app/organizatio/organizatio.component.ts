import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-organizatio',
  templateUrl: './organizatio.component.html',
  styleUrls: ['./organizatio.component.css']
})
export class OrganizatioComponent implements OnInit {

  

  src: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) { 
  }
  ngOnInit(): void {
  }
  setUrl(url: any) {
    this.cleanup();
    setTimeout(() => {
      this.src = this.bypassAndSanitize(url);
    }, 50);
  }

  cleanup() {
    let src = null;
  }

  bypassAndSanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}




