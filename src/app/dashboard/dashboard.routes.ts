import { Routes } from "@angular/router";
import { DetalleComponent } from "../ingreso-egreso/detalle/detalle.component";
import { EstadisticaComponent } from "../ingreso-egreso/estadistica/estadistica.component";
import { IngresoEgresoComponent } from "../ingreso-egreso/ingreso-egreso.component";



// No se hace por un módulo porque son rutas hijas
export const dashboardRoutes: Routes = [ // Es un array
    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-egreso', component: IngresoEgresoComponent },
    { path: 'detalle', component: DetalleComponent },


]