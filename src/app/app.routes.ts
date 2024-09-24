import { Routes } from '@angular/router';
import path from "node:path";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

export const routes: Routes = [

  { path: '', component: DashboardComponent },
];
