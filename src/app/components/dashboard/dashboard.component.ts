import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {NgChartsModule} from "ng2-charts";
import {ChartData} from "chart.js";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule,  NgChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  charts: { name: string; data: ChartData<'doughnut'> }[] = [
    { name: 'Total Orders', data: { labels: ['Total Orders'], datasets: [{ data: [81], label: 'Total Orders' }] } },
    { name: 'Customer Growth', data: { labels: ['Customer Growth'], datasets: [{ data: [22], label: 'Customer Growth' }] } },
    { name: 'Total Revenue', data: { labels: ['Total Revenue'], datasets: [{ data: [62], label: 'Total Revenue' }] } },
  ];

  foods = [
    { name: 'Les Fruits', description: 'Description des fruits...', image: 'assets/fruits.png' },
    { name: 'Les Légumes', description: 'Description des légumes...', image: 'assets/legumes.png' },
    { name: 'La salade', description: 'Description de la salade...', image: 'assets/salade.png' },
  ];
}
