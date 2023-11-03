type CardProps = {
    children? : React.ReactNode
}

export default function HomeCard({children} : CardProps) {
    return(
        <div className="w-60 h-32 bg-gray-300 rounded-md">
            {children}
        </div>
    )    
};
 