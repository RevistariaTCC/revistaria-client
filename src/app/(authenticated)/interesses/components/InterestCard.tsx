type CardProps = {
    children? : React.ReactNode
    OnClick: () => void
    styles: string
}

export default function InterestCard({children, OnClick, styles} : CardProps) {
    return(
        <div className={`flex justify-center items-center px-4 h-20 rounded-md hover:-translate-y-2 border-2 ${styles}`} onClick={()=> {OnClick()}}>
            {children}
        </div>
    )    
};
 