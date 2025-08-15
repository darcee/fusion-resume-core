export interface Job {
    id: string;
    jobTitle: string;
    companyName: string;
    link?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateJobInput {
    jobTitle: string;
    companyName: string;
    link?: string;
}

export interface UpdateJobInput {
    id: string;
    jobTitle: string;
    companyName: string;
    link?: string;
}