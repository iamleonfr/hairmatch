
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface UsersTableProps {
  isLoading: boolean;
  users: any[] | null;
  handleRoleChange: (userId: string, newRole: 'customer' | 'barber' | 'admin') => void;
}

const UsersTable = ({ isLoading, users, handleRoleChange }: UsersTableProps) => {
  if (isLoading) {
    return <div className="flex justify-center py-8">Loading users...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user.id} className="hover:bg-gray-50">
              <TableCell>
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell className="text-xs text-gray-500">
                {user.id}
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                    user.role === 'barber' ? 'bg-blue-100 text-blue-800' : 
                    'bg-green-100 text-green-800'}`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="text-sm">
                {new Date(user.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoleChange(user.id, 'customer')}
                    disabled={user.role === 'customer'}
                  >
                    Set as User
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoleChange(user.id, 'barber')}
                    disabled={user.role === 'barber'}
                  >
                    Set as Barber
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoleChange(user.id, 'admin')}
                    disabled={user.role === 'admin'}
                  >
                    Set as Admin
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
