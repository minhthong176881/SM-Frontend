import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  @Input() user!: string;
  @Output() showFiller = new EventEmitter();
  constructor(private authService: AuthService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(result => {
      if (result === true) {
        const returnUrl: string = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
        window.location.href = returnUrl;
      } else {
        alert('Error');
      }
    });
  }

}
