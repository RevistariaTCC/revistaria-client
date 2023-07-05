type FilterAreaProps ={
    children?: React.ReactNode
    title: string
}

export default function FilterArea({children, title}: FilterAreaProps) {
    return (
        <div className="mb-5">
            <h1 className="font-bold mb-3">{title}</h1>
            <div className="ps-2 h-48 grid grid-cols-1 gap-2 overflow-y-auto scrollbar">
                {children}
            </div>
        </div>
    )
};
