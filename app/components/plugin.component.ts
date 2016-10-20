import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf} from "../models/list-of";
import {FilterListOf, Filter} from "../models/filter-list-of";
import {AgendaSessionsService} from "../services/agenda-sessions.service";
import {MyAgendaService} from "../services/my-agenda.service";
import {AgendaSession} from "../models/agenda-session";
import {It7ErrorService} from "../services/it7-error.service";

@Component({
    selector: 'session-public-plugin',
    templateUrl: PluginConfig.buildTemplateUrl('templates/plugin.html')
})
export class PluginComponent {
    @Output() public sessionList:ListOf;
    @Output() public myAgenda: MyAgendaService;
    @Output() public filters:FilterListOf;

    private showChooseCanton = false;

    constructor(
        private config: PluginConfig,
        private err: It7ErrorService,
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

    public onChooseCantonClick(){
        this.showChooseCanton = true;
    }

    public onCancelChooseCanton() {
        this.showChooseCanton = false;
        console.log('onCancelChooseCanton');
    }

    public onChooseCanton(cantonKey:string) {
        this.showChooseCanton = false;
        this.setCantonFilterByKey(cantonKey);
        this.applyFilter();
        console.log('onChooseCanton '+cantonKey);
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

    private setCantonFilterByKey(key: string) {
        var filter: Filter = this.filters.filtersByKey['cantons'];
        if (filter instanceof Filter) {
            if (filter.values.find(f => f.key === key)) {
                filter.value = key;
            } else {
                this.err.fire('Selected Canton does not exist in the filter of the cantons');
            }
        } else {
            this.err.fire('Filter cantons not found');
        }
    }
}
