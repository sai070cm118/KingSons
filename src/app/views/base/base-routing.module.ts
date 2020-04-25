import { RouteAuthGuard } from '../../Shared/guard/routeauth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';
import { CarouselsComponent } from './carousels.component';
import { CollapsesComponent } from './collapses.component';
import { PaginationsComponent } from './paginations.component';
import { PopoversComponent } from './popovers.component';
import { ProgressComponent } from './progress.component';
import { TooltipsComponent } from './tooltips.component';
import { NavbarsComponent } from './navbars/navbars.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards'
      },
      {
        path: 'cards',
        canActivate: [RouteAuthGuard],
        component: CardsComponent,
        data: {
          title: 'Cards'
        }
      },
      {
        path: 'forms',
        canActivate: [RouteAuthGuard],
        component: FormsComponent,
        data: {
          title: 'Forms'
        }
      },
      {
        path: 'switches',
        canActivate: [AuthGRouteAuthGuarduard],
        component: SwitchesComponent,
        data: {
          title: 'Switches'
        }
      },
      {
        path: 'tables',
        canActivate: [RouteAuthGuard],
        component: TablesComponent,
        data: {
          title: 'Tables'
        }
      },
      {
        path: 'tabs',
        canActivate: [RouteAuthGuard],
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },
      {
        path: 'carousels',
        canActivate: [RouteAuthGuard],
        component: CarouselsComponent,
        data: {
          title: 'Carousels'
        }
      },
      {
        path: 'collapses',
        canActivate: [RouteAuthGuard],
        component: CollapsesComponent,
        data: {
          title: 'Collapses'
        }
      },
      {
        path: 'paginations',
        canActivate: [RouteAuthGuard],
        component: PaginationsComponent,
        data: {
          title: 'Pagination'
        }
      },
      {
        path: 'popovers',
        canActivate: [RouteAuthGuard],
        component: PopoversComponent,
        data: {
          title: 'Popover'
        }
      },
      {
        path: 'progress',
        canActivate: [RouteAuthGuard],
        component: ProgressComponent,
        data: {
          title: 'Progress'
        }
      },
      {
        path: 'tooltips',
        canActivate: [RouteAuthGuard],
        component: TooltipsComponent,
        data: {
          title: 'Tooltips'
        }
      },
      {
        path: 'navbars',
        canActivate: [RouteAuthGuard],
        component: NavbarsComponent,
        data: {
          title: 'Navbars'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
