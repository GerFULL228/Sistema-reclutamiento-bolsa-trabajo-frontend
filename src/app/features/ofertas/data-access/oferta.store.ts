import { inject } from "@angular/core";
import { OfertaService } from "./oferta.service";
import { OfertaState } from "./oferta.state";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const OfertaStore = signalStore(
    { providedIn: 'root' },

    withState<OfertaState>({
        ofertas: [],
        loading: false
    }),

    withMethods((store, service = inject(OfertaService)) => ({

        loadPublicas() {
            patchState(store, { loading: true });

            service.listarPublicas().subscribe((page) => {
                patchState(store, {
                    ofertas: page.content,
                    loading: false
                });
            });
        },

        loadEmpresa() {
            patchState(store, { loading: true });

            service.listarEmpresa().subscribe((page) => {
                patchState(store, {
                    ofertas: page.content,
                    loading: false
                });
            });
        },

        loadAdmin() {
            patchState(store, { loading: true });

            service.listarAdmin().subscribe((page) => {
                patchState(store, {
                    ofertas: page.content,
                    loading: false
                });
            });
        }
    }))
);



