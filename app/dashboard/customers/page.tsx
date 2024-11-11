import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import CustomersTable from '@/app/ui/customers/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Customer List',
};

export default async function CustomerListPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
 // const query = props.searchParams?.query || '';
  const query = searchParams?.query || '';
  
  // Fetch customers data based on the search query
  const rawCustomers = await fetchFilteredCustomers(query);

  // Format the customers data to match the expected `FormattedCustomersTable` type
  const customers: FormattedCustomersTable[] = rawCustomers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    image_url: customer.image_url,
    total_invoices: customer.total_invoices,
    total_pending: customer.total_pending,
    total_paid: customer.total_paid,
  }));

  return (
    <div className="w-full">
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  );
}
