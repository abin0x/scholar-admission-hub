
import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, Filter, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StudentApplication {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  selectedCourse: string;
  photo: string;
  documents: string;
  submittedAt: string;
}

const AdminPanel = () => {
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<StudentApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<StudentApplication>>({});

  const courses = [
    'All',
    'Computer Science & Engineering',
    'Business Administration',
    'Data Science',
    'Mechanical Engineering',
    'Digital Marketing',
    'Artificial Intelligence'
  ];

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, courseFilter]);

  const loadApplications = () => {
    const stored = localStorage.getItem('studentApplications');
    if (stored) {
      const apps = JSON.parse(stored);
      setApplications(apps);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (courseFilter !== 'All') {
      filtered = filtered.filter(app => app.selectedCourse === courseFilter);
    }

    setFilteredApplications(filtered);
  };

  const handleEdit = (application: StudentApplication) => {
    setEditingId(application.id);
    setEditForm(application);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;

    const updatedApplications = applications.map(app =>
      app.id === editingId ? { ...app, ...editForm } : app
    );

    setApplications(updatedApplications);
    localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));
    setEditingId(null);
    setEditForm({});

    toast({
      title: "Application Updated",
      description: "Student application has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this application?')) {
      const updatedApplications = applications.filter(app => app.id !== id);
      setApplications(updatedApplications);
      localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));

      toast({
        title: "Application Deleted",
        description: "Student application has been deleted successfully.",
      });
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Contact', 'Course', 'Date of Birth', 'Submitted At'],
      ...filteredApplications.map(app => [
        app.name,
        app.email,
        app.contactNumber,
        app.selectedCourse,
        app.dateOfBirth,
        new Date(app.submittedAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_applications.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <section id="admin" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Admin Panel</h2>
          <p className="text-xl text-muted-foreground">
            Manage student applications and admissions
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-80"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={20} className="text-muted-foreground" />
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredApplications.length} of {applications.length} applications
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No applications found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Course</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Submitted</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {editingId === application.id ? (
                          <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        ) : (
                          <div>
                            <p className="font-medium text-foreground">{application.name}</p>
                            <p className="text-sm text-muted-foreground">DOB: {application.dateOfBirth}</p>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === application.id ? (
                          <input
                            type="email"
                            value={editForm.email || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        ) : (
                          <span className="text-foreground">{application.email}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === application.id ? (
                          <input
                            type="tel"
                            value={editForm.contactNumber || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        ) : (
                          <span className="text-foreground">{application.contactNumber}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === application.id ? (
                          <select
                            value={editForm.selectedCourse || ''}
                            onChange={(e) => setEditForm(prev => ({ ...prev, selectedCourse: e.target.value }))}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            {courses.slice(1).map(course => (
                              <option key={course} value={course}>{course}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-sm text-foreground">{application.selectedCourse}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {editingId === application.id ? (
                            <>
                              <button
                                onClick={handleSaveEdit}
                                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
                                title="Save"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditForm({});
                                }}
                                className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
                                title="Cancel"
                              >
                                ×
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(application)}
                                className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(application.id)}
                                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
