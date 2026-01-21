import { Link } from 'react-router-dom';
import { Download, Package } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrders } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function UserDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Get user's purchased templates
  const userOrders = mockOrders.filter(
    order => order.userId === user?.id && order.status === 'paid'
  );

  const handleDownload = (templateTitle: string) => {
    toast({
      title: 'Download started',
      description: `${templateTitle} is being downloaded.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">My Library</h1>
            <p className="text-muted-foreground">
              Access and download your purchased templates
            </p>
          </div>

          {userOrders.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No templates yet</h2>
                <p className="text-muted-foreground mb-6">
                  Browse our marketplace and purchase your first template
                </p>
                <Link to="/templates">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Browse Templates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userOrders.map(order => (
                <Card key={order.id} className="overflow-hidden">
                  {/* Thumbnail */}
                  <Link to={`/templates/${order.template?.id}`}>
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={order.template?.thumbnailUrl}
                        alt={order.template?.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  <CardContent className="p-4">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {order.template?.techStack.slice(0, 2).map(tech => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <Link to={`/templates/${order.template?.id}`}>
                      <h3 className="font-semibold text-lg hover:text-accent transition-colors">
                        {order.template?.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-muted-foreground mt-1">
                      Purchased on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full gap-2"
                      onClick={() => handleDownload(order.template?.title || '')}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
