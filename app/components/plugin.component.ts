import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf} from "../models/list-of";
import {FilterListOf} from "../models/filter-list-of";
import {AgendaSessionsService} from "../services/agenda-sessions.service";
import {MyAgendaService} from "../services/my-agenda.service";
import {AgendaSession} from "../models/agenda-session";

@Component({
    selector: 'session-public-plugin',
    templateUrl: PluginConfig.buildTemplateUrl('templates/plugin.html')
})
export class PluginComponent {
    @Output() public sessionList:ListOf;
    @Output() public myAgenda: MyAgendaService;
    @Output() public filters:FilterListOf;

    constructor(
        private config: PluginConfig,
        private agendaSessions: AgendaSessionsService,
        myAgenda: MyAgendaService
    ) {
        console.log('config', this.config);

        this.myAgenda = myAgenda;

        // Init Filters from config
        this.filters = new FilterListOf();
        this.filters.add(this.config.filters);

        // Create List from sessions
        this.sessionList = new ListOf();
    }

    // -- Angular events

    public ngOnInit(){
        this.agendaSessions.onUpdate.subscribe(sessions => this.onSessionsUpdate(sessions));
        this.onSessionsUpdate(this.agendaSessions.sessions);
        this.applyFilter();
    }

    // -- Component events

    public onFilterChange(event:any) {
        var select = event.target;
        var filterKey = select.getAttribute('data-key');
        var filter = this.filters.filtersByKey[filterKey];
        if(filter) {
            filter.value = select.value;
            this.applyFilter();
        } else {
            console && console.error && console.error('Not found instance of class "Filter" for changed filter.');
        }
    }

    // -- Private

    private onSessionsUpdate(sessions: AgendaSession[]){
        console.log('ON session update', sessions);
        this.sessionList.update(sessions);
        this.applyFilter();
    }

    private applyFilter(){
        console.log('applyFilter',this.filters, this.sessionList);
        this.filters.applyToList(this.sessionList);
    }
}
