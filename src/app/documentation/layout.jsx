"use client"

const mdxComponents = [
    {
        groupTitle: "",
        groupComponets: [
            {
                filename: "",
                title: "",
                description: "",
                slug: "",
                tags: [],
                date: "",
            }
        ]
    }
]
export default function Layout({children}) {
    return (
    <>
        <nav className="flex justify-between">
            <ul className="flex flex-row gap-4 items-center">
                <li>Home</li>
                <li>Documentation</li>
                <li>API</li>
                <li>Blog</li>
                <li>Support</li>
            </ul>
            <ul className="flex">
                <li>Sign In</li>
                <li>Sign Up</li>
            </ul>
        </nav>
        <div className="layout flex flex-row py-4 px-8">
            <div className="sidebar flex-1">
                <div>
                    <h1 className="text-xl">Documentation</h1>
                </div>
            </div>
            <div className="content flex-[3]">
                {children}
            </div>
            <div className="tableOfContents flex-1">
                <h1>On this page</h1>
                {}
            </div>
        </div>
    </>
    )
}