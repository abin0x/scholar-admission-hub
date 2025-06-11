
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
            Welcome to
            <span className="block text-blue-600">Excellence University</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Shaping tomorrow's leaders through innovative education, cutting-edge research, 
            and transformative experiences. Your journey to success starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('#apply')}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Apply Now
            </button>
            <button 
              onClick={() => scrollToSection('#courses')}
              className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('#courses')}
          className="text-primary hover:text-primary/70 transition-colors"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
