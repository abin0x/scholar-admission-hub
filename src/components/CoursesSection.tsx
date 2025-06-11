
import { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, DollarSign } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  duration: string;
  fees: string;
  description: string;
  category: string;
  image: string;
}

const CoursesSection = () => {
  const [courses] = useState<Course[]>([
    {
      id: 1,
      name: "Computer Science & Engineering",
      duration: "4 Years",
      fees: "$12,000/year",
      description: "Comprehensive program covering software development, algorithms, and system design.",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      name: "Business Administration",
      duration: "3 Years",
      fees: "$10,000/year",
      description: "Learn management, finance, marketing, and entrepreneurship skills.",
      category: "Business",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      name: "Data Science",
      duration: "2 Years",
      fees: "$15,000/year",
      description: "Master data analysis, machine learning, and statistical modeling.",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      name: "Mechanical Engineering",
      duration: "4 Years",
      fees: "$11,000/year",
      description: "Design, analysis, and manufacturing of mechanical systems.",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      name: "Digital Marketing",
      duration: "1 Year",
      fees: "$8,000/year",
      description: "Modern marketing strategies for the digital age.",
      category: "Business",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      name: "Artificial Intelligence",
      duration: "2 Years",
      fees: "$16,000/year",
      description: "Advanced AI concepts, neural networks, and machine learning.",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
    }
  ]);

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Engineering', 'Business', 'Technology'];

  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, courses]);

  return (
    <section id="courses" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Courses</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of programs designed to prepare you for the future
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-80"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-sm font-medium text-white bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="text-primary mr-3" size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                  {course.name}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center font-semibold text-primary">
                    <DollarSign size={16} className="mr-1" />
                    {course.fees}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
