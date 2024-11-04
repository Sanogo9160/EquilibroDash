import {Component, OnInit} from '@angular/core';
import {StatsService} from "../../services/stats.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatIcon,
    MatCardContent,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatGridList,
    MatGridTile,
    NgxChartsModule
  ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})

export class AcceuilComponent implements OnInit {
  statsData: any[] = [];
  chartData: any[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.statsService.obtenirStatistiques().subscribe(
      (data) => {
        this.statsData = [
          { icon: 'people', title: 'Total Utilisateurs', value: data.totalUtilisateurs },
          { icon: 'local_hospital', title: 'Nombre Diététiciens', value: data.nombreDieteticiens },
          { icon: 'assignment', title: 'Nombre Consultations', value: data.nombreConsultations },
        ];
      },
      (error) => {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    );
  }


}
