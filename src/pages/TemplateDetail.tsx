import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Download, ShoppingCart, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { mockTemplates, mockOrders } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function TemplateDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const template = mockTemplates.find(t => t.id === id);

  // Check if user has purchased this template
  const hasPurchased = user && mockOrders.some(
    order => order.userId === user.id && order.templateId === id && order.status === 'paid'
  );

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Template not found</h1>
            <Link to="/templates">
              <Button>Browse Templates</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePurchase = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // In production, this would create an order via API
    toast({
      title: 'Purchase initiated',
      description: 'Redirecting to checkout...',
    });
  };

  const handleDownload = () => {
    toast({
      title: 'Download started',
      description: 'Your template is being downloaded.',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Button 
            variant="ghost" 
            className="mb-6 gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Preview Image */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
                <img
                  src={template.thumbnailUrl}
                  alt={template.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">About this template</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {template.description}
                </p>

                <h3 className="text-lg font-semibold mt-8 mb-4">What's included</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    Full source code with TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    Responsive design for all devices
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    Well-documented components
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    Free updates and bug fixes
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    Premium support via email
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h1 className="text-2xl font-bold mb-2">{template.title}</h1>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.techStack.map(tech => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${template.price}</span>
                    <span className="text-muted-foreground ml-2">one-time</span>
                  </div>

                  {/* CTA Button */}
                  {hasPurchased ? (
                    <Button 
                      className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" />
                      Download Template
                    </Button>
                  ) : (
                    <Button 
                      className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90 btn-accent-glow"
                      onClick={handlePurchase}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Buy Now
                    </Button>
                  )}

                  {hasPurchased && (
                    <p className="text-sm text-center text-muted-foreground mt-4">
                      You own this template
                    </p>
                  )}

                  <Separator className="my-6" />

                  {/* Info */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License</span>
                      <span className="font-medium">Standard</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last updated</span>
                      <span className="font-medium">
                        {new Date(template.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
