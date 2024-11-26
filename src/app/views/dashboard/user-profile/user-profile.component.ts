import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '../../../shared/components/title-component/title-component.component';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './user-profile.component.html',
  styles: ``,
})
export default class UserProfileComponent implements OnInit {
  private router = inject(Router);
  private userProfileService = inject(UserService);

  public userProfile: any;

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.userProfileService.getUserProfileById(+userId!).subscribe((data) => {
      this.userProfile = data;
    });
  }
}
