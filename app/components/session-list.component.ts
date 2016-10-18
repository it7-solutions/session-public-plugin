import {Component, Input} from '@angular/core';

import {PluginConfig} from "../services/plugin.config";
import {ListOf, ListItem} from "../models/list-of";
import {DataManagerService} from "../services/data-manager.service";

@Component({
    selector: 'session-list',
    templateUrl: PluginConfig.buildTemplateUrl('templates/session-list.html')
})
export class SessionListComponent {
    @Input() public sessionList:ListOf;

    constructor(
        private config: PluginConfig,
        private dm: DataManagerService
    ) {
        console.log('config', this.config);
    }

    ngOnInit(){
        console.log(this.sessionList);
    }

    // -- Component events

    public onExpandClick(item:ListItem) {
        item.expanded = !item.expanded;
        console.log('expand ', item)
    }

    public onAddClick(item:ListItem) {
        console.log('Add ', item);
        this.dm.addToMyAgendaRequest(item.original)
            .then(
                data => {
                    console.log('return after add', data);
                    //this.dynamicFlags.update(this.config);
                }
            );
    }

    public onRemoveClick(item:ListItem) {
        console.log('Remove ', item);
        this.dm.removeFromMyAgendaRequest(item.original)
            .then(
                data => {
                    console.log('return after remove', data);
                    //this.dynamicFlags.update(this.config);
                }
            );
    }
}
