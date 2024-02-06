import { User } from "./User";

export interface ITeam {
    id: number,
    name: string,
    url: string,
    final_mark: number | null,
    project_id: number,
    created_at: Date,
    updated_at: Date,
    status: string,
    terminating_at: Date | null,
    users: User[],
    "locked?": boolean,
    "validated?": boolean | null,
    "closed?": boolean,
    repo_url: string,
    repo_uuid: string,
    locked_at: Date | null,
    closed_at: Date | null,
    project_session_id: number,
    project_gitlab_path: string,
}

export class Team implements ITeam {
    id: number;
    name: string;
    url: string;
    final_mark: number | null;
    project_id: number;
    created_at: Date;
    updated_at: Date;
    status: string;
    terminating_at: Date | null;
    users: User[];
    "locked?": boolean;
    "validated?": boolean | null;
    "closed?": boolean;
    repo_url: string;
    repo_uuid: string;
    locked_at: Date | null;
    closed_at: Date | null;
    project_session_id: number;
    project_gitlab_path: string;

    constructor(data: ITeam) {
        this.id = data.id
        this.name = data.name
        this.url = data.url
        this.final_mark = data.final_mark
        this.project_id = data.project_id
        this.created_at = data.created_at
        this.updated_at = data.updated_at
        this.status = data.status
        this.terminating_at = data.terminating_at
        this.users = data.users
        this["locked?"] = data["locked?"]
        this["validated?"] = data["validated?"]
        this["closed?"] = data["closed?"]
        this.repo_url = data.repo_url
        this.repo_uuid = data.repo_uuid
        this.locked_at = data.locked_at
        this.closed_at = data.closed_at
        this.project_session_id = data.project_session_id
        this.project_gitlab_path = data.project_gitlab_path
    }

}