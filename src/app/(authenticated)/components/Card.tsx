type CardProps = {
    children? : React.ReactNode
}

export default function Card({children} : CardProps) {
    return(
        <div className="cell:w-[165px] cell:h-[125px] sm:w-[185px] cell:[145px] xm:w-[195px] xm:h-[155px] xl:w-[214px] xl:h-[174px] bg-gray-300 rounded-md">
            {children}
        </div>
    )    
};
 