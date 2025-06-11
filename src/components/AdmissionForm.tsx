
import { useState } from 'react';
import { Upload, User, Mail, Phone, Calendar, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface FormData {
  name: string;
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  selectedCourse: string;
  photo: File | null;
  documents: File | null;
}

const AdmissionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dateOfBirth: '',
    email: '',
    contactNumber: '',
    selectedCourse: '',
    photo: null,
    documents: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const courses = [
    "Computer Science & Engineering",
    "Business Administration", 
    "Data Science",
    "Mechanical Engineering",
    "Digital Marketing",
    "Artificial Intelligence"
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }

    if (!formData.selectedCourse) {
      newErrors.selectedCourse = 'Please select a course';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Excellence University', 20, 30);
    doc.setFontSize(16);
    doc.text('Admission Application Form', 20, 45);
    
    // Application details
    doc.setFontSize(12);
    doc.text(`Application ID: APP${Date.now()}`, 20, 65);
    doc.text(`Submitted on: ${new Date().toLocaleDateString()}`, 20, 75);
    
    // Student details
    doc.setFontSize(14);
    doc.text('Student Information:', 20, 95);
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 25, 110);
    doc.text(`Date of Birth: ${formData.dateOfBirth}`, 25, 125);
    doc.text(`Email: ${formData.email}`, 25, 140);
    doc.text(`Contact Number: ${formData.contactNumber}`, 25, 155);
    doc.text(`Selected Course: ${formData.selectedCourse}`, 25, 170);
    
    if (formData.photo) {
      doc.text(`Photo: ${formData.photo.name}`, 25, 185);
    }
    if (formData.documents) {
      doc.text(`Documents: ${formData.documents.name}`, 25, 200);
    }
    
    // Footer
    doc.text('Thank you for your application!', 20, 250);
    doc.text('We will contact you soon with further details.', 20, 265);
    
    // Download the PDF
    doc.save(`admission-form-${formData.name.replace(/\s+/g, '-')}.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save to localStorage
      const existingApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
      const newApplication = {
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toISOString(),
        photo: formData.photo?.name || '',
        documents: formData.documents?.name || '',
      };
      
      existingApplications.push(newApplication);
      localStorage.setItem('studentApplications', JSON.stringify(existingApplications));

      console.log('Application saved to localStorage:', newApplication);

      // Generate and download PDF
      generatePDF();

      toast({
        title: "Application Submitted Successfully!",
        description: "Your admission form has been downloaded automatically.",
      });

      // Reset form
      setFormData({
        name: '',
        dateOfBirth: '',
        email: '',
        contactNumber: '',
        selectedCourse: '',
        photo: null,
        documents: null,
      });
      setErrors({});

      // Clear file inputs
      const photoInput = document.getElementById('photo-upload') as HTMLInputElement;
      const documentsInput = document.getElementById('documents-upload') as HTMLInputElement;
      if (photoInput) photoInput.value = '';
      if (documentsInput) documentsInput.value = '';

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'photo' | 'documents') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fileType]: file }));
  };

  return (
    <section id="apply" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Apply for Admission</h2>
          <p className="text-xl text-muted-foreground">
            Take the first step towards your bright future
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="flex items-center text-sm font-medium text-foreground mb-2">
                  <User size={16} className="mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.name ? 'border-red-500' : 'border-border'}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="flex items-center text-sm font-medium text-foreground mb-2">
                  <Calendar size={16} className="mr-2" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.dateOfBirth ? 'border-red-500' : 'border-border'}`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-medium text-foreground mb-2">
                  <Mail size={16} className="mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.email ? 'border-red-500' : 'border-border'}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Contact Number */}
              <div>
                <label className="flex items-center text-sm font-medium text-foreground mb-2">
                  <Phone size={16} className="mr-2" />
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.contactNumber ? 'border-red-500' : 'border-border'}`}
                  placeholder="Enter your contact number"
                />
                {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
              </div>
            </div>

            {/* Course Selection */}
            <div>
              <label className="flex items-center text-sm font-medium text-foreground mb-2">
                <BookOpen size={16} className="mr-2" />
                Select Course *
              </label>
              <select
                value={formData.selectedCourse}
                onChange={(e) => setFormData(prev => ({ ...prev, selectedCourse: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${errors.selectedCourse ? 'border-red-500' : 'border-border'}`}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              {errors.selectedCourse && <p className="text-red-500 text-sm mt-1">{errors.selectedCourse}</p>}
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo Upload */}
              <div>
                <label className="flex items-center text-sm font-medium text-foreground mb-2">
                  <Upload size={16} className="mr-2" />
                  Upload Photo
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'photo')}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                    <p className="text-sm text-muted-foreground">
                      {formData.photo ? formData.photo.name : 'Click to upload photo'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Documents Upload */}
              <div>
                <label className="flex items-center text-sm font-medium text-foreground mb-2">
                  <Upload size={16} className="mr-2" />
                  Upload Documents
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'documents')}
                    className="hidden"
                    id="documents-upload"
                  />
                  <label htmlFor="documents-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                    <p className="text-sm text-muted-foreground">
                      {formData.documents ? formData.documents.name : 'Click to upload documents'}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-12 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdmissionForm;
