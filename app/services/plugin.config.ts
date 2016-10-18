import {Injectable} from "@angular/core";
import {Filter} from "../models/filter-list-of"
import {AgendaSession} from "../models/agenda-session"

export interface PluginOptions {
    name: string
    mockAJAX: any

    filters: Filter[]
    sessions: AgendaSession[]

    addToMyAgendaUrl: string
    removeFromMyAgendaUrl: string
}

@Injectable()
export class PluginConfig {
    name: string = '';
    mockAJAX: any;

    filters: Filter[] = [];
    sessions: AgendaSession[] = [];

    addToMyAgendaUrl: string = '';
    removeFromMyAgendaUrl: string = '';

    constructor(options: PluginOptions) {
        Object.assign(this, options);
    }

    static buildTemplateUrl(path: string) {
        var base = (window && window['__it7_session_public_plugin__']) ? window['__it7_session_public_plugin__'] : 'app';
        return base.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');
    }
}
