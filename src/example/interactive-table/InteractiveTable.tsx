import {
  useMemo,
  useState,
  type ChangeEvent,
  type PropsWithChildren,
} from "react";

interface InteractiveTableProps<T extends Record<string, string>> {
  data: T[];
  columns: Array<{ title: string; dataKey: string; sort: "ASC" | "DESC" }>;
}

export function InteractiveTable<T extends Record<string, string>>({
  data,
  columns,
}: PropsWithChildren<InteractiveTableProps<T>>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string | undefined;
    direction: "ASC" | "DESC";
  }>({ key: undefined, direction: "ASC" });

  const handleSort = (key: string) => {
    setSortConfig((sortConfig) => ({
      key,
      direction:
        sortConfig.key === key
          ? sortConfig.direction === "ASC"
            ? "DESC"
            : "ASC"
          : "ASC",
    }));
  };

  const sortedData = useMemo(() => {
    let filtered = data.filter((item) =>
      item.name
        .toLowerCase()
        .split(" ")
        .some((part) => part.startsWith(searchQuery.toLowerCase()))
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ASC" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ASC" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, sortConfig.key, sortConfig.direction, searchQuery]);

  return (
    <>
      <SearchInput
        searchQuery={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className="hover:cursor-pointer"
                onClick={() => handleSort(column.dataKey)}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((dataItem) => (
            <tr>
              {columns.map((column) => (
                <td className="border-2 p-1">{dataItem[column.dataKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const SearchInput = ({
  onChange,
  searchQuery,
}: {
  searchQuery: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <br />
      <input type="text" value={searchQuery} onChange={onChange} />
    </div>
  );
};

export const InteractiveTableExample = () => {
  return (
    <div>
      <InteractiveTable<Data>
        data={data}
        columns={[
          { title: "ID", dataKey: "id", sort: "ASC" },
          { title: "Name", dataKey: "name", sort: "ASC" },
          { title: "Status", dataKey: "status", sort: "ASC" },
        ]}
      />
    </div>
  );
};

interface Data {
  id: number;
  name: string;
  status: "READY" | "IN_PROGRESS" | "DONE";
}

const data: Data[] = [
  { id: 1, name: "Alice Kandra", status: "DONE" },
  { id: 2, name: "Bob", status: "IN_PROGRESS" },
];
