type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
    return(
        <div className="  px-[10px] p-10">
            {children}
        </div>
    )
};
