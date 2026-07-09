import { inject } from "@angular/core";
import { OfertaService } from "./oferta.service";
import { OfertaState } from "./oferta.state";
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export const OfertaStore = signalStore(
    { providedIn: 'root' },

    withState<OfertaState>({
        ofertas: [],
        loading: false,
        selected: null
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
                console.log('Respuesta empresa:', page);
                console.log('Contenido:', page.content);

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
        },
        loadById(id: number) {

            patchState(store, {
                loading: true
            });

            service.verDetalle(id)
                .subscribe(oferta => {

                    patchState(store, {
                        selected: oferta,
                        loading: false
                    });

                });
        }
    })),
    withComputed((store) => ({
        ofertasDestacadas: () => store.ofertas().slice(0, 4)
    }))
);



