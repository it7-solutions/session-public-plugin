import {NgModule}      from '@angular/core';
import {ChooseCantonComponent}  from './components/choose-canton.component';
import {CantonComponent}  from './components/canton.component';
import {PluginConfig}  from '../../services/plugin.config';

@NgModule({
    // imports: [BrowserModule],
    declarations: [ChooseCantonComponent, CantonComponent],
    exports: [ChooseCantonComponent]
    //bootstrap: [ChooseCantonComponent]
})
export class ChooseCantonModule {

    constructor(
        private config: PluginConfig
    ) {
        console.log('module ', config);
    }
}
