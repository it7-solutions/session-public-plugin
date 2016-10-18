import {Component, Input} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {MyAgendaService} from "../services/my-agenda.service";

@Component({
    selector: 'my-agenda-list',
    templateUrl: PluginConfig.buildTemplateUrl('templates/my-agenda-list.html')
})
export class MyAgendaListComponent {
    @Input() public myAgenda: MyAgendaService;

    constructor() {}
}
