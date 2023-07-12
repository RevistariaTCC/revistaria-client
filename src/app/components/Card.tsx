type CardProps = {
    children? : React.ReactNode
}

export default function Card({children} : CardProps) {
    return(
        <div className="cell:w-[165px] cell:h-[135px] md:w-[195px] md:h-[155px] lg:w-[214px] lg:h-[174px] bg-gray-300 rounded-md">
            {children}
        </div>
    )    
};
 