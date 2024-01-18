import { BaseManager } from "../managers/BaseManager";
import { IProject } from "./project";
import { Client } from "./client";

export interface IProjectsUsers {
    id: number,
    occurence: number,
    final_mark: number | null,
    status: string,
    "validated?": boolean,
    current_team_id: number,
    project: IProject,
    cursus_ids: number[],
    marked_at: Date,
    marked: boolean,
    retriable_at: Date,
    created_at: Date,
    updated_at: Date
}

export class ProjectsUsers extends BaseManager {
    id: number;
    occurence: number;
    final_mark: number | null;
    status: string;
    "validated?": boolean;
    current_team_id: number;
    project: IProject;
    cursus_ids: number[];
    marked_at: Date;
    marked: boolean;
    retriable_at: Date;
    created_at: Date;
    updated_at: Date;

    constructor(client: Client, data: IProjectsUsers) {
        super(client);
        this.id = data.id;
        this.occurence = data.occurence;
        this.final_mark = data.final_mark;
        this.status = data.status;
        this["validated?"] = data["validated?"];
        this.current_team_id = data.current_team_id;
        this.project = data.project;
        this.cursus_ids = data.cursus_ids;
        this.marked_at = data.marked_at;
        this.marked = data.marked;
        this.retriable_at = data.retriable_at;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}
