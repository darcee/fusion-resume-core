import React, { useState, useEffect } from 'react';
import type { Job, CreateJobInput } from '../types/Job.ts';

interface JobFormProps {
    onSubmit: (JobData: CreateJobInput) => void;
    editingJob?: Job;
    onCancel?: () => void;
    loading?: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({
                                                      onSubmit,
                                                      editingJob,
                                                      onCancel,
                                                      loading = false
                                                  }) => {
    const [formData, setFormData] = useState<CreateJobInput>({
        jobTitle: '',
        companyName: editingJob ? editingJob.companyName: '',
        link: ''
    });

    useEffect(() => {
        if (editingJob) {
            setFormData({
                jobTitle: editingJob.jobTitle,
                companyName: editingJob.companyName,
                link: editingJob.link || ''
            });
        } else {
            setFormData({ jobTitle: '', companyName: '', link: '' });
        }
    }, [editingJob]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
        }}>
            <h2>{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label htmlFor="jobTitle" style={{ display: 'block', marginBottom: '5px' }}>
                            Job Title *
                        </label>
                        <input
                            id="jobTitle"
                            type="text"
                            name="jobTitle"
                            placeholder="Enter job title"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="companyName" style={{ display: 'block', marginBottom: '5px' }}>
                            Company Name *
                        </label>
                        <input
                            id="companyName"
                            type="text"
                            name="companyName"
                            placeholder="Enter company name"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="link" style={{ display: 'block', marginBottom: '5px' }}>
                            Link
                        </label>
                        <input
                            id="link"
                            type="link"
                            name="link"
                            placeholder="Enter link (optional)"
                            value={formData.link}
                            onChange={handleChange}
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        disabled={loading || !formData.jobTitle.trim() || !formData.companyName.trim()}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? 'Saving...' : (editingJob ? 'Update' : 'Add')} Job
                    </button>

                    {editingJob && onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};