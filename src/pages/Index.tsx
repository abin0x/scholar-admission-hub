
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CoursesSection from '@/components/CoursesSection';
import AdmissionForm from '@/components/AdmissionForm';
import ContactSection from '@/components/ContactSection';
import AdminPanel from '@/components/AdminPanel';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CoursesSection />
      <AdmissionForm />
      <ContactSection />
      <AdminPanel />
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Excellence University</h3>
              <p className="text-primary-foreground/80">
                Shaping tomorrow's leaders through innovative education and transformative experiences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#home" className="hover:text-primary-foreground transition-colors">Home</a></li>
                <li><a href="#courses" className="hover:text-primary-foreground transition-colors">Courses</a></li>
                <li><a href="#apply" className="hover:text-primary-foreground transition-colors">Apply</a></li>
                <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>123 University Ave</p>
                <p>Education City, EC 12345</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Email: admissions@excellence.edu</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Excellence University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
