import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet} from '@angular/router';
import { SidebarComponent } from '../../../../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../../shared/header/header.component';

@Component({
  selector: 'app-navigation-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './navigation-admin.html',
  styleUrl: './navigation-admin.css'
})
export class NavigationAdmin {}
