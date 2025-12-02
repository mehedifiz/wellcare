export const HeaderCell = ({ label }: { label: string }) => (
  <th className="p-3 text-left font-medium">{label}</th>
);

export const BodyCell = ({ children }: { children: React.ReactNode }) => (
  <td className="p-3">{children}</td>
);

export const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm mb-1">{children}</p>
);
