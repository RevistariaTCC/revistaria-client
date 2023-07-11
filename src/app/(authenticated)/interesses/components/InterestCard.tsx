type CardProps = {
    children? : React.ReactNode
}

export default function InterestCard({children} : CardProps) {
    return(
        <div className="grid justify-center items-center px-4 h-20 bg-gray-300 rounded-md">
            {children}
        </div>
    )    
};
 