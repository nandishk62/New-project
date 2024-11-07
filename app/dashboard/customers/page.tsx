import { lusitana } from '@/app/ui/fonts';
import CustomersTable from '@/app/ui/customers/table';
export default function Page() {
    return (
    
    <div className="flex w-full items-center justify-between bg-red">
      <h1 className={`${lusitana.className} text-2xl bg-green`}>Customers</h1>
      
    </div>
    
  
  
  );
  }