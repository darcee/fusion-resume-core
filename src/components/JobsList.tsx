import React from 'react';
import type { Job } from '../types/Job.ts';

interface JobsListProps {
    jobs: Job[];
    onEdit: (job: Job) => void;
    onDelete: (id: string) => void;
    loading?: boolean;
}

export const JobsList: React.FC<JobsListProps> = ({
                                                        jobs,
                                                        onEdit,
                                                        onDelete,
                                                        loading = false
                                                    }) => {
    if (loading) {
        return <div>Loading jobs...</div>;
    }

    if (jobs.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                color: '#6c757d'
            }}>
                <h3>No jobs found</h3>
                <p>Add some jobs to get started!</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Jobs List ({jobs.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        style={{
                            border: '1px solid #e9ecef',
                            padding: '16px',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', color: '#212529' }}>
                                    {job.jobTitle}
                                </h4>
                                {job.email && (
                                    <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>
                                        📧 {job.email}
                                    </p>
                                )}
                                <p style={{ margin: '4px 0 0 0', color: '#adb5bd', fontSize: '12px' }}>
                                    Added: {new Date(job.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => onEdit(job)}
                                    style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => onDelete(job.id)}
                                    style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};