import { User } from "@/app/(dashboard)/admin/dashboard/users/page";
import { BodyCell, HeaderCell } from "../smallCompnents";

export const UsersTable = ({
  users,
  onSendMail,
}: {
  users: User[];
  onSendMail: (email: string) => void;
}) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead className=" ">
          <tr>
            <HeaderCell label="Name" />
            <HeaderCell label="Email" />
            <HeaderCell label="Role" />
            <HeaderCell label="Total Bookings" />
            <HeaderCell label="Actions" />
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b ">
              <BodyCell>{u.name}</BodyCell>
              <BodyCell>{u.email}</BodyCell>
              <BodyCell>{u.role.toUpperCase()}</BodyCell>
              <BodyCell>{u.bookingStats?.total || 0}</BodyCell>

              <BodyCell>
                <button
                  onClick={() => onSendMail(u.email)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Send Mail
                </button>
              </BodyCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
