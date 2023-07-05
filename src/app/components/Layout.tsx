type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
    return(
        <div className="cell:px-4 md:px-[10px] pt-10">
            {children}
        </div>
    )
};
