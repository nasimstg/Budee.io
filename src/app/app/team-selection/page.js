"use client"
import { OrganizationList } from "@clerk/nextjs";
import {dark} from '@clerk/themes'
import { useTheme } from "next-themes";
 
export default function Page() {
    const { theme } = useTheme();
  return (<div className="flex items-center justify-center">
            {
                theme === "dark" ? 
                <OrganizationList
                appearance={{baseTheme: dark}}
                afterCreateOrganizationUrl='/app/admin'
                afterSelectPersonalUrl='/app/admin'
                afterSelectOrganizationUrl='/app/admin'
                /> : <OrganizationList
                appearance={{baseTheme: ""}}
                afterCreateOrganizationUrl='/app/admin'
                afterSelectPersonalUrl='/app/admin'
                afterSelectOrganizationUrl='/app/admin'
                />
            }
    </div>
  );
}