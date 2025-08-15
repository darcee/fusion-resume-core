import { useState, useEffect } from 'react';
import { JobForm } from './components/JobForm.tsx';
import { JobsList } from './components/JobsList.tsx';
import { jobsService } from './services/jobsService.ts';
import type {CreateJobInput, Job} from './types/Job.ts';
import './App.css';

function App() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingJob, setEditingJob] = useState<Job | undefined>();
    const [error, setError] = useState<string>('');
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        // Set up real-time subscription
        const unsubscribe = jobsService.subscribeToJobs((updatedJobs) => {
            setJobs(updatedJobs);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    const handleCreateJob = async (JobData: CreateJobInput) => {
        try {
            setSaving(true);
            await jobsService.createJob(JobData);
            setError('');
            // Real-time subscription will update the list automatically
        } catch (err) {
            setError('Failed to create Job');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleUpdateJob = async (JobData: CreateJobInput) => {
        if (!editingJob) return;

        try {
            setSaving(true);
            await jobsService.updateJob({
                id: editingJob.id,
                ...JobData
            });
            setEditingJob(undefined);
            setError('');
            // Real-time subscription will update the list automatically
        } catch (err) {
            setError('Failed to update Job');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteJob = async (id: string) => {
        const JobToDelete = jobs.find(Job => Job.id === id);
        const confirmMessage = JobToDelete
            ? `Are you sure you want to delete ${JobToDelete.jobTitle}?`
            : 'Are you sure you want to delete this Job?';

        if (!window.confirm(confirmMessage)) {
            return;
        }

        try {
            await jobsService.deleteJob(id);
            setError('');
            // Real-time subscription will update the list automatically
        } catch (err) {
            setError('Failed to delete Job');
            console.error(err);
        }
    };

    const handleEdit = (Job: Job) => {
        setEditingJob(Job);
    };

    const handleCancelEdit = () => {
        setEditingJob(undefined);
    };

    return (
        <div className="App" style={{
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    color: '#212529',
                    marginBottom: '30px',
                    fontSize: '2.5rem'
                }}>
                    📝 Jobs Manager
                </h1>

                <p style={{
                    textAlign: 'center',
                    color: '#6c757d',
                    marginBottom: '30px'
                }}>
                    Manage your contacts with real-time updates
                </p>

                {error && (
                    <div style={{
                        color: '#721c24',
                        backgroundColor: '#f8d7da',
                        padding: '12px 16px',
                        marginBottom: '20px',
                        borderRadius: '6px',
                        border: '1px solid #f5c6cb'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                <JobForm
                    onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
                    editingJob={editingJob}
                    onCancel={editingJob ? handleCancelEdit : undefined}
                    loading={saving}
                />

                <JobsList
                    jobs={jobs}
                    onEdit={handleEdit}
                    onDelete={handleDeleteJob}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default App;