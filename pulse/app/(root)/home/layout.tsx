import Sidebar from "@/components/Sidebar";

export default function HomeLayout({children}:{children:React.ReactNode}){
    return (
        <div className="flex w-full items-center bg-slate-100 h-screen justify-center">
            <div className="w-[12%] h-full border-r-2 border-gray-100">
            <Sidebar/>
            </div>
            <div className="w-[88%] h-full">{children}</div> 
        </div>
    )
}