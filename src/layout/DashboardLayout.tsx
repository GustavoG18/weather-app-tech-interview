import { Disclosure } from "@headlessui/react";
import { cn } from "@/lib/utils";

const navigation = [{ name: "Dashboard", href: "#", current: true }];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-b-slate-800 bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={cn(
                        item.current
                          ? "border-indigo-500 text-white"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
        <div className="py-6 bg-slate-950">
          <main>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
