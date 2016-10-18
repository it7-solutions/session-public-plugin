import {AgendaSession} from '../models/agenda-session';

export class MyAgendaService {
    public sessions: AgendaSession[] = [];

    public updateFromSessions(src: AgendaSession[]) {
        this.sessions.splice(0, this.sessions.length);
        src.forEach((session: AgendaSession) => {
            if (session.isInAgenda) {
                this.sessions.push(session)
            }
        })
    }
}