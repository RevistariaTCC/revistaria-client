import Router from "next/dist/server/router"

type ItemListProps = {
    pathRouter : () => void
    text: String
    icon: React.ReactNode
}

export default function ItemList(props : ItemListProps) {
    return (
        <li className="flex py-3 ps-2 cursor-pointer" onClick={props.pathRouter}> 
            {props.icon}
            <div className="ps-1">
                {props.text}
            </div>
        </li>
    )
};
