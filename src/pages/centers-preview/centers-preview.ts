import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {EstablishmentsService} from "../../services/establishments.service";
import {TabsPage} from "../tabs/tabs";
import {GoogleAnalytics} from "@ionic-native/google-analytics";

@Component({
    selector: 'page-centers-preview',
    templateUrl: 'centers-preview.html'
})
export class CentersPreviewPage {

    establishments : any;

    constructor(
        public navCtrl: NavController,
        private authService: AuthService,
        private establishmentService: EstablishmentsService,
        public ga: GoogleAnalytics) {

        this.ga.startTrackerWithId('UA-76827860-10')
            .then(() => {
                console.log('Google analytics is ready now');
                this.ga.trackView('centersPreviewPage');
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e));
    }

    ionViewWillEnter(){
        this.establishments = this.establishmentService.establishmentsByUser;
    }

    selectedEstablishment(establishment){
        localStorage.setItem('userLogged',JSON.stringify(establishment));

        localStorage.setItem('establishmentSelected', establishment.establishmentId);
        this.establishmentService.selectedEstablishmentId = establishment.establishmentId;

        this.authService.userLogged = establishment;
        this.authService.establishmentId = establishment.establishmentId;
        this.authService.userId = establishment.id;

        this.ga.startTrackerWithId('UA-76827860-10')
            .then(() => {
                console.log('Google analytics is ready now');
                this.ga.trackEvent('Usuario', 'inicia sesión', this.authService.userLogged.establishmentName +' / '+ this.authService.establishmentId);
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e));

        this.navCtrl.setRoot(TabsPage);
    }

}
