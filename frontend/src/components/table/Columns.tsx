'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Influencer, Twitter } from '@/types';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Link from 'next/link';

export type TableData = {
  id: Influencer['id'];
  twitterId: Influencer['twitter']['id'];
  twitterUsername: Influencer['twitter']['username'];
  isAuthorized: Influencer['twitter']['auth']['isAuthorized'];
};

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'twitterId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Twitter ID" />,
  },
  {
    accessorKey: 'twitterUsername',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    cell: ({ row }) => {
      const username: Twitter = row.getValue('twitterUsername');

      return <div className="text-left font-medium">{`@${username}`}</div>;
    },
  },
  {
    accessorKey: 'isAuthorized',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, twitterUsername } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/management/${id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DeleteConfirmation id={id}></DeleteConfirmation>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>Copy Username</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
