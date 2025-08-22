import { Client } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface ClientTableProps {
  clients: Client[];
}

export default function ClientTable({ clients }: ClientTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Individual":
        return "bg-green-100 text-green-800";
      case "Company":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              <Checkbox data-testid="checkbox-select-all" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Client ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Client Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Client Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Updated By
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-slate-50" data-testid={`row-client-${client.id}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Checkbox data-testid={`checkbox-client-${client.id}`} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-900 font-medium"
                  data-testid={`link-client-${client.id}`}
                >
                  {client.id}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-900 font-medium" data-testid={`text-name-${client.id}`}>
                {client.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge 
                  className={getTypeColor(client.type)}
                  data-testid={`badge-type-${client.id}`}
                >
                  {client.type}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-500" data-testid={`text-email-${client.id}`}>
                {client.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge 
                  className={getStatusColor(client.status)}
                  data-testid={`badge-status-${client.id}`}
                >
                  {client.status}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-500" data-testid={`text-updated-by-${client.id}`}>
                {client.updatedBy}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
