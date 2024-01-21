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
        <div className="layout">
            <div className="sidebar">
            </div>
            <div className="content">
                {children}
            </div>
            <div className="tableOfContents">

            </div>
        </div>
    )
}