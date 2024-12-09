import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '../../../shared/components/title-component/title-component.component';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

// Import your AvatarModule
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [TitleComponent, AvatarModule],
  templateUrl: './user-profile.component.html',
  styles: ``,
})
export default class UserProfileComponent implements OnInit {
  private router = inject(Router);
  private userProfileService = inject(UserService);

  public userProfile: any;
  public userEmail = localStorage
    .getItem('userEmail')
    ?.split('@')[0]
    .slice(0, 2);

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.userProfileService.getUserById(+userId).subscribe((data) => {
      this.userProfile = data;
    });
  }
}
