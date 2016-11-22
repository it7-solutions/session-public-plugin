import {Injectable} from "@angular/core";

import {AgendaSession} from '../models/agenda-session';
import {PluginConfig} from './plugin.config';

@Injectable()
export class MyAgendaService {
    public sessions: AgendaSession[] = [];


    constructor(private config: PluginConfig) {
    }

    public updateFromSessions(src: AgendaSession[]) {
        this.sessions.splice(0, this.sessions.length);
        src.forEach((session: AgendaSession) => {
            if (session.isInAgenda) {
                this.sessions.push(session)
            }
        });

        this.checkMinMyAgendaSessions();
    }

    /**
     * Check sessions column in MyAgenda and set Next Step button status
     */
    private checkMinMyAgendaSessions(){
        if(this.sessions.length >= this.config.minSessionsInMyAgenda) {
            this.allowNextStep()
        } else {
            this.disallowNextStep()
        }
    }

    private allowNextStep(){
        if('function' === typeof this.config.allowNextStep){
            this.config.allowNextStep();
        }
    }

    private disallowNextStep(){
        if('function' === typeof this.config.disallowNextStep){
            this.config.disallowNextStep();
        }
    }
}