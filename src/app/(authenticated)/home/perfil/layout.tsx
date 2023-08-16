import SidebarPerfil from "../../components/SidebarPerfil"

type LayoutProps =  {
    children: React.ReactNode
}


export default function layout({children} : LayoutProps) {
    return (
        <div className="mx-[5%] md:mt-20 flex justify-center">
    
            <aside>
                <SidebarPerfil/>
            </aside>

            {children}
        </div>
    )
};
