type CardProps = {
    children? : React.ReactNode
}

export default function Card({children} : CardProps) {
    return(
        <div className="w-full h-60 bg-gray-300 rounded-md">
            {children}
        </div>
    )    
};
 