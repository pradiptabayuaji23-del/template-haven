import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { mockTemplates } from '@/data/mockData';

const allTechStacks = Array.from(
  new Set(mockTemplates.flatMap(t => t.techStack))
).sort();

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = !selectedTech || template.techStack.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">All Templates</h1>
            <p className="text-muted-foreground">
              Browse our collection of premium website templates
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tech Stack Filter */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={!selectedTech ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => setSelectedTech(null)}
              >
                All
              </Badge>
              {allTechStacks.map(tech => (
                <Badge
                  key={tech}
                  variant={selectedTech === tech ? 'default' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
          </p>

          <TemplateGrid templates={filteredTemplates} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
