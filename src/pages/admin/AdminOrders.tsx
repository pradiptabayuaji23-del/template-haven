import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockOrders } from '@/data/mockData';

export default function AdminOrders() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p className="text-muted-foreground">View and manage all orders</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">All Orders ({mockOrders.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Template</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map(order => (
                    <tr key={order.id}>
                      <td className="font-mono text-sm">{order.id}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-14 rounded bg-muted overflow-hidden flex-shrink-0">
                            <img 
                              src={order.template?.thumbnailUrl} 
                              alt={order.template?.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="font-medium">{order.template?.title}</span>
                        </div>
                      </td>
                      <td className="text-muted-foreground">{order.userId}</td>
                      <td className="font-semibold">${order.amount}</td>
                      <td>
                        <Badge 
                          variant={order.status === 'paid' ? 'default' : 'secondary'}
                          className={order.status === 'paid' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
