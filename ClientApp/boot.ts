import 'isomorphic-fetch';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'font-awesome/css/font-awesome.css'

declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {
    aurelia.use.standardConfiguration();

    if (IS_DEV_BUILD) {
        aurelia.use.
            plugin(PLATFORM.moduleName('aurelia-validation'))
            .plugin(PLATFORM.moduleName('ag-grid-aurelia'))
            .plugin(PLATFORM.moduleName('aurelia-dialog'))
            .developmentLogging();
    }

    new HttpClient().configure(config => {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        config.withBaseUrl(baseUrl);
    });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app/components/app/app')));
}
