type CardProps = {
    children? : React.ReactNode
}

export default function InterestCard({children} : CardProps) {
    return(
        <div className="flex justify-center items-center px-4 h-20 bg-white rounded-md hover:-translate-y-2 border-2 border-yellow-500">
            {children}
        </div>
    )    
};
 