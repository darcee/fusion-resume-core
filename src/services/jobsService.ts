import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import type { Job, CreateJobInput, UpdateJobInput } from '../types/Job';

const client = generateClient<Schema>();

export const jobsService = {
    async createJob(input: CreateJobInput): Promise<Job> {
        try {
            const { data: newJob, errors } = await client.models.Job.create(input);

            if (errors) {
                throw new Error(errors[0].message);
            }

            return newJob as Job;
        } catch (error) {
            console.error('Error creating job:', error);
            throw error;
        }
    },

    async listJobs(): Promise<Job[]> {
        try {
            const { data: jobs, errors } = await client.models.Job.list();

            if (errors) {
                throw new Error(errors[0].message);
            }

            return jobs as Job[];
        } catch (error) {
            console.error('Error listing jobs:', error);
            throw error;
        }
    },

    async getJob(id: string): Promise<Job> {
        try {
            const { data: job, errors } = await client.models.Job.get({ id });

            if (errors) {
                throw new Error(errors[0].message);
            }

            if (!job) {
                throw new Error('Job not found');
            }

            return job as Job;
        } catch (error) {
            console.error('Error getting job:', error);
            throw error;
        }
    },


    async updateJob(input: UpdateJobInput): Promise<Job> {
        try {
            const { data: updatedJob, errors } = await client.models.Job.update(input);

            if (errors) {
                throw new Error(errors[0].message);
            }

            return updatedJob as Job;
        } catch (error) {
            console.error('Error updating job:', error);
            throw error;
        }
    },


    async deleteJob(id: string): Promise<void> {
        try {
            const { errors } = await client.models.Job.delete({ id });

            if (errors) {
                throw new Error(errors[0].message);
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            throw error;
        }
    },


    subscribeToJobs(onUpdate: (job: Job[]) => void) {
        const subscription = client.models.Job.observeQuery().subscribe({
            next: ({ items, isSynced }) => {
                if (isSynced) {
                    onUpdate(items as Job[]);
                }
            },
            error: (error) => {
                console.error('Subscription error:', error);
            }
        });

        return () => subscription.unsubscribe();
    }
};