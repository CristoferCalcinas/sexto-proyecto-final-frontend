import { Component, inject, OnInit } from '@angular/core';
import { TitleComponent } from '../../../shared/components/title-component/title-component.component';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './user-profile.component.html',
  styles: ``,
})
export default class UserProfileComponent implements OnInit {
  private userProfileService = inject(UserProfileService);

  public userProfile: any;

  ngOnInit(): void {
    this.userProfileService.getUserProfileById(1).subscribe((data) => {
      this.userProfile = data;
    });
  }
}
