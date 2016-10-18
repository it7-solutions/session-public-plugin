import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {PluginOptions, PluginConfig} from "./services/plugin.config";

import { UrlResolver } from '@angular/compiler';
class MyUrlResolver extends UrlResolver {
    resolve(baseUrl: string, url: string): string {
        // Serve CSS files from a special CDN.
        if (url.substr(-4) === '.css') {
            return super.resolve('http://cdn.myapp.com/css/', url);
        }
        return super.resolve(baseUrl, url);
    }

    static attach() {
        var proxied = UrlResolver.prototype.resolve;
        UrlResolver.prototype.resolve = (baseUrl: string, url: string): string => {
            console.log('resolve '+url);
            return proxied.bind(proxied)(baseUrl, url);
        };
    };
}
//bootstrap(MyApp, [provide(UrlResolver, {useClass: MyUrlResolver})]);
//MyUrlResolver.attach();

export function RunApplication(options: PluginOptions) {
    let menuConfig = new PluginConfig(options);

    platformBrowserDynamic([
        {provide: PluginConfig, useValue: menuConfig },
        {provide: UrlResolver, useClass: MyUrlResolver }
        ])
        .bootstrapModule(AppModule);
}
window['RunApplication'] = RunApplication;
